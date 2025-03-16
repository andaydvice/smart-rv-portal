
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../../types';
import { closeAllPopupsExcept } from './popup';

/**
 * Adds click event to a marker and its popup
 * ensuring popup stays at least 20px from any edge
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
    
    // Get marker position for edge detection
    const markerRect = marker.getBoundingClientRect();
    const mapContainer = marker.closest('.mapboxgl-map') || document.body;
    const mapRect = mapContainer.getBoundingClientRect();
    
    // Get window dimensions for edge detection when viewed in a new tab or preview
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Use the smaller of map container or window dimensions
    const containerWidth = Math.min(mapRect.width, windowWidth);
    const containerHeight = Math.min(mapRect.height, windowHeight);
    
    // Minimum padding from any edge (20px)
    const minPadding = 20;
    
    // Check if marker is near the edge
    const isNearLeftEdge = markerRect.left < (150 + minPadding);
    const isNearRightEdge = markerRect.right > (containerWidth - (200 + minPadding));
    const isNearTopEdge = markerRect.top < (100 + minPadding);
    const isNearBottomEdge = markerRect.bottom > (containerHeight - (180 + minPadding));
    
    // Default popup position (centered below marker)
    let xPos = markerRect.left + markerRect.width/2;
    let yPos = markerRect.top - 15;
    let transform = 'translateX(-50%)';
    
    // Position the popup based on edge proximity, ensuring minimum padding
    if (isNearLeftEdge) {
      xPos = markerRect.left + markerRect.width + (20 + minPadding);
      transform = 'translateY(-50%)';
      yPos = markerRect.top;
    } else if (isNearRightEdge) {
      xPos = markerRect.left - (20 + minPadding);
      transform = 'translateX(-100%) translateY(-50%)';
      yPos = markerRect.top;
    }
    
    if (isNearTopEdge) {
      yPos = markerRect.bottom + (20 + minPadding);
      transform = transform.replace('translateY(-50%)', '');
    } else if (isNearBottomEdge) {
      yPos = markerRect.top - (20 + minPadding);
      if (!transform.includes('translateY')) {
        transform += ' translateY(-100%)';
      }
    }
    
    // Apply calculated position and transform
    popup.style.left = `${xPos}px`;
    popup.style.top = `${yPos}px`;
    popup.style.transform = transform;
    
    if (!isVisible) {
      // Show popup
      popup.style.display = 'block';
      popup.style.visibility = 'visible';
      popup.classList.add('visible');
      popup.classList.add('clicked');
      
      // Add additional styles to ensure popup is fully visible
      popup.style.zIndex = '10000';
      popup.style.pointerEvents = 'auto';
      
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
 * ensuring popups stay at least 20px from any edge
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
