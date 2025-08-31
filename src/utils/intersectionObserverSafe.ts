/**
 * Safe wrapper for IntersectionObserver to prevent errors
 */

export const createSafeIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  try {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported');
      return null;
    }

    return new IntersectionObserver(callback, options);
  } catch (error) {
    console.error('Failed to create IntersectionObserver:', error);
    return null;
  }
};

export const safeObserve = (
  observer: IntersectionObserver | null,
  element: Element | null
): boolean => {
  try {
    if (!observer || !element || !(element instanceof Element)) {
      return false;
    }

    observer.observe(element);
    return true;
  } catch (error) {
    console.error('Failed to observe element:', error);
    return false;
  }
};

export const safeUnobserve = (
  observer: IntersectionObserver | null,
  element: Element | null
): boolean => {
  try {
    if (!observer || !element || !(element instanceof Element)) {
      return false;
    }

    observer.unobserve(element);
    return true;
  } catch (error) {
    console.error('Failed to unobserve element:', error);
    return false;
  }
};