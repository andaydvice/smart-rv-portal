
/**
 * Listen for emergency marker clicks
 */
export function setupEmergencyMarkerListeners(onMarkerClick: (facilityId: string) => void) {
  // Remove any existing listeners
  document.removeEventListener('emergency-marker-click', handleClick as any);
  document.removeEventListener('emergency-marker-detail-view', handleDetailView as any);
  
  // Set up global tracking variable if not exists
  if (typeof window.hasDetailPanelOpen === 'undefined') {
    window.hasDetailPanelOpen = false;
  }
  
  // Function to handle marker clicks
  function handleClick(event: CustomEvent<{facilityId: string, skipPopup?: boolean}>) {
    const facilityId = event.detail.facilityId;
    const skipPopup = event.detail.skipPopup;
    
    console.log('Emergency marker clicked:', facilityId, skipPopup ? '(skipping popup)' : '');
    
    // Simply call the click handler to update application state
    onMarkerClick(facilityId);
  }
  
  // Function to handle detailed view requests
  function handleDetailView(event: CustomEvent<{facilityId: string}>) {
    const facilityId = event.detail.facilityId;
    console.log('Emergency marker detail view:', facilityId);
    
    // Set the global detail panel state
    window.hasDetailPanelOpen = true;
    
    // Update application state
    onMarkerClick(facilityId);
    
    // Close all popups when viewing details
    closeAllEmergencyPopups();
  }
  
  // Add listeners
  document.addEventListener('emergency-marker-click', handleClick as any);
  document.addEventListener('emergency-marker-detail-view', handleDetailView as any);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('emergency-marker-click', handleClick as any);
    document.removeEventListener('emergency-marker-detail-view', handleDetailView as any);
    window.hasDetailPanelOpen = false;
  };
}

// Function to close all emergency popups
export function closeAllEmergencyPopups() {
  document.querySelectorAll('.emergency-popup, .mapboxgl-popup').forEach(popup => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  });
}

// Function to toggle detail panel state
export function setDetailPanelState(isOpen: boolean) {
  window.hasDetailPanelOpen = isOpen;
}
