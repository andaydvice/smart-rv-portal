
/**
 * Comprehensive utility to ensure all critical elements are visible
 */
export const ensureVisibility = () => {
  // Target critical elements that might be hidden
  const selectors = [
    'body', 
    'html', 
    '#root', 
    'section',
    '.hero-section',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'img',
    'button',
    'a',
    'p',
    'div',
    'nav',
    'form',
    'input',
    'textarea',
    'header',
    'footer',
    '[data-framer-motion-initial="true"]',
    '[data-motion]'
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
  
  // Specifically target motion elements
  document.querySelectorAll('[style*="opacity"]').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    }
  });
  
  // Fix button colors
  document.querySelectorAll('button.bg-white').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.backgroundColor = '#fff';
      el.style.color = '#000';
    }
  });
  
  console.log('Visibility ensured for all elements');
};
