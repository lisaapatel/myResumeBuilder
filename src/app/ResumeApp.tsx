import React, { useState, useCallback } from 'react';
import { ResumePage } from '../components/ResumePage';
import { OverflowGuard } from './OverflowGuard';
import { PrintLayer } from './PrintLayer';
import { CommandBar } from '../command-bar/CommandBar';
import { createCommands } from '../command-bar/commands';
import { DEFAULT_CONSTRAINTS, LayoutConstraints } from '../layout/constraints';
import { clamp } from '../utils/clamp';
import { PAGE } from '../tokens/page';

export const ResumeApp: React.FC = () => {
  const [constraints, setConstraints] = useState<LayoutConstraints>(DEFAULT_CONSTRAINTS);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pageSize, setPageSize] = useState<'letter' | 'a4'>('letter');
  const [showPageGuide, setShowPageGuide] = useState<boolean>(true);
  const [showDebugBoxes, setShowDebugBoxes] = useState<boolean>(false);
  
  const handleOverflowChange = useCallback((overflow: boolean, _overflowPx: number, currentHeight: number) => {
    setHasOverflow(overflow);
    setConstraints((prev) => ({
      ...prev,
      currentHeight,
    }));
  }, []);
  
  const handleTightenSpacing = useCallback(() => {
    setConstraints((prev) => ({
      ...prev,
      spacingScale: clamp(0.5, prev.spacingScale - 0.1, 1),
    }));
  }, []);
  
  const handleLoosenSpacing = useCallback(() => {
    setConstraints((prev) => ({
      ...prev,
      spacingScale: clamp(0.5, prev.spacingScale + 0.1, 1),
    }));
  }, []);
  
  const handleReduceBodyFont = useCallback(() => {
    setConstraints((prev) => ({
      ...prev,
      fontSizeScale: clamp(0.7, prev.fontSizeScale - 0.05, 1.1),
    }));
  }, []);
  
  const handleIncreaseBodyFont = useCallback(() => {
    setConstraints((prev) => ({
      ...prev,
      fontSizeScale: clamp(0.7, prev.fontSizeScale + 0.05, 1.1),
    }));
  }, []);
  
  const handleIncreaseSidebarWidth = useCallback(() => {
    // This would need to be implemented in TwoColumnLayout
    console.log('Increase sidebar width');
  }, []);
  
  const handleDecreaseSidebarWidth = useCallback(() => {
    // This would need to be implemented in TwoColumnLayout
    console.log('Decrease sidebar width');
  }, []);
  
  const handleResetLayout = useCallback(() => {
    setConstraints(DEFAULT_CONSTRAINTS);
  }, []);
  
  const handleToggleBaselineGrid = useCallback(() => {
    setConstraints((prev) => ({
      ...prev,
      showBaselineGrid: !prev.showBaselineGrid,
    }));
  }, []);
  
  const handleShowOverflowDetails = useCallback(() => {
    alert(`Overflow: ${hasOverflow ? 'Yes' : 'No'}\nCurrent height: ${constraints.currentHeight}px\nMax height: ${constraints.maxHeight}px`);
  }, [hasOverflow, constraints]);
  
  const handleAutoFit = useCallback(() => {
    // Auto-fit logic: reduce spacing first, then font size
    setConstraints((prev) => {
      if (prev.spacingScale > 0.6) {
        return { ...prev, spacingScale: prev.spacingScale - 0.1 };
      } else if (prev.fontSizeScale > 0.8) {
        return { ...prev, fontSizeScale: prev.fontSizeScale - 0.05 };
      }
      return prev;
    });
  }, []);
  
  const handleSuggestReductions = useCallback(() => {
    alert('Suggestions:\n1. Reduce spacing between sections\n2. Reduce body font size\n3. Tighten bullet spacing\n4. Reduce role block gaps');
  }, []);
  
  const handleCommandSelect = useCallback((command: { id: string; action: () => void }) => {
    command.action();
  }, []);
  
  const commands = createCommands({
    onTightenSpacing: handleTightenSpacing,
    onLoosenSpacing: handleLoosenSpacing,
    onReduceBodyFont: handleReduceBodyFont,
    onIncreaseBodyFont: handleIncreaseBodyFont,
    onIncreaseSidebarWidth: handleIncreaseSidebarWidth,
    onDecreaseSidebarWidth: handleDecreaseSidebarWidth,
    onResetLayout: handleResetLayout,
    onToggleBaselineGrid: handleToggleBaselineGrid,
    onShowOverflowDetails: handleShowOverflowDetails,
    onAutoFit: handleAutoFit,
    onSuggestReductions: handleSuggestReductions,
  });
  
  const handlePrint = useCallback(() => {
    if (!hasOverflow) {
      window.print();
    }
  }, [hasOverflow]);
  
  return (
    <div className="resume-app">
      {/* Preview shell - all UI, buttons, backgrounds (hidden in print) */}
      <div className="preview-shell">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              marginBottom: '16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={handlePrint}
              disabled={hasOverflow}
              style={{
                padding: '8px 16px',
                backgroundColor: hasOverflow ? '#ccc' : '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: hasOverflow ? 'not-allowed' : 'pointer',
                fontWeight: 600,
              }}
            >
              Print {hasOverflow ? '(Fix overflow first)' : ''}
            </button>
            <button
              onClick={() => setPageSize(pageSize === 'letter' ? 'a4' : 'letter')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Page: {pageSize.toUpperCase()}
            </button>
            <button
              onClick={() => setShowPageGuide(!showPageGuide)}
              style={{
                padding: '8px 16px',
                backgroundColor: showPageGuide ? '#000' : '#fff',
                color: showPageGuide ? '#fff' : '#000',
                border: '1px solid #000',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {showPageGuide ? 'Hide' : 'Show'} Page Guide
            </button>
          <button
            onClick={() => setShowDebugBoxes(!showDebugBoxes)}
            style={{
              padding: '8px 16px',
              backgroundColor: showDebugBoxes ? '#000' : '#fff',
              color: showDebugBoxes ? '#fff' : '#000',
              border: '1px solid #000',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {showDebugBoxes ? 'Hide' : 'Show'} Debug Boxes
          </button>
          <button
            onClick={() => setConstraints(prev => ({ ...prev, layoutFrozen: !prev.layoutFrozen }))}
            style={{
              padding: '8px 16px',
              backgroundColor: constraints.layoutFrozen ? '#000' : '#fff',
              color: constraints.layoutFrozen ? '#fff' : '#000',
              border: '1px solid #000',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {constraints.layoutFrozen ? '🔒 Frozen' : '🔓 Free'}
          </button>
          </div>
          
          {/* Preview container - for screen display only */}
          <div style={{ position: 'relative', display: 'block' }}>
            <PrintLayer 
              pageSize={pageSize}
              showPageGuide={showPageGuide}
              showDebugBoxes={showDebugBoxes}
            >
              <OverflowGuard
                constraints={constraints}
                onOverflowChange={handleOverflowChange}
                pageSize={pageSize}
              >
                <ResumePage constraints={constraints} searchTerm={searchTerm} />
              </OverflowGuard>
            </PrintLayer>
            {constraints.showBaselineGrid && (
              <div
                className="baseline-grid-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: pageSize === 'letter' ? `${PAGE.WIDTH_PX}px` : `${PAGE.A4_WIDTH_PX}px`,
                  height: pageSize === 'letter' ? `${PAGE.HEIGHT_PX}px` : `${PAGE.A4_HEIGHT_PX}px`,
                  pointerEvents: 'none',
                  zIndex: 100,
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
                }}
              />
            )}
          </div>
        </div>
        
        <CommandBar
          commands={commands}
          onCommandSelect={handleCommandSelect}
          onSearchChange={setSearchTerm}
        />
      </div>
      
      {/* Print root - isolated printable document tree (visible only in print) */}
      <div className="print-root">
        <PrintLayer 
          pageSize={pageSize}
          showPageGuide={false}
          showDebugBoxes={false}
        >
          <OverflowGuard
            constraints={constraints}
            onOverflowChange={handleOverflowChange}
            pageSize={pageSize}
          >
            <ResumePage constraints={constraints} searchTerm={searchTerm} />
          </OverflowGuard>
        </PrintLayer>
      </div>
    </div>
  );
};

