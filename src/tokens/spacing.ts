/**
 * Spacing tokens - all values in pixels
 * Based on baseline grid units
 */

const BASELINE_UNIT = 4; // 4px baseline grid

export const SPACING = {
  // Baseline grid
  BASELINE: BASELINE_UNIT,
  
  // Section spacing
  SECTION_LARGE: BASELINE_UNIT * 8,   // 32px
  SECTION_MEDIUM: BASELINE_UNIT * 6,  // 24px
  SECTION_SMALL: BASELINE_UNIT * 4,   // 16px
  SECTION_TIGHT: BASELINE_UNIT * 2,   // 8px
  
  // Block spacing
  BLOCK_LARGE: BASELINE_UNIT * 6,     // 24px
  BLOCK_MEDIUM: BASELINE_UNIT * 4,    // 16px
  BLOCK_SMALL: BASELINE_UNIT * 3,     // 12px
  BLOCK_TIGHT: BASELINE_UNIT * 2,     // 8px
  BLOCK_MINIMAL: BASELINE_UNIT * 1,   // 4px (one baseline unit for tight spacing)
  
  // Inline spacing
  INLINE_LARGE: BASELINE_UNIT * 4,    // 16px
  INLINE_MEDIUM: BASELINE_UNIT * 2,   // 8px
  INLINE_SMALL: BASELINE_UNIT,        // 4px
  
  // Bullet spacing
  BULLET_GAP: BASELINE_UNIT * 0,      // 0px (baseline-aligned, use BASELINE for minimal spacing)
  BULLET_INDENT: BASELINE_UNIT * 1,    // 4px (pull bullets further left to align with role title)
  
  // Role block spacing
  ROLE_BLOCK_GAP: BASELINE_UNIT * 0,  // 0px (baseline-aligned)
  ROLE_META_GAP: BASELINE_UNIT * 1,   // 4px
  
  // Micro spacing (baseline-aligned minimal values)
  MICRO: BASELINE_UNIT * 0,           // 0px - no spacing
  TINY: 2,                            // 2px - half baseline (for tight spacing, not a multiple but acceptable)
  SIDEBAR_SECTION_GAP: BASELINE_UNIT * 1, // 4px (scaled to ~3px) - spacing between sidebar sections
} as const;

export type SpacingScale = keyof typeof SPACING;

