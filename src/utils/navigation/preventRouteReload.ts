
/**
 * Utility functions to prevent the page from reloading when navigating between routes
 */

// Function to intercept anchor clicks and prevent page reload
export const preventRouteReload = () => {
  // Apply immediately when the script runs
  document.addEventListener('click', (e) => {
    // Find if a link was clicked
    const link = (e.target as Element).closest('a');
    
    // If it's not a link or it's an external link, do nothing
    if (!link || 
        link.getAttribute('target') === '_blank' || 
        link.getAttribute('href')?.startsWith('http') ||
        !link.getAttribute('href')?.startsWith('/')) {
      return;
    }
    
    // Prevent default behavior for internal links
    e.preventDefault();
    
    // Get the link's href
    const href = link.getAttribute('href');
    
    // Use the history API to navigate
    if (href) {
      window.history.pushState({}, '', href);
      
      // Dispatch a custom navigation event
      window.dispatchEvent(new CustomEvent('lovable-navigation', {
        detail: { path: href }
      }));
    }
  });

  // Listen for popstate (browser back/forward) events
  window.addEventListener('popstate', () => {
    // Dispatch custom navigation event
    window.dispatchEvent(new CustomEvent('lovable-navigation', {
      detail: { path: window.location.pathname }
    }));
  });
};

// Function to manually navigate without reloading
export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  
  // Dispatch custom navigation event
  window.dispatchEvent(new CustomEvent('lovable-navigation', {
    detail: { path }
  }));
};
