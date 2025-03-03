
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

// Enhanced debugging for animation issues
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

// Enhanced connection debugger with WebSocket testing
export const debugConnections = () => {
  // Test connectivity to key resources with improved error handling
  console.log('Testing connectivity to key resources with enhanced recovery...');
  
  const domains = [
    '/index.html', 
    '/index.css',
    '/@vite/client',
    '/src/main.tsx'
  ];
  
  domains.forEach(url => {
    fetch(url, { 
      method: 'HEAD',
      cache: 'no-cache' // Bypass cache to ensure fresh response
    })
      .then(response => {
        console.log(`${url} accessible:`, response.ok);
        if (!response.ok) {
          console.warn(`Resource ${url} returned status ${response.status}, may require reload`);
        }
        
        // Check content type for CSS files
        if (url.endsWith('.css')) {
          const contentType = response.headers.get('content-type');
          console.log(`CSS Content-Type: ${contentType || 'missing'}`);
          if (!contentType || !contentType.includes('text/css')) {
            console.error(`Incorrect MIME type for CSS: ${contentType}`);
          }
        }
      })
      .catch(error => {
        console.error(`${url} fetch failed:`, error);
        
        // Attempt alternative fetch with different cache strategy
        console.log(`Retrying ${url} with alternative approach...`);
        fetch(url + '?nocache=' + new Date().getTime(), { 
          method: 'HEAD',
          cache: 'reload'
        })
          .then(retryResponse => console.log(`Retry ${url} accessible:`, retryResponse.ok))
          .catch(retryError => console.error(`Retry ${url} also failed:`, retryError));
      });
  });
    
  // Check if WebSocket connection is possible with enhanced error handling
  const testWebSocketConnection = () => {
    try {
      console.log('Testing WebSocket connectivity...');
      
      // Test multiple WebSocket endpoints
      const wsEndpoints = [
        'wss://echo.websocket.org',
        'wss://lovableproject.com'
      ];
      
      wsEndpoints.forEach(wsUrl => {
        try {
          console.log(`Testing WebSocket connection to ${wsUrl}...`);
          const testSocket = new WebSocket(wsUrl);
          
          testSocket.onopen = () => {
            console.log(`WebSocket test connection to ${wsUrl} successful`);
            testSocket.close();
          };
          
          testSocket.onerror = (error) => {
            console.error(`WebSocket test connection to ${wsUrl} failed:`, error);
          };
          
          // Set timeout to close socket if it doesn't connect
          setTimeout(() => {
            if (testSocket.readyState !== WebSocket.OPEN) {
              console.log(`WebSocket connection to ${wsUrl} timed out, closing...`);
              testSocket.close();
            }
          }, 5000);
        } catch (wsError) {
          console.error(`Failed to initialize WebSocket to ${wsUrl}:`, wsError);
        }
      });
    } catch (error) {
      console.error('WebSocket testing failed:', error);
    }
  };
  
  // Test WebSocket with a small delay to ensure network is ready
  setTimeout(testWebSocketConnection, 1000);
  
  // Test CORS with enhanced checking
  console.log('Testing CORS with multiple approaches...');
  
  // Method 1: Background image test
  const corsTest = document.createElement('div');
  corsTest.style.backgroundImage = `url(https://lovable.app/favicon.ico?nocache=${new Date().getTime()})`;
  document.body.appendChild(corsTest);
  
  // Wait for image to load or fail
  setTimeout(() => {
    const computed = window.getComputedStyle(corsTest).backgroundImage;
    console.log('CORS image test result:', computed);
    document.body.removeChild(corsTest);
  }, 1000);
  
  // Method 2: Direct fetch test
  fetch('https://lovable.app/favicon.ico', { 
    method: 'HEAD',
    mode: 'cors',
    cache: 'no-cache'
  })
    .then(response => console.log('CORS fetch test successful:', response.ok))
    .catch(error => console.error('CORS fetch test failed:', error));
  
  // Check for CSS MIME type issues
  const styleElements = document.querySelectorAll('link[rel="stylesheet"]');
  console.log(`Found ${styleElements.length} stylesheet links`);
  
  styleElements.forEach((link, index) => {
    if (link instanceof HTMLLinkElement) {
      console.log(`Stylesheet ${index}: ${link.href}`);
      
      // Test if the stylesheet is loading correctly
      fetch(link.href, { 
        method: 'HEAD',
        cache: 'no-cache'
      })
        .then(response => {
          const contentType = response.headers.get('content-type');
          console.log(`Stylesheet ${index} Content-Type: ${contentType || 'missing'}`);
          
          if (!contentType || !contentType.includes('text/css')) {
            console.error(`Incorrect MIME type for stylesheet ${index}: ${contentType}`);
            
            // Attempt to fix by reloading
            console.log(`Attempting to fix stylesheet ${index} MIME type...`);
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = link.href + '?fixmime=' + new Date().getTime();
            document.head.appendChild(newLink);
          }
        })
        .catch(error => console.error(`Failed to check stylesheet ${index}:`, error));
    }
  });
};
