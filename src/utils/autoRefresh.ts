
/**
 * Auto-refresh utility to monitor for changes and refresh the preview window
 */

// Define refresh intervals (in milliseconds)
const REFRESH_CHECK_INTERVAL = 2000; // Check for changes every 2 seconds
const DEBOUNCE_TIMEOUT = 500; // Debounce refresh events

// Track state for the auto-refresh system
let lastRefreshTimestamp = Date.now();
let changeDetected = false;
let refreshTimer: number | null = null;
let isEnabled = true;

// Store a hash of the last content state to detect changes
let lastContentHash = '';

/**
 * Generate a simple hash from current DOM state to detect changes
 */
const generateContentHash = (): string => {
  const domSnapshot = document.body.innerHTML.length;
  const resourceCount = document.querySelectorAll('script, link, img').length;
  const windowSize = `${window.innerWidth}x${window.innerHeight}`;
  return `${domSnapshot}-${resourceCount}-${windowSize}-${Date.now()}`;
};

/**
 * Check if the content has changed
 */
const hasContentChanged = (): boolean => {
  const newHash = generateContentHash();
  const changed = lastContentHash !== '' && newHash !== lastContentHash;
  lastContentHash = newHash;
  return changed;
};

/**
 * Perform the actual refresh of the page
 */
const performRefresh = () => {
  // Only refresh if enabled and not refreshed recently
  if (isEnabled && Date.now() - lastRefreshTimestamp > DEBOUNCE_TIMEOUT) {
    console.log('Auto refresh: Content changes detected, refreshing preview...');
    
    // Update timestamp before refresh
    lastRefreshTimestamp = Date.now();
    
    // Perform the refresh
    window.location.reload();
    
    // Reset change flag
    changeDetected = false;
  }
};

/**
 * Start checking for changes at regular intervals
 */
export const startAutoRefresh = () => {
  // Clear any existing timer
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
  }
  
  // Take initial content snapshot
  lastContentHash = generateContentHash();
  console.log('Auto refresh: Monitoring for changes started');
  
  // Enable the system
  isEnabled = true;
  
  // Set up interval to check for changes
  refreshTimer = window.setInterval(() => {
    // Check for content changes
    if (hasContentChanged()) {
      console.log('Auto refresh: Changes detected');
      changeDetected = true;
      
      // Refresh with a slight delay to allow batched changes
      setTimeout(performRefresh, DEBOUNCE_TIMEOUT);
    }
  }, REFRESH_CHECK_INTERVAL);
  
  // Return control function
  return {
    stop: stopAutoRefresh,
    toggle: toggleAutoRefresh
  };
};

/**
 * Stop checking for changes
 */
export const stopAutoRefresh = () => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
    refreshTimer = null;
  }
  isEnabled = false;
  console.log('Auto refresh: Monitoring stopped');
};

/**
 * Toggle the auto-refresh functionality
 */
export const toggleAutoRefresh = (): boolean => {
  if (isEnabled) {
    stopAutoRefresh();
    return false;
  } else {
    startAutoRefresh();
    return true;
  }
};
