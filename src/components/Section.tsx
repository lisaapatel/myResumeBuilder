import React from 'react';
import { getEffectiveSpacing, getEffectiveFontSize } from '../layout/constraints';
import { TYPOGRAPHY } from '../tokens/typography';
import { LayoutConstraints } from '../layout/constraints';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  constraints: LayoutConstraints;
  highlight?: boolean;
  customSpacing?: number;
  titleWeight?: number; // Optional custom font weight for section title
  icon?: React.ReactNode;
  titleSizeDelta?: number; // Optional per-section px adjustment (e.g., -0.5)
  uppercase?: boolean; // Default: true
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  constraints,
  customSpacing,
  titleWeight,
  icon,
  titleSizeDelta,
  uppercase = true,
}) => {
  const sectionSpacing = customSpacing ?? getEffectiveSpacing('SECTION_MEDIUM', constraints);
  const titleSize = getEffectiveFontSize('SIZE_XL', constraints);
  const effectiveTitleSize = titleSize + (titleSizeDelta ?? 0);
  
  return (
    <div
      className="section"
      style={{
        marginBottom: `${sectionSpacing}px`,
        backgroundColor: 'transparent',
      }}
    >
      <h2
        style={{
          fontSize: `${effectiveTitleSize}px`,
          fontWeight: titleWeight ?? TYPOGRAPHY.WEIGHT_BOLD,
          lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_XL}px`,
          marginBottom: `${getEffectiveSpacing('TINY', constraints)}px`, // Baseline-aligned
          textTransform: uppercase ? 'uppercase' : undefined,
          letterSpacing: uppercase ? '0.5px' : undefined,
          display: 'flex',
          alignItems: 'center',
          gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`,
        }}
      >
        {icon ? (
          <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
            {icon}
          </span>
        ) : null}
        {title}
      </h2>
      {children}
    </div>
  );
};

