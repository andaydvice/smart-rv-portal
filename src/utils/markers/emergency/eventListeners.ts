
/**
 * Listen for emergency marker clicks with a simplified approach
 */
export function setupEmergencyMarkerListeners(onMarkerClick: (facilityId: string) => void) {
  // Add direct document level handler for facility marker clicks
  const handleMarkerClick = (e: MouseEvent) => {
    // Find the closest marker element
    const markerEl = (e.target as HTMLElement).closest('[data-facility-id]');
    if (!markerEl) return;
    
    // Get facility ID
    const facilityId = markerEl.getAttribute('data-facility-id');
    if (!facilityId) return;
    
    console.log('Emergency marker system detected click:', facilityId);
    
    // Call the marker click handler
    onMarkerClick(facilityId);
  };
  
  // Add global click handler for any element with data-facility-id attribute
  document.addEventListener('click', handleMarkerClick);
  
  // Also handle view facility button clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('view-facility-btn')) {
      e.preventDefault();
      e.stopPropagation();
      
      const facilityId = target.getAttribute('data-facility-id');
      if (facilityId) {
        console.log('View facility button clicked:', facilityId);
        onMarkerClick(facilityId);
      }
    }
  });
  
  // Return cleanup function
  return () => {
    document.removeEventListener('click', handleMarkerClick);
  };
}

// Function to close all emergency popups
export function closeAllEmergencyPopups() {
  document.querySelectorAll('.mapboxgl-popup').forEach(popup => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  });
}

// Function to toggle detail panel state
export function setDetailPanelState(isOpen: boolean) {
  if (typeof window !== 'undefined') {
    window.hasDetailPanelOpen = isOpen;
  }
}
