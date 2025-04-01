
/**
 * Navigation Diagnostics Utility
 * 
 * This utility helps detect and debug navigation issues in the application.
 * It monitors route changes and verifies that the DOM is properly updating.
 */

let lastPath = window.location.pathname;
let navigationCount = 0;

/**
 * Initialize navigation debugging
 */
export function initNavigationDebugging() {
  console.log('Navigation debugging initialized');
  
  // Monitor history changes
  window.addEventListener('popstate', logNavigation);
  
  // Monitor pushState and replaceState
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(this, arguments as any);
    logNavigation();
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments as any);
    logNavigation();
  };
  
  // Check for navigation issues periodically
  setInterval(checkNavigationState, 3000);
  
  // Patch Link components if they're causing issues
  patchLinkComponents();
}

/**
 * Log navigation events
 */
function logNavigation() {
  const currentPath = window.location.pathname;
  navigationCount++;
  
  console.log(`Navigation #${navigationCount}: ${lastPath} -> ${currentPath}`);
  lastPath = currentPath;
  
  // Verify DOM update after navigation
  setTimeout(verifyDomUpdate, 500);
}

/**
 * Verify DOM is updated after navigation
 */
function verifyDomUpdate() {
  const mainContent = document.querySelector('main');
  const rootDiv = document.getElementById('root');
  
  console.log('DOM check after navigation:');
  console.log('- Main content exists:', !!mainContent);
  console.log('- Root div visibility:', rootDiv ? window.getComputedStyle(rootDiv).visibility : 'N/A');
  console.log('- Root div opacity:', rootDiv ? window.getComputedStyle(rootDiv).opacity : 'N/A');
}

/**
 * Check for navigation state issues
 */
function checkNavigationState() {
  const rootDiv = document.getElementById('root');
  if (!rootDiv || window.getComputedStyle(rootDiv).visibility === 'hidden' || window.getComputedStyle(rootDiv).opacity === '0') {
    console.warn('Navigation issue detected: Root div is not visible');
    fixNavigationIssue();
  }
}

/**
 * Fix navigation issues
 */
function fixNavigationIssue() {
  const rootDiv = document.getElementById('root');
  if (rootDiv) {
    console.log('Applying emergency fix to restore visibility');
    rootDiv.style.visibility = 'visible';
    rootDiv.style.opacity = '1';
    rootDiv.style.display = 'block';
  }
}

/**
 * Patch Link components that might cause navigation issues
 */
function patchLinkComponents() {
  // This function would be implemented if specific Link components were identified as problematic
  console.log('Checking for problematic Link components');
}

// Export utility functions
export default {
  initNavigationDebugging,
  checkNavigationState,
  fixNavigationIssue
};
