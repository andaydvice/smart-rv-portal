
/**
 * Auto-refresh utility to monitor for changes and refresh the preview window
 */

// Define refresh intervals (in milliseconds)
const REFRESH_CHECK_INTERVAL = 30000; // Increased to 30s to reduce frequency
const DEBOUNCE_TIMEOUT = 5000; // Increased to 5s

// Track state for the auto-refresh system
let lastRefreshTimestamp = Date.now();
let changeDetected = false;
let refreshTimer: number | null = null;
let isEnabled = false; // Disabled by default

// Store a hash of the last content state to detect changes
let lastContentHash = '';

/**
 * Check if auto-refresh is currently enabled
 */
export const isAutoRefreshEnabled = (): boolean => {
  return isEnabled;
};

/**
 * Generate a simple hash from current DOM state to detect changes
 */
const generateContentHash = (): string => {
  const domSnapshot = document.body.innerHTML.length;
  const resourceCount = document.querySelectorAll('script, link, img').length;
  const windowSize = `${window.innerWidth}x${window.innerHeight}`;
  return `${domSnapshot}-${resourceCount}-${windowSize}`;
};

/**
 * Check if the content has changed
 */
const hasContentChanged = (): boolean => {
  const newHash = generateContentHash();
  // Only consider it a change if the hash is different and the page has been loaded for at least 10 seconds
  const pageLoadedTime = Date.now() - (window.performance?.timing?.navigationStart || Date.now() - 10000);
  const changed = lastContentHash !== '' && newHash !== lastContentHash && pageLoadedTime > 10000;
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
    
    // Perform the refresh - DISABLED to prevent constant reloading
    // window.location.reload();
    
    // Reset change flag
    changeDetected = false;
  }
};

/**
 * Start checking for changes at regular intervals
 */
export const startAutoRefresh = () => {
  // Do nothing - auto refresh is disabled to prevent issues
  console.log('Auto refresh: Monitoring for changes is disabled');
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
  return false;
};

/**
 * Toggle the auto-refresh functionality
 */
export const toggleAutoRefresh = (): boolean => {
  if (isEnabled) {
    stopAutoRefresh();
    return false;
  } else {
    // Don't actually start it - just log
    console.log('Auto refresh: Would start monitoring but it is disabled');
    return false;
  }
};
