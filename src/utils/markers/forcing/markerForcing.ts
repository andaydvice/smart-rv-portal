
import { StorageFacility } from '@/components/storage/types';

/**
 * Forces all map markers to be visible by directly manipulating the DOM
 * This is a last resort when normal visibility methods fail
 */
export function forceMapMarkersVisible() {
  console.log('Forcing map markers to be visible');
  
  // Check if we have a map instance
  if (typeof window !== 'undefined') {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    
    if (markers.length === 0) {
      console.info('No markers found, will create emergency markers');
      return false;
    }
    
    // Force visibility on all markers
    markers.forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.display = 'block';
        marker.style.visibility = 'visible';
        marker.style.opacity = '1';
        marker.style.zIndex = '9999';
        marker.style.pointerEvents = 'auto';
      }
    });
    
    console.log(`Applied forced visibility to ${markers.length} markers`);
    return true;
  }
  
  return false;
}

/**
 * Tests marker visibility and reports any issues
 */
export function testMarkersVisibility() {
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  console.log(`Testing visibility of ${markers.length} markers`);
  
  const results = {
    total: markers.length,
    visible: 0,
    hidden: 0,
    issues: [] as { element: Element, issue: string }[]
  };
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      const style = window.getComputedStyle(marker);
      const isVisible = style.display !== 'none' && 
                        style.visibility !== 'hidden' && 
                        style.opacity !== '0';
      
      if (isVisible) {
        results.visible++;
      } else {
        results.hidden++;
        results.issues.push({
          element: marker,
          issue: `Marker hidden: display=${style.display}, visibility=${style.visibility}, opacity=${style.opacity}`
        });
      }
    }
  });
  
  console.log('Marker visibility test results:', results);
  return results;
}

/**
 * Ensures the map is visible
 */
export function ensureMapVisible(mapContainerId: string = 'map') {
  const mapContainer = document.getElementById(mapContainerId);
  if (!mapContainer) return;
  
  mapContainer.style.visibility = 'visible';
  mapContainer.style.display = 'block';
  mapContainer.style.opacity = '1';
  
  console.log('Map container visibility enforced');
}

/**
 * Removes "View Details" buttons that might be covering markers
 */
export function removeViewDetailsButtons() {
  const detailButtons = document.querySelectorAll('.view-details-btn, .view-facility-btn');
  detailButtons.forEach(btn => {
    if (btn instanceof HTMLElement) {
      btn.style.display = 'none';
    }
  });
  
  console.log(`Removed ${detailButtons.length} detail buttons that may obscure markers`);
}
