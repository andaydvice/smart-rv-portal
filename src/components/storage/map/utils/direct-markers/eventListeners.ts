
import { StorageFacility } from '../../../types';
import { closeAllPopupsExcept } from './popup';

/**
 * Adds click event to a marker and its popup
 */
export function setupMarkerClickEvent(
  marker: HTMLElement,
  popup: HTMLElement,
  facilityId: string,
  onMarkerClick?: (facilityId: string, event: MouseEvent) => void
): void {
  marker.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close all other popups first
    closeAllPopupsExcept(popup.id);
    
    // Toggle this popup
    const isVisible = popup.classList.contains('visible');
    
    if (!isVisible) {
      // Show popup
      popup.style.display = 'block';
      popup.style.visibility = 'visible';
      popup.classList.add('visible');
      popup.classList.add('clicked');
      
      // Call optional callback
      if (onMarkerClick) onMarkerClick(facilityId, e);
    } else {
      // Hide popup
      popup.style.display = 'none';
      popup.style.visibility = 'hidden';
      popup.classList.remove('visible');
      popup.classList.remove('clicked');
    }
  });
}

/**
 * Sets up event handlers for all direct markers
 */
export function setupDirectMarkerListeners(
  onMarkerClick: (facilityId: string, event: MouseEvent) => void
): () => void {
  const handlers: { [key: string]: EventListener } = {};
  
  // Add click handlers for all direct markers
  document.querySelectorAll('.direct-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      const facilityId = marker.getAttribute('data-facility-id');
      if (facilityId) {
        // Create handler
        const handleClick = (e: MouseEvent) => {
          e.stopPropagation();
          console.log(`Direct marker clicked: ${facilityId}`);
          onMarkerClick(facilityId, e);
        };
        
        // Store handler reference
        const handlerName = `direct_marker_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
        handlers[handlerName] = handleClick;
        
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
        if (handlerName && handlers[handlerName]) {
          marker.removeEventListener('click', handlers[handlerName]);
          delete handlers[handlerName];
        }
      }
    });
  };
}
