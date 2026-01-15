import React from 'react';
import { Role } from '../data/resume.data';
import { Bullet } from './Bullet';
import { getEffectiveFontSize, getEffectiveSpacing } from '../layout/constraints';
import { LayoutConstraints } from '../layout/constraints';
import { TYPOGRAPHY } from '../tokens/typography';

interface RoleBlockProps {
  role: Role;
  constraints: LayoutConstraints;
}

export const RoleBlock: React.FC<RoleBlockProps> = ({
  role,
  constraints,
}) => {
  const bodySize = getEffectiveFontSize('SIZE_MD', constraints);
  
  return (
    <div
      className="role-block"
      style={{
        marginBottom: `${getEffectiveSpacing('MICRO', constraints)}px`, // Baseline-aligned
        backgroundColor: 'transparent',
      }}
    >
      {/* Bullets */}
      <div style={{ fontSize: `${bodySize}px`, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
        {role.bullets.map((bullet, idx) => {
          const prevBullet = idx > 0 ? role.bullets[idx - 1] : null;
          const showSubSection = !!(bullet.subSection && bullet.subSection !== prevBullet?.subSection);
          return (
            <Bullet
              key={idx}
              bullet={bullet}
              constraints={constraints}
              showSubSection={showSubSection}
            />
          );
        })}
      </div>
    </div>
  );
};

