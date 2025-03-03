
/**
 * Enhanced debugging for animation issues
 * Fixes common problems with Framer Motion animations
 */
export const debugAnimations = () => {
  try {
    const animatedElements = document.querySelectorAll('[data-framer-animation], [data-motion], [data-framer-motion-initial]');
    console.log(`Found ${animatedElements.length} animated elements`);
    
    animatedElements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        // Force animation elements to be visible
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = el.style.transform || 'none'; // Ensure transform is set
        
        // Override Framer Motion's initial animation settings
        if (el.dataset.framerMotionInitial) {
          el.dataset.framerMotionInitial = 'false';
        }
        
        console.log(`Animation ${index}: ${el.className} - ${el.style.opacity}`);
      }
    });
    
    // Fix common framer-motion issues with more comprehensive selection
    const motionDivs = document.querySelectorAll('div[style*="transform"], div[style*="translate"], div[style*="scale"], div[style*="rotate"], div[style*="opacity"]');
    motionDivs.forEach(div => {
      if (div instanceof HTMLElement) {
        div.style.visibility = 'visible';
        div.style.opacity = '1';
      }
    });
    
    // Additional check for any elements that might be hidden
    setTimeout(() => {
      document.querySelectorAll('[style*="visibility: hidden"], [style*="display: none"], [style*="opacity: 0"]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
          el.style.opacity = '1';
        }
      });
    }, 500);
  } catch (error) {
    console.error('Error in debugAnimations:', error);
  }
};
