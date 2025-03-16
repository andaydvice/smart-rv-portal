
import { StorageFacility } from '@/components/storage/types';
import { MarkerVisibilityTestResult, VisibilityIssueDetail } from '../types';

/**
 * Tests marker visibility and reports any issues
 */
export function testMarkersVisibility(fixIssues: boolean = false): MarkerVisibilityTestResult {
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  console.log(`Testing visibility of ${markers.length} markers`);
  
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
  
  console.log('Marker visibility test results:', result);
  return result;
}
