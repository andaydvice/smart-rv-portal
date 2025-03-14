
import { testMarkersVisibility } from '../core/testVisibility';

/**
 * Monitor marker visibility at regular intervals
 * @param interval Time between checks in milliseconds (default: 5000ms)
 * @returns A cleanup function to stop monitoring
 */
export function monitorMarkerVisibility(interval = 5000) {
  console.log(`Starting marker visibility monitoring (interval: ${interval}ms)`);
  
  const timer = setInterval(() => {
    testMarkersVisibility(true);
  }, interval);
  
  return () => {
    console.log('Stopping marker visibility monitoring');
    clearInterval(timer);
  };
}
