import React from 'react';
import { getEffectiveFontSize, getEffectiveSpacing } from '../layout/constraints';
import { TYPOGRAPHY } from '../tokens/typography';
import { LayoutConstraints } from '../layout/constraints';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  constraints: LayoutConstraints;
  highlight?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  icon?: React.ReactNode; // Optional icon before title
  hideTitle?: boolean;
  extraBottomSpacing?: number; // Additional px spacing after this section
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  children,
  constraints,
  isFirst,
  isLast,
  icon,
  hideTitle,
  extraBottomSpacing,
}) => {
  const sectionSpacing = getEffectiveSpacing('INLINE_SMALL', constraints); // ~3px (baseline-aligned, was ~5.5px)
  const titleSize = getEffectiveFontSize('SIZE_MD', constraints);
  const bodySize = getEffectiveFontSize('SIZE_SM', constraints);
  
  return (
    <div
      className="sidebar-section"
      style={{
        marginTop: isFirst ? 0 : undefined, // No top margin for first section
        marginBottom: isLast ? 0 : `${sectionSpacing + (extraBottomSpacing ?? 0)}px`, // Optional extra spacing
        backgroundColor: 'transparent',
      }}
    >
      {!hideTitle ? (
        <h3
          style={{
            fontSize: `${titleSize}px`,
            fontWeight: TYPOGRAPHY.WEIGHT_SEMIBOLD,
            lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px`,
            marginTop: 0, // No top margin
            marginBottom: `${getEffectiveSpacing('MICRO', constraints)}px`, // Baseline-aligned
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`,
          }}
        >
          {icon ? <span aria-hidden="true" style={{ display: 'flex', lineHeight: 0 }}>{icon}</span> : null}
          {title}
        </h3>
      ) : null}
      <div
        style={{
          fontSize: `${bodySize}px`,
          lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px`, // Increased from LINE_HEIGHT_SM to better fill vertical space
        }}
      >
        {children}
      </div>
    </div>
  );
};

