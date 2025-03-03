
/**
 * Enhanced utility to ensure all critical elements are visible
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
    'img',
    'button',
    'a',
    'p',
    'div[style*="transform"]'
  ];
  
  console.log('Starting visibility enforcement with enhanced recovery');
  
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
      console.log(`Visibility ensured for selector: ${selector}`);
    } catch (error) {
      console.error(`Error ensuring visibility for ${selector}:`, error);
    }
  });
  
  // Ensure iframe content is also visible if possible with improved error handling
  try {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      try {
        // Use a try-catch for each individual iframe
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const iframeBody = iframeDoc.body;
            if (iframeBody) {
              iframeBody.style.visibility = 'visible';
              iframeBody.style.display = 'block';
              iframeBody.style.opacity = '1';
            }
          }
        } catch (err) {
          console.log('Cross-origin iframe access restricted (expected)');
        }
        
        // Force iframe visibility regardless of content access
        iframe.style.visibility = 'visible';
        iframe.style.display = 'block';
        iframe.style.opacity = '1';
      } catch (iframeErr) {
        console.error('Error handling iframe:', iframeErr);
      }
    });
  } catch (err) {
    console.error('Error handling iframes:', err);
  }
  
  // Fix framer-motion elements with enhanced selection
  try {
    document.querySelectorAll('[style*="opacity: 0"], [style*="visibility: hidden"], [style*="display: none"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
      }
    });
  } catch (err) {
    console.error('Error fixing visibility elements:', err);
  }
  
  console.log('Visibility ensured for critical elements');
  
  // Ensure CSS is loaded correctly
  try {
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(link => {
      // Check if stylesheet failed to load
      if (link instanceof HTMLLinkElement) {
        const href = link.href;
        fetch(href, { method: 'HEAD' })
          .then(response => {
            if (!response.ok) {
              console.warn(`Stylesheet ${href} may have failed to load, attempting reload`);
              const newLink = document.createElement('link');
              newLink.rel = 'stylesheet';
              newLink.href = href + '?reload=' + new Date().getTime();
              document.head.appendChild(newLink);
            }
          })
          .catch(error => {
            console.error(`Failed to check stylesheet ${href}:`, error);
          });
      }
    });
  } catch (err) {
    console.error('Error checking stylesheet loading:', err);
  }
};
