
import { StorageFacility } from '@/components/storage/types';
import { MarkerVisibilityTestResult, VisibilityIssueDetail } from '../types';

/**
 * Forces all map markers to be visible by directly manipulating the DOM
 * This is a last resort when normal visibility methods fail
 */
export function forceMapMarkersVisible() {
  if (import.meta.env.DEV) console.log('Forcing map markers to be visible');
  
  // Check if we have a map instance
  if (typeof window !== 'undefined') {
    const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    
    if (markers.length === 0) {
      if (import.meta.env.DEV) console.info('No markers found, will create emergency markers');
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
    
    if (import.meta.env.DEV) console.log(`Applied forced visibility to ${markers.length} markers`);
    return true;
  }
  
  return false;
}

/**
 * Tests marker visibility and reports any issues
 */
export function testMarkersVisibility(fixIssues: boolean = false): MarkerVisibilityTestResult {
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  if (import.meta.env.DEV) console.log(`Testing visibility of ${markers.length} markers`);
  
  const issues: VisibilityIssueDetail[] = [];
  let visibleCount = 0;
  let hiddenCount = 0;
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      const style = window.getComputedStyle(marker);
      const isVisible = style.display !== 'none' && 
                        style.visibility !== 'hidden' && 
                        style.opacity !== '0';
      
      if (isVisible) {
        visibleCount++;
      } else {
        hiddenCount++;
        issues.push({
          elementId: marker.id || undefined,
          issue: `Marker hidden: display=${style.display}, visibility=${style.visibility}, opacity=${style.opacity}`,
          description: `Marker is not visible (display=${style.display}, visibility=${style.visibility}, opacity=${style.opacity})`,
          elementType: 'marker',
          issueType: 'visibility',
          recommendation: 'Force visibility with CSS',
          computedStyles: {
            visibility: style.visibility,
            display: style.display,
            opacity: style.opacity,
            zIndex: style.zIndex,
            position: style.position,
            pointerEvents: style.pointerEvents
          }
        });
      }
    }
  });

  const result: MarkerVisibilityTestResult = {
    total: markers.length,
    visible: visibleCount,
    hidden: hiddenCount,
    issues,
    // Add the same values to the new property names for consistency
    totalMarkers: markers.length,
    visibleMarkers: visibleCount,
    hiddenMarkers: hiddenCount
  };
  
  if (import.meta.env.DEV) console.log('Marker visibility test results:', result);
  return result;
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
  
  if (import.meta.env.DEV) console.log('Map container visibility enforced');
}

/**
 * Removes "View Details" buttons that might be covering markers
 */
export function removeViewDetailsButtons() {
  if (!import.meta.env.DEV) return;
  const detailButtons = document.querySelectorAll('.view-details-btn, .view-facility-btn');
  detailButtons.forEach(btn => {
    if (btn instanceof HTMLElement) {
      btn.style.display = 'none';
    }
  });
  if (import.meta.env.DEV) console.log(`Removed ${detailButtons.length} detail buttons that may obscure markers`);
}
