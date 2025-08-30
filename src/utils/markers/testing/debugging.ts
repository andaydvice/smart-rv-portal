
import type { MarkerVisibilityTestResult } from '../types';
import { testMarkersVisibility } from './visibility';

/**
 * Creates a debug overlay to display marker information
 */
export function createMarkerDebugger(): () => void {
  console.log('Creating marker debugger overlay');
  
  // Run test to get marker visibility information
  const testResults = testMarkersVisibility(false);
  
  // Create debug container
  const container = document.createElement('div');
  container.className = 'marker-debugger';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: monospace;
    padding: 20px;
    z-index: 10000;
    overflow: auto;
  `;
  
  // Create header
  const header = document.createElement('div');
  header.style.cssText = `
    font-size: 24px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  `;
  
  header.innerHTML = `
    <div>Marker Debug Tool (${testResults.totalMarkers} markers)</div>
    <button id="close-debugger" style="background: #f44336; border: none; padding: 5px 10px; cursor: pointer;">Close</button>
  `;
  
  // Create content
  const content = document.createElement('div');
  content.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  `;
  
  // Statistics section
  const statsSection = document.createElement('div');
  statsSection.innerHTML = `
    <h3>Marker Statistics</h3>
    <div style="margin-bottom: 10px;">Total Markers: ${testResults.totalMarkers}</div>
    <div style="margin-bottom: 10px;">Visible Markers: ${testResults.visibleMarkers}</div>
    <div style="margin-bottom: 10px;">Hidden Markers: ${testResults.hiddenMarkers}</div>
    <button id="fix-all-markers" style="background: #4CAF50; border: none; padding: 10px; margin-top: 10px; cursor: pointer;">Fix All Markers</button>
  `;
  
  // Issues section
  const issuesSection = document.createElement('div');
  issuesSection.innerHTML = `
    <h3>Marker Issues (${testResults.issues.length})</h3>
    <div style="max-height: 600px; overflow-y: auto;">
      ${testResults.issues.map((issue, index) => `
        <div style="margin-bottom: 15px; border-left: 3px solid #ff9800; padding-left: 10px;">
          <div style="font-weight: bold;">Issue #${index + 1}: ${issue.elementId}</div>
          <div>${issue.description}</div>
          <div style="font-size: 12px; color: #aaa; margin-top: 5px;">
            <div>Visibility: ${issue.computedStyles.visibility}</div>
            <div>Display: ${issue.computedStyles.display}</div>
            <div>Opacity: ${issue.computedStyles.opacity}</div>
            <div>Z-Index: ${issue.computedStyles.zIndex}</div>
          </div>
        </div>
      `).join('')}
      ${testResults.issues.length === 0 ? '<div>No issues found!</div>' : ''}
    </div>
  `;
  
  // Append elements
  content.appendChild(statsSection);
  content.appendChild(issuesSection);
  container.appendChild(header);
  container.appendChild(content);
  document.body.appendChild(container);
  
  // Add event listeners
  const closeButton = document.getElementById('close-debugger');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      container.remove();
    });
  }
  
  const fixButton = document.getElementById('fix-all-markers');
  if (fixButton) {
    fixButton.addEventListener('click', () => {
      const fixResults = testMarkersVisibility(true);
      statsSection.innerHTML = `
        <h3>Marker Statistics (Updated)</h3>
        <div style="margin-bottom: 10px;">Total Markers: ${fixResults.totalMarkers}</div>
        <div style="margin-bottom: 10px;">Visible Markers: ${fixResults.visibleMarkers}</div>
        <div style="margin-bottom: 10px;">Hidden Markers: ${fixResults.hiddenMarkers}</div>
        <div style="color: #4CAF50; margin-top: 10px;">Fixed ${fixResults.issues.length} markers!</div>
        <button id="fix-all-markers" style="background: #4CAF50; border: none; padding: 10px; margin-top: 10px; cursor: pointer;">Refresh Stats</button>
      `;
    });
  }
  
  // Return cleanup function
  return () => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };
}

/**
 * Creates a simpler marker debug overlay
 */
export function createMarkerDebugOverlay(): () => void {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    z-index: 9999;
  `;
  
  const results = testMarkersVisibility(false);
  
  overlay.innerHTML = `
    <div style="font-weight: bold;">Markers: ${results.totalMarkers}</div>
    <div>Visible: ${results.visibleMarkers}</div>
    <div>Hidden: ${results.hiddenMarkers}</div>
    <div style="margin-top: 5px;">
      <button id="fix-markers-btn" style="background: #4CAF50; border: none; padding: 5px; cursor: pointer; font-size: 12px;">Fix</button>
      <button id="close-overlay-btn" style="background: #f44336; border: none; padding: 5px; margin-left: 5px; cursor: pointer; font-size: 12px;">Close</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add event listeners
  document.getElementById('fix-markers-btn')?.addEventListener('click', () => {
    testMarkersVisibility(true);
    const updatedResults = testMarkersVisibility(false);
    overlay.innerHTML = `
      <div style="font-weight: bold;">Markers: ${updatedResults.totalMarkers}</div>
      <div>Visible: ${updatedResults.visibleMarkers}</div>
      <div>Hidden: ${updatedResults.hiddenMarkers}</div>
      <div style="color: #4CAF50; margin-top: 5px;">Fixed!</div>
      <div style="margin-top: 5px;">
        <button id="fix-markers-btn" style="background: #4CAF50; border: none; padding: 5px; cursor: pointer; font-size: 12px;">Fix</button>
        <button id="close-overlay-btn" style="background: #f44336; border: none; padding: 5px; margin-left: 5px; cursor: pointer; font-size: 12px;">Close</button>
      </div>
    `;
    
    document.getElementById('close-overlay-btn')?.addEventListener('click', () => {
      overlay.remove();
    });
  });
  
  document.getElementById('close-overlay-btn')?.addEventListener('click', () => {
    overlay.remove();
  });
  
  return () => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  };
}
