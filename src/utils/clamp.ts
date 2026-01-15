/**
 * Clamp utility for constraining values
 */

export function clamp(min: number, value: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

