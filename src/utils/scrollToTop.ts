
/**
 * Utility to scroll to the top of the page
 * This can be called in useEffect hooks of page components
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant' // Use 'instant' for immediate scroll without animation
  });
};

/**
 * Helper function to monitor scrolling for debugging
 */
export const logScrollPosition = () => {
  console.log('Current scroll position:', window.scrollY);
};
