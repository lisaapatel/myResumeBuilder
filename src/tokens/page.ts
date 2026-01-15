/**
 * Page dimension tokens
 * US Letter: 8.5 × 11 inches
 * At 96 DPI: 816 × 1056 pixels
 */

export const PAGE = {
  // US Letter dimensions at 96 DPI
  WIDTH_INCHES: 8.5,
  HEIGHT_INCHES: 11,
  WIDTH_PX: 816,
  HEIGHT_PX: 1056,
  
  // A4 dimensions at 96 DPI (210 × 297 mm)
  A4_WIDTH_PX: 794,   // 210mm at 96 DPI
  A4_HEIGHT_PX: 1123, // 297mm at 96 DPI
  
  // Margins (in pixels)
  MARGIN_TOP: 24, // Further reduced to move content up
  MARGIN_BOTTOM: 28, // Reduced to avoid excessive empty bottom space
  // Reduced to move left column/content closer to the page edge (baseline-aligned)
  MARGIN_LEFT: 28,
  MARGIN_RIGHT: 27, // Reduced right margin
  
  // Content area (for US Letter)
  CONTENT_WIDTH: 816 - 28 - 27, // 761px (adjusted for margins)
  CONTENT_HEIGHT: 1056 - 24 - 28, // 1004px
  
  // A4 Content area
  A4_CONTENT_WIDTH: 794 - 28 - 27, // 739px (adjusted for margins)
  A4_CONTENT_HEIGHT: 1123 - 24 - 28, // 1071px
  
  // Layout dimensions (tokenized)
  SIDEBAR_WIDTH: 190,               // Sidebar column width (wider per template preference)
  DATE_COLUMN_WIDTH: 180,           // Date/location column width in experience grid
  COLUMN_GAP: 10,                   // Gap between main content and sidebar
  METADATA_GUTTER: 2,               // Internal buffer for right-aligned metadata (dates, locations)
} as const;

export type PageSize = 'letter' | 'a4';

