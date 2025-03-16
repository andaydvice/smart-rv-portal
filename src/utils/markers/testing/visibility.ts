
import type { MarkerVisibilityTestResult, VisibilityIssueDetail } from '../types';

/**
 * Tests the visibility of map markers and logs any issues
 */
export function testMarkersVisibility(fixIssues: boolean = false): MarkerVisibilityTestResult {
  console.log('Testing map markers visibility');
  
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  console.log(`Found ${markers.length} markers to test`);
  
  const issues: VisibilityIssueDetail[] = [];
  let visibleCount = 0;
  let hiddenCount = 0;
  
  markers.forEach(marker => {
    if (marker instanceof HTMLElement) {
      const isVisible = marker.style.visibility === 'visible' &&
                        marker.style.display === 'block' &&
                        marker.style.opacity === '1';
      
      if (!isVisible) {
        console.warn('Marker is not visible:', marker);
        console.warn('Style:', marker.style.cssText);
        console.warn('Attributes:', marker.attributes);
        
        if (fixIssues) {
          // Force marker to be visible
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          console.log('Fixed visibility for marker:', marker);
        }
        
        // Add to issues
        const issue: VisibilityIssueDetail = {
          elementId: marker.id || `marker-${hiddenCount}`,
          issue: 'Marker visibility issue',
          description: `Marker is not visible (visibility: ${marker.style.visibility}, display: ${marker.style.display}, opacity: ${marker.style.opacity})`,
          elementType: 'marker',
          issueType: 'visibility',
          recommendation: 'Force visibility with CSS',
          computedStyles: {
            visibility: marker.style.visibility,
            display: marker.style.display,
            opacity: marker.style.opacity,
            zIndex: marker.style.zIndex,
            position: marker.style.position,
            pointerEvents: marker.style.pointerEvents
          }
        };
        issues.push(issue);
        hiddenCount++;
      } else {
        visibleCount++;
      }
    }
  });
  
  return {
    total: markers.length,
    visible: visibleCount, 
    hidden: hiddenCount,
    issues,
    // Add the same values to the new property names for consistency
    totalMarkers: markers.length,
    visibleMarkers: visibleCount,
    hiddenMarkers: hiddenCount
  };
}
