
interface VisibilityIssueDetail {
  elementId: string;
  elementType: string;
  issueType: 'visibility' | 'display' | 'opacity' | 'zIndex' | 'position' | 'events' | 'other';
  description: string;
  computedStyles: {
    visibility: string;
    display: string;
    opacity: string;
    zIndex: string;
    position: string;
    pointerEvents: string;
  };
  recommendation: string;
}

/**
 * Test marker visibility and fix issues
 */
export function testMarkersVisibility(fixIssues = true): VisibilityIssueDetail[] {
  const issues: VisibilityIssueDetail[] = [];
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  
  console.log(`Testing visibility of ${markers.length} markers on page`);
  
  // First check if we have any markers at all
  if (markers.length === 0) {
    const issue: VisibilityIssueDetail = {
      elementId: 'none',
      elementType: 'marker',
      issueType: 'other',
      description: 'No markers found on the page',
      computedStyles: {
        visibility: 'n/a',
        display: 'n/a',
        opacity: 'n/a',
        zIndex: 'n/a',
        position: 'n/a',
        pointerEvents: 'n/a'
      },
      recommendation: 'Check marker creation logic'
    };
    issues.push(issue);
    return issues;
  }
  
  // Check each marker for visibility issues
  markers.forEach((marker, index) => {
    if (marker instanceof HTMLElement) {
      const computed = window.getComputedStyle(marker);
      const id = marker.id || `marker-${index}`;
      const markerType = marker.classList.contains('custom-marker') ? 'custom-marker' : 'mapboxgl-marker';
      
      // Check critical properties
      if (computed.visibility !== 'visible') {
        const issue: VisibilityIssueDetail = {
          elementId: id,
          elementType: markerType,
          issueType: 'visibility',
          description: `Marker has visibility: ${computed.visibility}`,
          computedStyles: {
            visibility: computed.visibility,
            display: computed.display,
            opacity: computed.opacity,
            zIndex: computed.zIndex,
            position: computed.position,
            pointerEvents: computed.pointerEvents
          },
          recommendation: 'Set style.visibility = "visible"'
        };
        issues.push(issue);
        
        if (fixIssues) {
          marker.style.visibility = 'visible';
        }
      }
      
      if (computed.display === 'none') {
        const issue: VisibilityIssueDetail = {
          elementId: id,
          elementType: markerType,
          issueType: 'display',
          description: `Marker has display: none`,
          computedStyles: {
            visibility: computed.visibility,
            display: computed.display,
            opacity: computed.opacity,
            zIndex: computed.zIndex,
            position: computed.position,
            pointerEvents: computed.pointerEvents
          },
          recommendation: 'Set style.display = "block"'
        };
        issues.push(issue);
        
        if (fixIssues) {
          marker.style.display = 'block';
        }
      }
      
      if (computed.opacity === '0') {
        const issue: VisibilityIssueDetail = {
          elementId: id,
          elementType: markerType,
          issueType: 'opacity',
          description: `Marker has opacity: 0`,
          computedStyles: {
            visibility: computed.visibility,
            display: computed.display,
            opacity: computed.opacity,
            zIndex: computed.zIndex,
            position: computed.position,
            pointerEvents: computed.pointerEvents
          },
          recommendation: 'Set style.opacity = "1"'
        };
        issues.push(issue);
        
        if (fixIssues) {
          marker.style.opacity = '1';
        }
      }
      
      if (computed.pointerEvents === 'none') {
        const issue: VisibilityIssueDetail = {
          elementId: id,
          elementType: markerType,
          issueType: 'events',
          description: `Marker has pointerEvents: none, which blocks clicks`,
          computedStyles: {
            visibility: computed.visibility,
            display: computed.display,
            opacity: computed.opacity,
            zIndex: computed.zIndex,
            position: computed.position,
            pointerEvents: computed.pointerEvents
          },
          recommendation: 'Set style.pointerEvents = "auto"'
        };
        issues.push(issue);
        
        if (fixIssues) {
          marker.style.pointerEvents = 'auto';
        }
      }
    }
  });
  
  if (issues.length > 0) {
    console.warn(`Found ${issues.length} visibility issues with markers`);
    console.table(issues.map(i => ({
      elementId: i.elementId,
      issueType: i.issueType,
      description: i.description
    })));
  } else {
    console.log('All markers appear to be properly visible');
  }
  
  return issues;
}
