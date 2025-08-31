/**
 * Utility to suppress repetitive console messages and reduce spam
 */

const loggedMessages = new Set<string>();
const loggedErrors = new Set<string>();

/**
 * Log a message only once (prevents spam)
 */
export const logOnce = (message: string, level: 'log' | 'warn' | 'error' = 'log') => {
  const key = `${level}:${message.substring(0, 100)}`;
  
  if (!loggedMessages.has(key)) {
    console[level](message);
    loggedMessages.add(key);
  }
};

/**
 * Log an error only once per session
 */
export const logErrorOnce = (error: Error | string, context?: string) => {
  const message = error instanceof Error ? error.message : error;
  const key = context ? `${context}:${message}` : message;
  
  if (!loggedErrors.has(key)) {
    console.error(context ? `${context}: ${message}` : message);
    loggedErrors.add(key);
  }
};

/**
 * Clear logged message cache (useful for development)
 */
export const clearLogCache = () => {
  loggedMessages.clear();
  loggedErrors.clear();
};

/**
 * Wrap marker detection to prevent spam
 */
export const logMarkerDetection = (count: number) => {
  const message = `Found ${count} markers to make visible`;
  
  // Only log every 10th occurrence if count is 0 to reduce spam
  if (count === 0) {
    const now = Date.now();
    const lastLog = parseInt(sessionStorage.getItem('lastMarkerLog') || '0');
    
    if (now - lastLog > 5000) { // Log every 5 seconds max
      logOnce(message, 'log');
      sessionStorage.setItem('lastMarkerLog', now.toString());
    }
  } else {
    logOnce(message, 'log');
  }
};