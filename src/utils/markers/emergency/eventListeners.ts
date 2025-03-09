
/**
 * Listen for emergency marker clicks
 */
export function setupEmergencyMarkerListeners(onMarkerClick: (facilityId: string) => void) {
  // Remove any existing listeners
  document.removeEventListener('emergency-marker-click', handleClick as any);
  document.removeEventListener('emergency-marker-detail-view', handleDetailView as any);
  
  // Function to handle marker clicks
  function handleClick(event: CustomEvent<{facilityId: string}>) {
    const facilityId = event.detail.facilityId;
    console.log('Emergency marker clicked:', facilityId);
    onMarkerClick(facilityId);
  }
  
  // Function to handle detailed view requests
  function handleDetailView(event: CustomEvent<{facilityId: string}>) {
    const facilityId = event.detail.facilityId;
    console.log('Emergency marker detail view:', facilityId);
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
  };
}

// Function to close all emergency popups
export function closeAllEmergencyPopups() {
  document.querySelectorAll('.emergency-popup').forEach(popup => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  });
}
