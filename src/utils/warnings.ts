/**
 * Warning utilities for overflow detection
 */

export interface OverflowWarning {
  overflowPx: number;
  estimatedLines: number;
  message: string;
}

export function calculateOverflow(
  actualHeight: number,
  maxHeight: number
): OverflowWarning | null {
  // LaTeX-like tolerance: account for browser print margin injection, font metric rounding,
  // and icon line-height inflation. Treat overflow ≤ tolerance as valid one-page fit.
  const TOLERANCE = 30; // ~30px tolerance for print noise
  const overflowPx = actualHeight - maxHeight;
  
  if (overflowPx <= TOLERANCE) {
    return null;
  }
  
  // Estimate lines based on average line height (20px for body text)
  const avgLineHeight = 20;
  const estimatedLines = Math.ceil(overflowPx / avgLineHeight);
  
  // Suggest concrete layout reductions
  const spacingReduction = Math.ceil(overflowPx / 2); // Suggest reducing spacing by half overflow
  const fontReduction = Math.ceil(overflowPx / 3); // Suggest reducing font by third of overflow
  
  return {
    overflowPx,
    estimatedLines,
    message: `⚠ Resume exceeds one page by ${overflowPx}px (~${estimatedLines} line${estimatedLines !== 1 ? 's' : ''}). Try: reduce spacing by ${spacingReduction}px or font by ${fontReduction}px`,
  };
}

