
import { MarkerClickHandler } from './types';

/**
 * Set up event listeners for emergency markers
 */
export function setupEmergencyMarkerListeners(
  onMarkerClick: MarkerClickHandler
): () => void {
  // Add click handlers for all direct markers
  document.querySelectorAll('.direct-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      const facilityId = marker.getAttribute('data-facility-id');
      if (facilityId) {
        // Add click handler to call the onMarkerClick callback
        const handleClick = (e: MouseEvent) => {
          e.stopPropagation();
          console.log(`Direct marker clicked: ${facilityId}`);
          onMarkerClick(facilityId, e);
        };
        
        // Store reference to handler
        const handlerName = `direct_marker_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
        (window as any)[handlerName] = handleClick;
        
        // Add handler
        marker.addEventListener('click', handleClick);
        marker.setAttribute('data-click-handler', handlerName);
      }
    }
  });
  
  // Return cleanup function
  return () => {
    document.querySelectorAll('.direct-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        const handlerName = marker.getAttribute('data-click-handler');
        if (handlerName && (window as any)[handlerName]) {
          marker.removeEventListener('click', (window as any)[handlerName]);
          delete (window as any)[handlerName];
        }
      }
    });
  };
}

/**
 * Store a click handler reference in the window object
 */
export function storeHandlerReference(
  marker: HTMLElement,
  handler: EventListener,
  facilityId: string
): void {
  const handlerName = `emergency_marker_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
  (window as any)[handlerName] = handler;
  marker.setAttribute('data-click-handler', handlerName);
  marker.setAttribute('data-edge-aware', 'true');
}
