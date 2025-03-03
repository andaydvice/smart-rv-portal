
/**
 * Utility to ensure all critical elements are visible
 * Improves first contentful paint and rendering
 */
export const ensureVisibility = () => {
  // Target critical elements that might be hidden
  const selectors = [
    'body', 
    'html', 
    '#root', 
    '[role="tabpanel"]',
    '.motion-div',
    '[data-framer-motion-initial]',
    '[data-radix-tabs-content]',
    'section',
    '.hero-section',
    'h1',
    'img'
  ];
  
  // Apply visibility and display properties
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
        el.style.opacity = '1';
      }
    });
  });
  
  console.log('Visibility ensured for critical elements');
};

// Add debugging output for animation issues
export const debugAnimations = () => {
  const animatedElements = document.querySelectorAll('[data-framer-animation]');
  console.log(`Found ${animatedElements.length} animated elements`);
  
  animatedElements.forEach((el, index) => {
    if (el instanceof HTMLElement) {
      console.log(`Animation ${index}: ${el.className} - ${el.style.opacity}`);
    }
  });
};
