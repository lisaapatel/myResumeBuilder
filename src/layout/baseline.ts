/**
 * Baseline grid utilities
 * Ensures all text aligns to a shared baseline grid
 */

import { SPACING } from '../tokens/spacing';

/**
 * Snap a value to the nearest baseline grid unit
 */
export function snapToBaseline(value: number): number {
  return Math.round(value / SPACING.BASELINE) * SPACING.BASELINE;
}

/**
 * Calculate line height that aligns to baseline grid
 */
export function getBaselineLineHeight(fontSize: number): number {
  // Find the nearest multiple of baseline that's >= fontSize * 1.2
  const minLineHeight = fontSize * 1.2;
  return snapToBaseline(minLineHeight);
}

/**
 * Get vertical rhythm spacing
 */
export function getVerticalRhythm(units: number): number {
  return SPACING.BASELINE * units;
}

