
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
    'img',
    'button',
    'a',
    'p',
    'div[style*="transform"]'
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
      console.log(`Visibility ensured for selector: ${selector}`);
    } catch (error) {
      console.error(`Error ensuring visibility for ${selector}:`, error);
    }
  });
  
  // Ensure iframe content is also visible if possible
  try {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
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
    });
  } catch (err) {
    console.error('Error handling iframes:', err);
  }
  
  // Fix framer-motion elements
  try {
    document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });
  } catch (err) {
    console.error('Error fixing opacity elements:', err);
  }
  
  console.log('Visibility ensured for critical elements');
};

// Add debugging output for animation issues
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
    
    // Fix common framer-motion issues
    const motionDivs = document.querySelectorAll('div[style*="transform"]');
    motionDivs.forEach(div => {
      if (div instanceof HTMLElement) {
        div.style.visibility = 'visible';
        div.style.opacity = '1';
      }
    });
  } catch (error) {
    console.error('Error in debugAnimations:', error);
  }
};

// Add connection debugger
export const debugConnections = () => {
  // Test connectivity to key resources
  console.log('Testing connectivity to key resources...');
  
  const domains = [
    '/index.html', 
    '/index.css',
    '/@vite/client'
  ];
  
  domains.forEach(url => {
    fetch(url, { method: 'HEAD' })
      .then(response => console.log(`${url} accessible:`, response.ok))
      .catch(error => console.error(`${url} fetch failed:`, error));
  });
    
  // Check if WebSocket connection is possible
  try {
    const testSocket = new WebSocket('wss://echo.websocket.org');
    testSocket.onopen = () => {
      console.log('WebSocket test connection successful');
      testSocket.close();
    };
    testSocket.onerror = (error) => {
      console.error('WebSocket test connection failed:', error);
    };
  } catch (error) {
    console.error('WebSocket initialization failed:', error);
  }
  
  // Test CORS
  console.log('Testing CORS...');
  const corsTest = document.createElement('div');
  corsTest.style.backgroundImage = `url(https://lovable.app/favicon.ico)`;
  document.body.appendChild(corsTest);
  
  // Wait for image to load or fail
  setTimeout(() => {
    const computed = window.getComputedStyle(corsTest).backgroundImage;
    console.log('CORS image test result:', computed);
    document.body.removeChild(corsTest);
  }, 1000);
};
