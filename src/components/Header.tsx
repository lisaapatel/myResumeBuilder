import React from 'react';
import { getEffectiveFontSize, getEffectiveSpacing } from '../layout/constraints';
import { TYPOGRAPHY } from '../tokens/typography';
import { LayoutConstraints } from '../layout/constraints';

interface HeaderProps {
  name: string;
  constraints: LayoutConstraints;
}

export const Header: React.FC<HeaderProps> = ({ name, constraints }) => {
  const nameSize = getEffectiveFontSize('SIZE_XXL', constraints);
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');
  
  return (
    <div
      className="header"
      style={{
        marginBottom: getEffectiveSpacing('BASELINE', constraints), // Tokenized: ~4px scaled (reduced from 6px)
        marginTop: 0, // No top margin to align with sidebar
        // Removed border-bottom to match PDF
      }}
    >
      <h1
        style={{
          fontSize: `${nameSize}px`,
          fontWeight: TYPOGRAPHY.WEIGHT_NORMAL, // Use per-part spans for weight control
          lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_XXL}px`,
          marginBottom: 0,
        }}
      >
        <span style={{ fontWeight: TYPOGRAPHY.WEIGHT_BOLD }}>{firstName}</span>
        {lastName ? (
          <>
            {' '}
            <span style={{ fontWeight: TYPOGRAPHY.WEIGHT_NORMAL }}>{lastName}</span>
          </>
        ) : null}
      </h1>
    </div>
  );
};

