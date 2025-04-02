
/**
 * Utility to fix navigation issues and blank screens
 */

/**
 * Tries to fix blank screens when navigating
 */
export const fixBlankScreen = () => {
  console.log('Attempting to fix blank screen');
  
  // Check if we already have content
  const hasContent = document.querySelector('main, .min-h-screen, .layout-container');
  if (hasContent) {
    console.log('Content already present, no fix needed');
    return;
  }
  
  // Force body and html to have dark background
  document.body.style.backgroundColor = '#080F1F';
  document.documentElement.style.backgroundColor = '#080F1F';
  
  // Force root element to be visible
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';
    rootElement.style.display = 'block';
    rootElement.style.backgroundColor = '#080F1F';
    rootElement.style.minHeight = '100vh';
    
    // Check if root is empty and add emergency content
    if (rootElement.children.length === 0) {
      console.error('Root element is empty, adding emergency content');
      const emergencyContent = document.createElement('div');
      emergencyContent.className = 'emergency-content';
      emergencyContent.innerHTML = `
        <div class="flex items-center justify-center h-screen w-full bg-[#080F1F] text-white">
          <div class="text-center">
            <div class="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p>Recovering application...</p>
            <button 
              onclick="window.location.reload()" 
              class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Reload Page
            </button>
          </div>
        </div>
      `;
      rootElement.appendChild(emergencyContent);
    }
  }
  
  // Force all direct children of root to be visible
  if (rootElement) {
    Array.from(rootElement.children).forEach(child => {
      if (child instanceof HTMLElement) {
        child.style.visibility = 'visible';
        child.style.opacity = '1';
        child.style.display = child.style.display === 'none' ? 'block' : child.style.display;
        child.style.backgroundColor = '#080F1F';
      }
    });
  }
  
  // Force all container elements to be visible
  document.querySelectorAll('.container, main, .content, [role="main"], #content').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.opacity = '1';
      el.style.backgroundColor = '#080F1F';
    }
  });
  
  // Attempt to restart the app flow
  try {
    // Trigger resize to force React to recalculate layouts
    window.dispatchEvent(new Event('resize'));
    
    // If we detect there's no index page showing, try to force navigation to home
    const currentPath = window.location.pathname;
    if (currentPath !== '/' && !document.querySelector('main')) {
      console.log('No main content detected, forcing navigation to home');
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    }
  } catch (e) {
    console.error('Error triggering events:', e);
  }
};

/**
 * Ensures navigation doesn't result in blank screens
 */
export const setupNavigationFixes = () => {
  console.log('Setting up navigation fixes');
  
  let consecutiveBlankScreens = 0;
  
  // Monitor visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      console.log('Page became visible, ensuring content is displayed');
      fixBlankScreen();
    }
  });
  
  // Monitor hash changes
  window.addEventListener('hashchange', () => {
    console.log('Hash changed, ensuring content is displayed');
    fixBlankScreen();
  });
  
  // Fix when history state changes
  window.addEventListener('popstate', () => {
    console.log('History state changed, ensuring content is displayed');
    setTimeout(fixBlankScreen, 100); // Slight delay to let React router process the change
  });
  
  // Periodic check for blank screens
  const checkInterval = setInterval(() => {
    const hasContent = document.querySelector('main, .min-h-screen, .layout-container');
    const hasLoader = document.querySelector('.animate-spin');
    
    if (!hasContent && !hasLoader) {
      consecutiveBlankScreens++;
      console.log(`Detected potential blank screen (${consecutiveBlankScreens}/3)`);
      
      if (consecutiveBlankScreens >= 3) {
        console.error('Multiple consecutive blank screens detected, attempting fix');
        fixBlankScreen();
        
        // If still not fixed after multiple attempts, reload as last resort
        if (consecutiveBlankScreens > 5) {
          console.error('Critical: Multiple fixes failed, reloading page');
          window.location.reload();
        }
      }
    } else {
      consecutiveBlankScreens = 0;
    }
  }, 2000);
  
  // Clean up interval on unmount
  window.addEventListener('beforeunload', () => {
    clearInterval(checkInterval);
  });
};
