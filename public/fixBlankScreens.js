
// Emergency script to fix blank screens
(function() {
  console.log('Emergency blank screen fix script loaded');

  // Run on load
  window.addEventListener('load', fixBlankScreen);
  
  // Run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', fixBlankScreen);
  
  // Run immediately
  fixBlankScreen();
  
  // Run periodically
  setInterval(fixBlankScreen, 3000);
  
  // Run on visibility change
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      fixBlankScreen();
    }
  });
  
  function fixBlankScreen() {
    console.log('Running blank screen check');
    
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
      
      // Add visible content if root is still empty
      if (!rootElement || rootElement.children.length === 0) {
        console.warn('Root is empty, adding emergency content');
        
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
})();
