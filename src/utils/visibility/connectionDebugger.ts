
/**
 * Enhanced connection debugger with WebSocket testing
 * Tests connectivity to essential resources and WebSocket endpoints
 */
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
  
  // Testing WebSocket connectivity
  testWebSocketConnection();
  
  // Test CORS with enhanced checking
  testCorsConnection();
  
  // Check stylesheet MIME types
  checkStylesheetMimeTypes();
};

/**
 * Tests WebSocket connectivity to various endpoints
 */
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

/**
 * Tests CORS connectivity using multiple approaches
 */
const testCorsConnection = () => {
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
};

/**
 * Checks and attempts to fix stylesheet MIME type issues
 */
const checkStylesheetMimeTypes = () => {
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
