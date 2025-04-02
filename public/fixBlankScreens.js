// Emergency script to fix blank screens
(function() {
  console.log('Emergency blank screen fix script loaded');

  // Track failed attempts to avoid infinite loops
  let fixAttempts = 0;
  const MAX_FIX_ATTEMPTS = 5;
  
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
  }, 5000);
  
  // Run on visibility change
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      fixBlankScreen();
    }
  });
  
  function fixBlankScreen() {
    console.log('Running blank screen check');
    fixAttempts++;
    
    // Check if React app is already loaded and displaying content
    const hasContent = document.querySelector('main, .min-h-screen, .layout-container, .page-transition');
    if (hasContent) {
      console.log('Content already present, no emergency fix needed');
      return;
    }
    
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
      }
      
      // Only add visible content if React hasn't mounted anything yet
      // and we've tried multiple times
      if ((!rootElement || rootElement.children.length === 0) && fixAttempts > 2) {
        console.warn('Root is empty after multiple attempts, adding emergency content');
        
        // Create emergency content
        const emergencyContent = document.createElement('div');
        emergencyContent.className = 'emergency-content';
        emergencyContent.innerHTML = `
          <div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; 
                      background-color: #080F1F; color: white; z-index: 9999; flex-direction: column;">
            <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">Loading Application...</h2>
            <div style="width: 3rem; height: 3rem; border: 4px solid rgba(75, 85, 99, 0.3); 
                        border-radius: 50%; border-top-color: #5B9BD5; animation: spin 1s linear infinite;"></div>
            <button onclick="window.location.reload()" 
                    style="margin-top: 1.5rem; background: #5B9BD5; color: white; border: none; 
                           padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
              Reload Page
            </button>
            <style>
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            </style>
          </div>
        `;
        
        // Add to document body if root doesn't exist or is empty
        if (!rootElement) {
          document.body.appendChild(emergencyContent);
        } else if (rootElement.children.length === 0) {
          rootElement.appendChild(emergencyContent);
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
