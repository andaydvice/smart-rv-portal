
/**
 * Utility function to scroll the window to the top
 * Used for navigation and page transitions
 */
export const scrollToTop = () => {
  try {
    // Use smooth scrolling
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    // Direct scroll for browsers that don't support smooth scrolling
    window.scrollTo(0, 0);
  }
};
