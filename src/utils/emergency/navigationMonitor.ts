
/**
 * Utility for monitoring navigation events
 */

import { fixBlankScreen } from '../navigation/fixNavigation';

/**
 * Sets up navigation event monitoring
 */
export function setupNavigationMonitoring(): void {
  // Log the current URL for debugging
  console.log('Application starting, window.location:', window.location.href);
  console.log('Application path:', window.location.pathname);
  
  // Add navigation event listener for debugging
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred, new path:', window.location.pathname);
    fixBlankScreen();
  });
}
