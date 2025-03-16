
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
    
    // Get marker position for potential edge detection
    const markerRect = marker.getBoundingClientRect();
    const mapContainer = marker.closest('.mapboxgl-map') || document.body;
    const mapRect = mapContainer.getBoundingClientRect();
    
    // Check if marker is near the edge
    const isNearLeftEdge = markerRect.left < 100;
    const isNearRightEdge = markerRect.right > mapRect.width - 100;
    const isNearTopEdge = markerRect.top < 100;
    const isNearBottomEdge = markerRect.bottom > mapRect.height - 100;
    
    // Position the popup based on edge proximity
    if (isNearLeftEdge) {
      popup.style.left = `${markerRect.left + markerRect.width + 10}px`;
      popup.style.transform = 'translateY(-50%)';
    } else if (isNearRightEdge) {
      popup.style.left = `${markerRect.left - 10}px`;
      popup.style.transform = 'translateX(-100%) translateY(-50%)';
    } else {
      popup.style.left = `${markerRect.left + markerRect.width/2}px`;
      popup.style.transform = 'translateX(-50%)';
    }
    
    if (isNearTopEdge) {
      popup.style.top = `${markerRect.bottom + 10}px`;
    } else if (isNearBottomEdge) {
      popup.style.top = `${markerRect.top - 10}px`;
      popup.style.transform += ' translateY(-100%)';
    } else {
      popup.style.top = `${markerRect.top - 15}px`;
    }
    
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
