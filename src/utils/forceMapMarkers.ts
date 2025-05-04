
import { STATE_NAME_MAP, areStatesEquivalent } from './stateNameUtils';

/**
 * Force map markers to be visible by periodically checking the DOM
 * This helps resolve issues where markers are loaded but not visible
 */
export const forceMapMarkersVisible = () => {
  // Immediately try to make markers visible
  fixMarkers();
  
  // Set up a periodic check to ensure markers remain visible
  const intervalId = setInterval(fixMarkers, 5000);
  
  // Clean up interval after 2 minutes
  setTimeout(() => {
    clearInterval(intervalId);
  }, 120000);
};

/**
 * Fix marker visibility issues
 */
const fixMarkers = () => {
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  console.log(`Found ${markers.length} markers to make visible`);
  
  if (markers.length === 0) {
    console.log('No map markers found to fix');
    return;
  }
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.zIndex = '1000';
    }
  });
  
  // Check for state-specific markers
  const selectedState = document.querySelector('[data-selected-state]')?.getAttribute('data-selected-state');
  if (selectedState) {
    console.log(`Checking markers for selected state: ${selectedState}`);
    checkStateSpecificMarkers(selectedState);
  }
};

/**
 * Check for markers belonging to a specific state
 * and ensure they are visible
 */
const checkStateSpecificMarkers = (selectedState: string) => {
  const allRepresentations = [selectedState];
  if (STATE_NAME_MAP[selectedState]) {
    allRepresentations.push(STATE_NAME_MAP[selectedState]);
  }
  
  console.log(`Looking for markers with state attributes: ${allRepresentations.join(', ')}`);
  
  let stateMarkers = 0;
  
  // Check all markers for state attribute
  document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      const markerState = marker.getAttribute('data-state');
      
      if (markerState && allRepresentations.some(stateRep => areStatesEquivalent(markerState, stateRep))) {
        // This is a marker for our selected state
        stateMarkers++;
        
        // Make sure it's extra visible
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
        marker.style.zIndex = '10001';
        marker.style.transform = `${marker.style.transform || ''} scale(1.05)`;
      }
    }
  });
  
  console.log(`Found ${stateMarkers} markers specifically for state: ${selectedState}`);
};
