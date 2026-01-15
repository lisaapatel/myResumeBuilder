import React from 'react';
import { PAGE } from '../tokens/page';

interface PrintLayerProps {
  children: React.ReactNode;
  pageSize: 'letter' | 'a4';
  showPageGuide?: boolean; // Preview-only dashed border
  showDebugBoxes?: boolean; // Debug mode for bounding boxes
}

/**
 * Hard A4 Page Box Container
 * 
 * This is the single source of truth for page dimensions.
 * All layout, measurement, and overflow detection must reference this container only.
 * The browser becomes a dumb renderer - this container defines the exact printable area.
 */
export const PrintLayer: React.FC<PrintLayerProps> = ({ 
  children, 
  pageSize,
  showPageGuide = true,
  showDebugBoxes = false,
}) => {
  const width = pageSize === 'letter' ? PAGE.WIDTH_PX : PAGE.A4_WIDTH_PX;
  const height = pageSize === 'letter' ? PAGE.HEIGHT_PX : PAGE.A4_HEIGHT_PX;
  
  return (
    <div
      className="hard-page-box"
      data-page-size={pageSize}
      style={{
        // Hard A4 page box - exact dimensions, no browser influence
        // This is the single source of truth for page size
        width: `${width}px`,
        height: `${height}px`,
        margin: 0,
        padding: 0, // NO padding - margins are inside .page-content-area only
        backgroundColor: '#fff',
        position: 'relative',
        boxSizing: 'border-box',
        // Preview-only outline (does NOT affect box model - use outline, not border)
        outline: showPageGuide 
          ? '2px dashed rgba(0, 0, 0, 0.2)' 
          : showDebugBoxes 
            ? '1px solid rgba(255, 0, 0, 0.3)' 
            : 'none',
        outlineOffset: showPageGuide ? '0' : '0', // Keep outline inside
      }}
    >
      {/* Page-level sidebar background - extends to page edge, above hard-page-box background */}
      <div
        className="page-sidebar-background"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: `${PAGE.SIDEBAR_WIDTH + PAGE.COLUMN_GAP + PAGE.MARGIN_RIGHT}px`, // Sidebar + gap + right margin
          backgroundColor: '#f5f5f5', // Light gray background for sidebar
          zIndex: 1, // Above hard-page-box background, below page-content-area
          pointerEvents: 'none', // Don't interfere with interactions
        }}
      />
      
      {/* Content area with margins - ALL margins are here, not in .hard-page-box */}
      <div
        className="page-content-area"
        style={{
          width: '100%',
          height: '100%', // Fill entire hard-page-box
          padding: `${PAGE.MARGIN_TOP}px ${PAGE.MARGIN_RIGHT}px ${PAGE.MARGIN_BOTTOM}px ${PAGE.MARGIN_LEFT}px`,
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 2, // Above page-sidebar-background
          // Debug mode: show content area box
          outline: showDebugBoxes ? '1px solid rgba(0, 0, 255, 0.3)' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};

