import React from 'react';
import { getEffectiveSpacing, getEffectiveFontSize } from '../layout/constraints';
import { TYPOGRAPHY } from '../tokens/typography';
import { LayoutConstraints } from '../layout/constraints';
import { BulletItem } from '../data/resume.data';

interface BulletProps {
  bullet: BulletItem;
  constraints: LayoutConstraints;
  showSubSection?: boolean;
}

export const Bullet: React.FC<BulletProps> = ({ bullet, constraints, showSubSection }) => {
  const bulletGap = getEffectiveSpacing('BULLET_GAP', constraints);
  const bulletItemGap = bulletGap + getEffectiveSpacing('TINY', constraints); // Slightly more space between bullets
  const indent = getEffectiveSpacing('BULLET_INDENT', constraints);
  const baseBodySize = getEffectiveFontSize('SIZE_MD', constraints);
  const bodySize = Math.max(TYPOGRAPHY.MIN_BODY_SIZE, baseBodySize - 0.5); // Tiny reduction for left-column bullets
  const subSectionSize = bodySize; // Keep subsection label aligned with bullet text size
  const bulletMarkSize = bodySize; // Bullet scales with text size
  const bulletMarkWidth = `${Math.max(10, Math.round(bulletMarkSize))}px`;
  // `showSubSection` is kept for potential future grouping, but we render inline today.
  void showSubSection;
  
  return (
    <div
      className="bullet"
      style={{
        marginBottom: `${bulletItemGap}px`,
        backgroundColor: 'transparent',
      }}
    >
      {/* Dash-style bullet with inline subsection label (single-line) */}
      <div
        style={{
          display: 'flex',
          paddingLeft: `${indent}px`,
          fontSize: `${bodySize}px`,
          lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px`,
        }}
      >
        <span
          style={{
            width: bulletMarkWidth,
            fontSize: `${bulletMarkSize}px`,
            lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px`,
          }}
        >
          {'•'}
        </span>
        <span style={{ flex: 1 }}>
          {bullet.subSection ? (
            <>
              <span style={{ fontSize: `${subSectionSize}px`, fontWeight: TYPOGRAPHY.WEIGHT_NORMAL }}>
                {bullet.subSection}
                {': '}
              </span>
              {bullet.text}
            </>
          ) : (
            bullet.text
          )}
        </span>
      </div>
    </div>
  );
};

