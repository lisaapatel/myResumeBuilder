import React from 'react';
import { LayoutConstraints } from '../layout/constraints';
import { PAGE } from '../tokens/page';
import { getEffectiveSpacing } from '../layout/constraints';

interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  constraints: LayoutConstraints;
}

/**
 * Two-column layout using CSS Grid (LaTeX-like columns)
 * 
 * Grid ensures both columns fill the full height naturally.
 * Layout column owns height, background layer paints grey area.
 */
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  constraints,
}) => {
  // Tokenized dimensions
  const sidebarWidth = PAGE.SIDEBAR_WIDTH;
  const columnGap = PAGE.COLUMN_GAP; // 12px (gap between main content and sidebar)
  // Symmetric sidebar padding (consolidated from margin + padding)
  const sidebarPadding = getEffectiveSpacing('INLINE_SMALL', constraints); // roomier padding
  const sidebarPaddingLeft = sidebarPadding;
  const sidebarPaddingRight = sidebarPadding; // Symmetric padding
  const sidebarPaddingTop = sidebarPadding;
  const sidebarPaddingBottom = sidebarPadding;
  
  return (
    <div
      className="two-column-layout"
      style={{
        display: 'grid',
        gridTemplateColumns: `1fr ${sidebarWidth}px`,
        gap: `${columnGap}px`,
        height: '100%', // Fill entire page-content-area (concrete height)
        width: '100%',
        position: 'relative', // For background layer positioning
      }}
    >
      {/* Main content column */}
      <div
        className="main-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // Prevent overflow
          marginTop: '-2px', // Nudge left column content slightly upward (left-only)
          paddingRight: '4px', // a touch more breathing room next to the sidebar gap
        }}
      >
        {left}
      </div>
      
      {/* Sidebar layout column - owns height, NO background (paint is page-level) */}
      <div
        className="sidebar-layout"
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 0, // No margin - all spacing via padding
          padding: `${sidebarPaddingTop}px ${sidebarPaddingRight}px ${sidebarPaddingBottom}px ${sidebarPaddingLeft}px`, // Symmetric padding
          // Grid column naturally fills full height - no hacks needed
          // Background is handled at page level in PrintLayer.tsx
        }}
      >
        {right}
      </div>
    </div>
  );
};

