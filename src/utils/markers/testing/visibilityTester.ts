import type { MarkerVisibilityTestResult, VisibilityIssueDetail } from '../types';

/**
 * Test marker visibility and fix issues
 */
export function testMarkersVisibility(fixIssues = true): MarkerVisibilityTestResult {
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
    return {
      totalMarkers: 0,
      visibleMarkers: 0,
      hiddenMarkers: 0,
      issues
    };
  }
  
  let visibleCount = 0;
  let hiddenCount = 0;
  
  // Check each marker for visibility issues
  markers.forEach((marker, index) => {
    if (marker instanceof HTMLElement) {
      const computed = window.getComputedStyle(marker);
      const id = marker.id || `marker-${index}`;
      const markerType = marker.classList.contains('custom-marker') ? 'custom-marker' : 'mapboxgl-marker';
      let hasIssue = false;
      
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
        hasIssue = true;
        
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
        hasIssue = true;
        
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
        hasIssue = true;
        
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
        hasIssue = true;
        
        if (fixIssues) {
          marker.style.pointerEvents = 'auto';
        }
      }
      
      if (hasIssue) {
        hiddenCount++;
      } else {
        visibleCount++;
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
  
  return {
    totalMarkers: markers.length,
    visibleMarkers: visibleCount,
    hiddenMarkers: hiddenCount,
    issues
  };
}

/**
 * Create a debugger overlay to visualize marker issues
 */
export function createMarkerDebugger() {
  console.log('Creating marker debugger overlay');
  
  // Create a container for the debugger
  const debuggerContainer = document.createElement('div');
  debuggerContainer.className = 'marker-debugger-overlay';
  debuggerContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 10px;
    z-index: 10000;
    font-family: monospace;
    font-size: 12px;
    max-height: 100vh;
    overflow-y: auto;
  `;
  
  // Run the visibility test
  const result = testMarkersVisibility(false);
  
  // Create the content
  let content = `
    <h3>Marker Debugger</h3>
    <div>Total Markers: ${result.totalMarkers}</div>
    <div>Visible: ${result.visibleMarkers}</div>
    <div>Hidden: ${result.hiddenMarkers}</div>
    <hr>
  `;
  
  // Add issue details
  if (result.issues.length > 0) {
    content += `<h4>${result.issues.length} Issues Found:</h4>`;
    
    result.issues.forEach((issue, index) => {
      content += `
        <div style="margin-bottom: 10px; border-left: 3px solid red; padding-left: 5px;">
          <div><strong>Issue #${index + 1}:</strong> ${issue.description}</div>
          <div>Element: ${issue.elementId} (${issue.elementType})</div>
          <div>Type: ${issue.issueType}</div>
          <div><strong>Fix:</strong> ${issue.recommendation}</div>
        </div>
      `;
    });
    
    // Add fix button
    content += `
      <button id="fix-marker-issues" style="
        background: #4CAF50;
        border: none;
        color: white;
        padding: 5px 10px;
        cursor: pointer;
        margin-top: 10px;
      ">Fix All Issues</button>
    `;
  } else {
    content += `<div style="color: #4CAF50;">No visibility issues detected!</div>`;
  }
  
  // Add close button
  content += `
    <button id="close-marker-debugger" style="
      background: #f44336;
      border: none;
      color: white;
      padding: 5px 10px;
      cursor: pointer;
      margin-top: 10px;
      margin-left: 10px;
    ">Close Debugger</button>
  `;
  
  // Set content and add to page
  debuggerContainer.innerHTML = content;
  document.body.appendChild(debuggerContainer);
  
  // Add event listeners
  const fixButton = document.getElementById('fix-marker-issues');
  if (fixButton) {
    fixButton.addEventListener('click', () => {
      testMarkersVisibility(true);
      document.body.removeChild(debuggerContainer);
      createMarkerDebugger(); // Recreate with updated info
    });
  }
  
  const closeButton = document.getElementById('close-marker-debugger');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      document.body.removeChild(debuggerContainer);
    });
  }
  
  return debuggerContainer;
}

// Monitor marker visibility at regular intervals
export function monitorMarkerVisibility(interval = 5000) {
  const timer = setInterval(() => {
    testMarkersVisibility(true);
  }, interval);
  
  return () => clearInterval(timer);
}

// Alias for the debug overlay
export const createMarkerDebugOverlay = createMarkerDebugger;
