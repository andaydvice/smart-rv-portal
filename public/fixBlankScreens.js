// Emergency script to fix blank screens - without loading spinners
(function() {
  console.log('Emergency blank screen fix script loaded');

  // Track failed attempts to avoid infinite loops
  let fixAttempts = 0;
  const MAX_FIX_ATTEMPTS = 5; // Increased from 3 to 5
  
  // Set last refreshed timestamp to track if we need a force reload
  const lastRefresh = sessionStorage.getItem('lastEmergencyRefresh');
  const now = Date.now();
  
  // If page has been stuck for more than 15 seconds, force reload
  if (lastRefresh && (now - parseInt(lastRefresh, 10)) > 15000) {
    console.warn('Page appears stuck, forcing reload');
    sessionStorage.removeItem('lastEmergencyRefresh');
    window.location.reload();
  }

  // Handle import errors specifically
  window.addEventListener('error', function(event) {
    if (event.error && event.error.message && event.error.message.includes('Failed to fetch dynamically imported module')) {
      console.error('Module import failure detected - forcing page reload');
      sessionStorage.setItem('importFailure', 'true');
      // Add a timestamp to prevent browser cache issues
      window.location.href = window.location.pathname + '?reload=' + Date.now();
    }
  });

  // Run on load
  window.addEventListener('load', fixBlankScreen);
  
  // Run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', fixBlankScreen);
  
  // Run immediately
  fixBlankScreen();
  
  // Run periodically but less aggressively
  const checkInterval = setInterval(() => {
    // Only keep trying for the first minute
    if (document.readyState === 'complete' && fixAttempts > MAX_FIX_ATTEMPTS) {
      console.log('Max fix attempts reached, stopping automatic checks');
      clearInterval(checkInterval);
      return;
    }
    
    fixBlankScreen();
  }, 8000);
  
  // Run on visibility change
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      fixBlankScreen();
    }
  });
  
  // Create a function to force page update for specific routes
  window.forceRouteUpdate = function(route) {
    console.log(`Forcing update for route: ${route}`);
    
    // Immediately fix blank screen issues
    fixBlankScreen();
    
    // Fix containers
    const allLayoutContainers = document.querySelectorAll('.layout, [data-main-content="true"], main, .min-h-screen');
    allLayoutContainers.forEach(container => {
      if (container instanceof HTMLElement) {
        container.style.opacity = '1';
        container.style.visibility = 'visible';
        container.style.backgroundColor = '#080F1F';
        container.style.display = 'block';
      }
    });
    
    // Set refresh timestamp
    sessionStorage.setItem('lastEmergencyRefresh', Date.now().toString());
    
    // Dispatch an event that everything is updated
    window.dispatchEvent(new CustomEvent('route-force-updated', { 
      detail: { route } 
    }));
    
    return true;
  };
  
  function fixBlankScreen() {
    console.log('Running blank screen check');
    fixAttempts++;
    
    // Check if React app is already loaded and displaying content
    const hasContent = document.querySelector('main, .min-h-screen, .layout-container, .page-transition');
    
    // Force dark background on HTML and body
    document.documentElement.style.backgroundColor = '#080F1F';
    document.body.style.backgroundColor = '#080F1F';
    
    const rootElement = document.getElementById('root');
    
    // Fix blank screen if root is empty or hidden
    if (!rootElement || rootElement.children.length === 0 || 
        rootElement.style.opacity === '0' || rootElement.style.visibility === 'hidden') {
      console.warn('Detected blank screen, applying emergency fix');
      
      if (rootElement) {
        // Force root to be visible
        rootElement.style.cssText = `
          visibility: visible !important;
          opacity: 1 !important;
          display: block !important;
          background-color: #080F1F !important;
          min-height: 100vh !important;
        `;
        
        // If we still have no content and this isn't the first attempt,
        // add some emergency content to prevent a completely blank page
        if (rootElement.children.length === 0 && fixAttempts > 3) {
          console.error('Root element is empty, adding emergency content');
          rootElement.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#080F1F;color:white;text-align:center;padding:20px;">
              <div>
                <h1 style="font-size:1.5rem;margin-bottom:1rem;">Loading Smart RV Systems</h1>
                <p style="margin-bottom:1rem;">If content doesn't appear shortly, please try refreshing the page.</p>
                <button onclick="window.location.reload()" style="background:#5B9BD5;color:white;border:none;padding:0.5rem 1rem;border-radius:0.25rem;cursor:pointer;">
                  Refresh Page
                </button>
              </div>
            </div>
          `;
        }
      }
    } else if (!hasContent && fixAttempts > 2) {
      // We have a root element but no main content yet
      console.warn('Root element exists but no main content found');
      
      if (rootElement) {
        // Check if we need to add a message
        const hasLoadingMsg = rootElement.querySelector('[data-loading-indicator]');
        if (!hasLoadingMsg) {
          const loadingEl = document.createElement('div');
          loadingEl.setAttribute('data-loading-indicator', 'true');
          loadingEl.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #080F1F;
            color: white;
            z-index: 9999;
          `;
          loadingEl.innerHTML = `
            <div style="text-align: center;">
              <p style="font-size: 1.25rem;">Loading content...</p>
            </div>
          `;
          rootElement.appendChild(loadingEl);
        }
      }
    }
    
    // Make sure first-level children of root are visible
    if (rootElement) {
      Array.from(rootElement.children).forEach(child => {
        if (child instanceof HTMLElement) {
          if (child.style.display === 'none' || child.style.visibility === 'hidden' || child.style.opacity === '0') {
            child.style.visibility = 'visible';
            child.style.display = 'block';
            child.style.opacity = '1';
            child.style.backgroundColor = '#080F1F';
          }
        }
      });
    }
  }
  
  // Allow manual triggering of fix
  window.fixBlankScreen = fixBlankScreen;
})();
