/**
 * Layout constraints and scaling rules
 * Implements LaTeX-like scaling: reduce spacing first, then font size
 */

import { PAGE } from '../tokens/page';
import { SPACING } from '../tokens/spacing';
import { TYPOGRAPHY } from '../tokens/typography';

export interface LayoutConstraints {
  maxHeight: number;
  currentHeight: number;
  spacingScale: number; // 0-1, where 1 is full spacing
  fontSizeScale: number; // ~0.7-1.1, where 1 is base size
  showBaselineGrid: boolean;
  layoutFrozen: boolean; // Layout freeze mode - prevents scaling drift
}

export const DEFAULT_CONSTRAINTS: LayoutConstraints = {
  maxHeight: PAGE.CONTENT_HEIGHT,
  currentHeight: 0,
  // Default: full-size spacing/typography (reduces “empty bottom” feel for shorter content)
  // If you overflow, use the command bar to tighten spacing / reduce font size.
  spacingScale: 1,
  fontSizeScale: 1.05,
  showBaselineGrid: false,
  layoutFrozen: false, // Layout can be adjusted
};

/**
 * Calculate scaled spacing value
 * Always returns whole-pixel values (snapped to integers)
 */
export function getScaledSpacing(
  baseSpacing: number,
  scale: number
): number {
  return Math.round(baseSpacing * scale);
}

/**
 * Calculate scaled font size
 */
export function getScaledFontSize(
  baseSize: number,
  scale: number,
  minSize: number
): number {
  const scaled = baseSize * scale;
  return Math.max(minSize, Math.round(scaled));
}

/**
 * Get effective spacing based on constraints
 * Respects layout freeze mode - returns base value if frozen
 */
export function getEffectiveSpacing(
  spacingKey: keyof typeof SPACING,
  constraints: LayoutConstraints
): number {
  if (constraints.layoutFrozen) {
    return SPACING[spacingKey]; // Return base value, no scaling
  }
  return getScaledSpacing(SPACING[spacingKey], constraints.spacingScale);
}

/**
 * Get effective font size based on constraints
 * Respects layout freeze mode - returns base value if frozen
 */
export function getEffectiveFontSize(
  sizeKey: keyof typeof TYPOGRAPHY,
  constraints: LayoutConstraints
): number {
  if (constraints.layoutFrozen) {
    return TYPOGRAPHY[sizeKey]; // Return base value, no scaling
  }
  const baseSize = TYPOGRAPHY[sizeKey];
  const minSize = sizeKey.includes('SIZE') 
    ? (sizeKey.includes('SIZE_XXL') || sizeKey.includes('SIZE_XL') 
        ? TYPOGRAPHY.MIN_HEADING_SIZE 
        : TYPOGRAPHY.MIN_BODY_SIZE)
    : TYPOGRAPHY.MIN_BODY_SIZE;
  
  return getScaledFontSize(baseSize, constraints.fontSizeScale, minSize);
}

