
import type { MarkerVisibilityTestResult } from '../../types';
import { testMarkersVisibility } from '../core/testVisibility';

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

// Alias for the debug overlay
export const createMarkerDebugOverlay = createMarkerDebugger;
