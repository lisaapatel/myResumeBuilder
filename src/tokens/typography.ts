/**
 * Typography tokens
 * All sizes in pixels
 * Line heights are fixed (not relative)
 */

export const TYPOGRAPHY = {
  // Font sizes
  SIZE_XXL: 24,
  SIZE_XL: 20,
  SIZE_LG: 18,
  SIZE_MD: 14,
  SIZE_SM: 12,
  SIZE_XS: 11,
  
  // Line heights (fixed, in pixels) - slightly reduced to save space
  LINE_HEIGHT_XXL: 30, // Reduced from 32
  LINE_HEIGHT_XL: 26,  // Reduced from 28
  LINE_HEIGHT_LG: 22,  // Reduced from 24
  LINE_HEIGHT_MD: 19,  // Reduced from 20
  LINE_HEIGHT_SM: 15,  // Reduced from 16
  LINE_HEIGHT_XS: 13,  // Reduced from 14
  
  // Font weights (limited to 400, 600, 700)
  WEIGHT_BOLD: 700,        // Name, main section headers
  WEIGHT_SEMIBOLD: 600,    // Company names, role titles, sidebar section titles
  WEIGHT_NORMAL: 400,      // Body text, bullets, metadata
  
  // Minimum sizes (for scaling)
  MIN_BODY_SIZE: 11,
  MIN_HEADING_SIZE: 16,
} as const;

export type TypographyScale = keyof typeof TYPOGRAPHY;

