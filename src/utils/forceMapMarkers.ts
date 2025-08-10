
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
  // Use a more comprehensive selector to find ALL marker types
  const markers = document.querySelectorAll(
    '.mapboxgl-marker, .custom-marker, .emergency-marker, .direct-marker, [data-marker="true"], .marker'
  );
  const isDev = import.meta.env.DEV;
  if (isDev && markers.length > 0) {
    console.log(`Found ${markers.length} markers to make visible`);
  }
  
  if (markers.length === 0) {
    return;
  }
  
  // Track how many markers we've modified
  let modifiedCount = 0;
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      const wasVisible = marker.style.visibility === 'visible' && 
                        marker.style.display === 'block' &&
                        marker.style.opacity === '1';
      
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.zIndex = '1000';
      
      // Set data attribute to track that we've fixed this marker
      if (!marker.hasAttribute('data-forced-visible')) {
        marker.setAttribute('data-forced-visible', 'true');
        modifiedCount++;
      }
    }
  });
  
  if (isDev && modifiedCount > 0) {
    console.log(`Modified visibility of ${modifiedCount} markers`);
  }
  
  // Check for state-specific markers
  const selectedState = document.querySelector('[data-selected-state]')?.getAttribute('data-selected-state');
  if (selectedState) {
    if (isDev) {
      console.log(`Checking markers for selected state: ${selectedState}`);
    }
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
  
  if (import.meta.env.DEV) {
    console.log(`Looking for markers with state attributes: ${allRepresentations.join(', ')}`);
  }
  
  let stateMarkers = 0;
  
  // Use a more comprehensive selector to find ALL marker types
  document.querySelectorAll(
    '.mapboxgl-marker, .custom-marker, .emergency-marker, .direct-marker, [data-marker="true"], .marker'
  ).forEach(marker => {
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
        
        // Track that we've enhanced this state marker
        if (!marker.hasAttribute('data-state-enhanced')) {
          marker.setAttribute('data-state-enhanced', 'true');
        }
      }
    }
  });
  
  if (import.meta.env.DEV) {
    console.log(`Found ${stateMarkers} markers specifically for state: ${selectedState}`);
  }
  
  // Return the count so it can be used elsewhere
  return stateMarkers;
};

// Export the checkStateSpecificMarkers function for use in other components
export { checkStateSpecificMarkers };
