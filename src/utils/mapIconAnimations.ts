
/**
 * Utility functions for map icon animations
 */

/**
 * Creates a pulsing animation effect for markers
 */
export function createPulseAnimation(element: HTMLElement, duration: number = 1500): void {
  if (!element) return;
  
  // Add pulsing animation classes
  element.classList.add('animate-pulse');
  
  // Remove animation after duration
  setTimeout(() => {
    element.classList.remove('animate-pulse');
  }, duration);
}

/**
 * Creates a bounce animation effect for markers
 */
export function createBounceAnimation(element: HTMLElement, duration: number = 800): void {
  if (!element) return;
  
  // Add bounce animation classes
  element.classList.add('animate-bounce');
  
  // Remove animation after duration
  setTimeout(() => {
    element.classList.remove('animate-bounce');
  }, duration);
}

/**
 * Creates a spin animation effect for marker icons
 */
export function createSpinAnimation(element: HTMLElement, duration: number = 500): void {
  if (!element) return;
  
  // Add spin animation classes
  element.classList.add('animate-spin');
  
  // Remove animation after duration
  setTimeout(() => {
    element.classList.remove('animate-spin');
  }, duration);
}

/**
 * Applies a combined animation effect to a marker
 */
export function applyCombinedAnimation(markerElement: HTMLElement, iconElement: HTMLElement): void {
  // Apply different animations to different parts
  createPulseAnimation(markerElement, 1000);
  createSpinAnimation(iconElement, 500);
}
