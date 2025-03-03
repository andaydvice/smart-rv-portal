
/**
 * Simplified utility to ensure all critical elements are visible
 */
export const ensureVisibility = () => {
  // Target critical elements that might be hidden
  const selectors = [
    'body', 
    'html', 
    '#root', 
    'section',
    '.hero-section',
    'h1',
    'img',
    'button',
    'a',
    'p',
    'div'
  ];
  
  console.log('Starting visibility enforcement');
  
  // Apply visibility and display properties
  selectors.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
          el.style.opacity = '1';
        }
      });
    } catch (error) {
      console.error(`Error ensuring visibility for ${selector}:`, error);
    }
  });
  
  // Force all elements to be visible
  document.querySelectorAll('*').forEach(el => {
    if (el instanceof HTMLElement) {
      if (el.style.visibility === 'hidden' || el.style.display === 'none' || el.style.opacity === '0') {
        el.style.visibility = 'visible';
        el.style.display = 'block';
        el.style.opacity = '1';
      }
    }
  });
  
  console.log('Visibility ensured for all elements');
};
