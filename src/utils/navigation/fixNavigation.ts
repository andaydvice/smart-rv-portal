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
    
    // Check if there's already a loading indicator
    const hasLoader = document.querySelector('.animate-spin');
    
    // If loader exists for more than 10 seconds, we should hide it
    if (hasLoader) {
      console.log('Found a loader, checking if it has been visible for too long');
      
      // Add a timeout to hide the loader after 10 seconds
      setTimeout(() => {
        const stillHasLoader = document.querySelector('.animate-spin');
        if (stillHasLoader) {
          console.warn('Loader has been visible for more than 10 seconds, hiding it');
          if (stillHasLoader.parentElement) {
            stillHasLoader.parentElement.style.display = 'none';
          }
        }
      }, 10000);
    }
    
    // Check if root is empty and add emergency content
    if (rootElement.children.length === 0 && !hasLoader) {
      console.error('Root element is empty, adding emergency content');
      const emergencyContent = document.createElement('div');
      emergencyContent.className = 'emergency-content';
      emergencyContent.innerHTML = `
        <div class="flex items-center justify-center h-screen w-full bg-[#080F1F] text-white">
          <div class="text-center">
            <div class="w-12 h-12 border-t-4 border-[#5B9BD5] border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-lg">Recovering application...</p>
            <button 
              onclick="window.location.reload()" 
              class="mt-4 bg-[#5B9BD5] text-white px-4 py-2 rounded hover:bg-[#4B8FE3] transition-colors">
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
      }
    });
  }
  
  // Force all container elements to be visible
  document.querySelectorAll('.container, main, .content, [role="main"], #content').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.visibility = 'visible';
      el.style.display = 'block';
      el.style.opacity = '1';
    }
  });
  
  // Attempt to restart the app flow
  try {
    // Trigger resize to force React to recalculate layouts
    window.dispatchEvent(new Event('resize'));
  } catch (e) {
    console.error('Error triggering events:', e);
  }
}

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
      
      // Special handling for Water Systems page
      if (window.location.pathname.includes('water-systems')) {
        if (typeof window !== 'undefined' && window.forceRouteUpdate) {
          window.forceRouteUpdate('water-systems');
        }
      }
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
  
  // Add manual fix button for debugging (removable in production)
  const addFixButton = () => {
    const fixButton = document.createElement('button');
    fixButton.innerText = 'Force Fix';
    fixButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      background-color: #5B9BD5;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-family: sans-serif;
    `;
    fixButton.onclick = () => {
      console.log('Manual fix triggered');
      fixBlankScreen();
      
      // Special handling for Water Systems page
      if (window.location.pathname.includes('water-systems')) {
        if (typeof window !== 'undefined' && window.forceRouteUpdate) {
          window.forceRouteUpdate('water-systems');
        }
      }
    };
    document.body.appendChild(fixButton);
  };
  
  // Only add in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(addFixButton, 2000);
  }
  
  // Periodic check for blank screens - less aggressive
  const checkInterval = setInterval(() => {
    // Check for content or a loader
    const hasContent = document.querySelector('main, .min-h-screen, .layout-container');
    const hasLoader = document.querySelector('.animate-spin');
    
    if (!hasContent && !hasLoader) {
      consecutiveBlankScreens++;
      console.log(`Detected potential blank screen (${consecutiveBlankScreens}/3)`);
      
      if (consecutiveBlankScreens >= 3) {
        console.error('Multiple consecutive blank screens detected, attempting fix');
        fixBlankScreen();
        
        // Special handling for Water Systems page
        if (window.location.pathname.includes('water-systems')) {
          if (typeof window !== 'undefined' && window.forceRouteUpdate) {
            window.forceRouteUpdate('water-systems');
          }
        }
      }
    } else {
      consecutiveBlankScreens = 0;
    }
  }, 4000);
  
  // Clean up interval on unmount
  window.addEventListener('beforeunload', () => {
    clearInterval(checkInterval);
  });
};
