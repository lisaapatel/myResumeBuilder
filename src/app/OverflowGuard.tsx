import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { measureElement } from '../layout/measure';
import { calculateOverflow } from '../utils/warnings';
import { LayoutConstraints } from '../layout/constraints';
import { PAGE } from '../tokens/page';

interface OverflowGuardProps {
  children: React.ReactNode;
  constraints: LayoutConstraints;
  onOverflowChange?: (hasOverflow: boolean, overflowPx: number, currentHeight: number) => void;
  pageSize?: 'letter' | 'a4';
}

export const OverflowGuard: React.FC<OverflowGuardProps> = ({
  children,
  constraints,
  onOverflowChange,
  pageSize = 'letter',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastReportRef = useRef<{ hasOverflow: boolean; overflowPx: number; height: number } | null>(
    null
  );
  const [overflowWarning, setOverflowWarning] = useState<{
    overflowPx: number;
    estimatedLines: number;
    message: string;
  } | null>(null);

  const checkOverflow = () => {
    const el = containerRef.current;
    if (!el) return;

    // Measure against the hard page box container (not browser viewport)
    // The hard page box defines the exact printable area - ignore browser print preview padding
    const contentEl = el.querySelector('.resume-page') as HTMLElement;
    if (!contentEl) return;
    
    const metrics = measureElement(contentEl);
    if (!metrics) return;

    // Use offsetHeight for actual rendered height (excludes hidden overflow)
    // This measures content inside the hard page box, ignoring browser print preview
    const actualHeight = contentEl.offsetHeight || metrics.scrollHeight;
    
    // Max height is the content area height (page minus margins)
    // This is the exact printable area defined by the hard page box
    const maxHeight = pageSize === 'a4' 
      ? PAGE.A4_CONTENT_HEIGHT 
      : PAGE.CONTENT_HEIGHT;
    
    const warning = calculateOverflow(actualHeight, maxHeight);
    const hasOverflowNow = warning !== null;
    const overflowPxNow = warning?.overflowPx || 0;
    const heightNow = actualHeight;

    // Only set state if the warning actually changed (prevents render loops).
    setOverflowWarning((prev) => {
      const prevKey = prev ? `${prev.overflowPx}-${prev.estimatedLines}` : 'none';
      const nextKey = warning ? `${warning.overflowPx}-${warning.estimatedLines}` : 'none';
      return prevKey === nextKey ? prev : warning;
    });

    if (onOverflowChange) {
      const last = lastReportRef.current;
      if (
        !last ||
        last.hasOverflow !== hasOverflowNow ||
        last.overflowPx !== overflowPxNow ||
        last.height !== heightNow
      ) {
        lastReportRef.current = {
          hasOverflow: hasOverflowNow,
          overflowPx: overflowPxNow,
          height: heightNow,
        };
        onOverflowChange(hasOverflowNow, overflowPxNow, heightNow);
      }
    }
  };

  // Measure ASAP after DOM mutations for stable results.
  useLayoutEffect(() => {
    checkOverflow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constraints.maxHeight]);

  // Re-measure on content size changes without depending on unstable props.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      checkOverflow();
    });
    ro.observe(el);

    // One more pass after paint for fonts/layout settling.
    const raf = requestAnimationFrame(() => checkOverflow());

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      {overflowWarning && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ff6b6b',
            color: '#fff',
            padding: '12px 24px',
            textAlign: 'center',
            zIndex: 1000,
            fontWeight: 600,
          }}
        >
          {overflowWarning.message}
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </>
  );
};

