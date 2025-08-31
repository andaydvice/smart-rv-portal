/**
 * Enhanced logging utilities with spam prevention
 */

const logHistory = new Map<string, { count: number; lastLogged: number }>();
const MAX_LOG_FREQUENCY = 5000; // 5 seconds between same messages

/**
 * Log with frequency limiting to prevent console spam
 */
export const logWithLimit = (
  message: string, 
  level: 'log' | 'warn' | 'error' = 'log',
  context?: string
) => {
  const key = context ? `${context}:${message}` : message;
  const now = Date.now();
  const history = logHistory.get(key);

  if (!history) {
    console[level](context ? `[${context}] ${message}` : message);
    logHistory.set(key, { count: 1, lastLogged: now });
    return;
  }

  history.count++;

  if (now - history.lastLogged > MAX_LOG_FREQUENCY) {
    const countMessage = history.count > 1 ? ` (${history.count} times)` : '';
    console[level](`${context ? `[${context}] ` : ''}${message}${countMessage}`);
    history.lastLogged = now;
    history.count = 1;
  }
};

/**
 * Clear log history for development
 */
export const clearLogHistory = () => {
  logHistory.clear();
};

/**
 * Log marker detection with spam prevention
 */
export const logMarkerCount = (count: number, context = 'Markers') => {
  logWithLimit(`Found ${count} markers to make visible`, 'log', context);
};