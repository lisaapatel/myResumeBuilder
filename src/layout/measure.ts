/**
 * Layout measurement utilities
 * Measures rendered elements for overflow detection
 */

export interface LayoutMetrics {
  height: number;
  width: number;
  scrollHeight: number;
  scrollWidth: number;
}

/**
 * Measure an element's dimensions
 */
export function measureElement(element: HTMLElement | null): LayoutMetrics | null {
  if (!element) return null;
  
  return {
    height: element.offsetHeight,
    width: element.offsetWidth,
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth,
  };
}

/**
 * Check if element overflows its container
 */
export function hasOverflow(
  element: HTMLElement | null,
  maxHeight: number
): boolean {
  if (!element) return false;
  return element.scrollHeight > maxHeight;
}

