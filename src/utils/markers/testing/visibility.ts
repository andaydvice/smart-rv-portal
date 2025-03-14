
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
          elementType: 'marker',
          issueType: 'visibility',
          description: `Marker is not visible (visibility: ${marker.style.visibility}, display: ${marker.style.display}, opacity: ${marker.style.opacity})`,
          computedStyles: {
            visibility: marker.style.visibility,
            display: marker.style.display,
            opacity: marker.style.opacity,
            zIndex: marker.style.zIndex,
            position: marker.style.position,
            pointerEvents: marker.style.pointerEvents
          },
          recommendation: 'Force visibility with CSS'
        };
        issues.push(issue);
        hiddenCount++;
      } else {
        visibleCount++;
      }
    }
  });
  
  return {
    totalMarkers: markers.length,
    visibleMarkers: visibleCount,
    hiddenMarkers: hiddenCount,
    issues
  };
}
