
import { MarkerVisibilityTestResult, VisibilityIssueDetail } from '../../types';

/**
 * Tests marker visibility using a comprehensive approach
 */
export function testMarkerVisibility(): MarkerVisibilityTestResult {
  console.log('Running comprehensive marker visibility test');
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
  const issues: VisibilityIssueDetail[] = [];
  let visibleCount = 0;
  let hiddenCount = 0;
  
  // Test 1: Check if markers exist
  if (markers.length === 0) {
    issues.push({
      elementId: 'markers-container',
      issue: 'No markers found in the DOM',
      elementType: 'container',
      issueType: 'missing',
      description: 'No markers were found in the document',
      recommendation: 'Check marker creation logic'
    });
    
    return {
      total: 0,
      visible: 0,
      hidden: 0,
      issues,
      totalMarkers: 0,
      visibleMarkers: 0,
      hiddenMarkers: 0
    };
  }
  
  // Test 2: Check CSS visibility
  markers.forEach((marker, index) => {
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
          elementId: marker.id || `marker-${index}`,
          issue: 'Marker has CSS visibility issues',
          elementType: 'marker',
          issueType: 'visibility',
          description: `Marker not visible (display=${style.display}, visibility=${style.visibility}, opacity=${style.opacity})`,
          recommendation: 'Force visibility with inline styles',
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
  
  // Test 3: Check placement on the page
  markers.forEach((marker, index) => {
    if (marker instanceof HTMLElement) {
      const rect = marker.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        issues.push({
          elementId: marker.id || `marker-${index}`,
          issue: 'Marker has zero dimensions',
          elementType: 'marker',
          issueType: 'dimensions',
          description: `Marker has zero width or height (width=${rect.width}, height=${rect.height})`,
          recommendation: 'Set explicit dimensions on marker',
          computedStyles: {
            visibility: marker.style.visibility,
            display: marker.style.display,
            opacity: marker.style.opacity,
            zIndex: marker.style.zIndex,
            position: marker.style.position,
            pointerEvents: marker.style.pointerEvents
          }
        });
      }
      
      if (rect.top < -100 || rect.left < -100) {
        issues.push({
          elementId: marker.id || `marker-${index}`,
          issue: 'Marker is positioned outside viewport',
          elementType: 'marker',
          issueType: 'position',
          description: `Marker is positioned outside viewport (top=${rect.top}, left=${rect.left})`,
          recommendation: 'Check marker positioning logic',
          computedStyles: {
            visibility: marker.style.visibility,
            display: marker.style.display,
            opacity: marker.style.opacity,
            zIndex: marker.style.zIndex,
            position: marker.style.position,
            pointerEvents: marker.style.pointerEvents
          }
        });
      }
    }
  });
  
  // Test 4: Check for pointer events
  markers.forEach((marker, index) => {
    if (marker instanceof HTMLElement) {
      const style = window.getComputedStyle(marker);
      if (style.pointerEvents === 'none') {
        issues.push({
          elementId: marker.id || `marker-${index}`,
          issue: 'Marker has pointer-events: none',
          elementType: 'marker',
          issueType: 'interaction',
          description: 'Marker cannot be clicked due to pointer-events: none',
          recommendation: 'Set pointer-events: auto',
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
  
  // Process issues for better reporting
  const processedIssues = issues.map(issue => {
    // Make sure recommended solutions are clearly stated
    if (issue.issueType === 'visibility') {
      issue.recommendation = 'Apply: marker.style.visibility = "visible"; marker.style.display = "block"; marker.style.opacity = "1"';
    }
    
    return issue;
  });
  
  // Return the test results
  return {
    total: markers.length,
    visible: visibleCount,
    hidden: hiddenCount,
    issues: processedIssues,
    totalMarkers: markers.length,
    visibleMarkers: visibleCount,
    hiddenMarkers: hiddenCount
  };
}
