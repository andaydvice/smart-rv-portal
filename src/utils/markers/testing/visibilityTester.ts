
import { toast } from "sonner";

// Define types for visibility testing
export interface MarkerVisibilityTestResult {
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
  issues: VisibilityIssueDetail[];
  timestamp: number;
}

export interface VisibilityIssueDetail {
  elementId: string;
  elementType: string;
  issueType: "visibility" | "display" | "opacity" | "zIndex" | "position" | "events" | "other";
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

// Configuration options for the visibility test
interface VisibilityTestOptions {
  fixIssues?: boolean;
  showToast?: boolean;
  logResults?: boolean;
}

/**
 * Tests for marker visibility issues across the application
 */
export function testMarkerVisibility(options: VisibilityTestOptions = {}): MarkerVisibilityTestResult {
  const { fixIssues = false, showToast = true, logResults = true } = options;
  
  // Query all potential markers using a single optimized selector
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker, .fixed-orange-marker');
  
  const result: MarkerVisibilityTestResult = {
    totalMarkers: markers.length,
    visibleMarkers: 0,
    hiddenMarkers: 0,
    issues: [],
    timestamp: Date.now()
  };
  
  // Process in batches for better performance
  const processBatch = (startIdx: number, batchSize: number) => {
    const endIdx = Math.min(startIdx + batchSize, markers.length);
    
    for (let i = startIdx; i < endIdx; i++) {
      const marker = markers[i] as HTMLElement;
      if (!(marker instanceof HTMLElement)) continue;
      
      const computedStyle = window.getComputedStyle(marker);
      const isVisible = 
        computedStyle.visibility !== 'hidden' && 
        computedStyle.display !== 'none' && 
        computedStyle.opacity !== '0';
      
      // Count marker visibility
      if (isVisible) {
        result.visibleMarkers++;
      } else {
        result.hiddenMarkers++;
        
        // Determine issue type
        let issueType: VisibilityIssueDetail['issueType'] = 'other';
        if (computedStyle.visibility === 'hidden') issueType = 'visibility';
        else if (computedStyle.display === 'none') issueType = 'display';
        else if (computedStyle.opacity === '0') issueType = 'opacity';
        
        // Add issue to result
        const issue: VisibilityIssueDetail = {
          elementId: marker.id || `marker-${i}`,
          elementType: Array.from(marker.classList).join(' '),
          issueType,
          description: `Marker is not visible (${issueType} issue)`,
          computedStyles: {
            visibility: computedStyle.visibility,
            display: computedStyle.display,
            opacity: computedStyle.opacity,
            zIndex: computedStyle.zIndex,
            position: computedStyle.position,
            pointerEvents: computedStyle.pointerEvents
          },
          recommendation: `Set ${issueType} to ensure marker is visible`
        };
        
        result.issues.push(issue);
        
        // Fix issues if requested
        if (fixIssues) {
          marker.style.cssText += `
            visibility: visible !important;
            display: block !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            pointer-events: auto !important;
            position: absolute !important;
          `;
          marker.setAttribute('data-fixed-by-test', 'true');
        }
      }
    }
    
    // Process next batch if needed
    if (endIdx < markers.length) {
      setTimeout(() => processBatch(endIdx, batchSize), 0);
    } else {
      // All batches processed, show results
      if (logResults) {
        console.log(`Marker Visibility Test: ${result.visibleMarkers}/${result.totalMarkers} markers visible`);
        
        if (result.issues.length > 0) {
          console.warn(`Found ${result.issues.length} visibility issues:`, result.issues);
        }
      }
      
      if (showToast) {
        if (result.issues.length > 0) {
          if (fixIssues) {
            toast.success(`Fixed ${result.issues.length} marker visibility issues`);
          } else {
            toast.warning(`Found ${result.issues.length} marker visibility issues`);
          }
        } else if (result.totalMarkers > 0) {
          toast.success(`All ${result.totalMarkers} markers are visible`);
        }
      }
    }
  };
  
  // Start batch processing with small batches for better performance
  processBatch(0, 10);
  
  return result;
}

/**
 * Setup continuous monitoring of marker visibility
 */
export function monitorMarkerVisibility(intervalMs = 5000, autoFix = false) {
  const intervalId = setInterval(() => {
    testMarkerVisibility({ 
      fixIssues: autoFix, 
      showToast: false, 
      logResults: false 
    });
  }, intervalMs);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
}

/**
 * Creates a visual debug overlay on map markers for better testing
 */
export function createMarkerDebugOverlay() {
  // Create a container for the debug overlay
  const overlayContainer = document.createElement('div');
  overlayContainer.className = 'marker-debug-overlay';
  overlayContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    z-index: 10000;
    font-family: monospace;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
  `;
  
  // Create info panel
  const infoPanel = document.createElement('div');
  infoPanel.innerHTML = `
    <h4>Marker Debug</h4>
    <p>Total Markers: <span id="total-markers">0</span></p>
    <p>Visible: <span id="visible-markers">0</span></p>
    <p>Hidden: <span id="hidden-markers">0</span></p>
    <button id="fix-markers-btn">Fix All</button>
    <button id="close-debug-btn">Close</button>
  `;
  overlayContainer.appendChild(infoPanel);
  
  // Add highlighting to markers for visibility
  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach((marker, idx) => {
    if (marker instanceof HTMLElement) {
      // Add debug outline
      marker.style.outline = '2px solid red';
      marker.setAttribute('data-debug-id', `marker-${idx}`);
      
      // Add marker to list in overlay
      const markerItem = document.createElement('div');
      markerItem.style.marginTop = '5px';
      markerItem.style.padding = '3px';
      markerItem.style.borderTop = '1px solid #444';
      
      const computedStyle = window.getComputedStyle(marker);
      const isVisible = 
        computedStyle.visibility !== 'hidden' && 
        computedStyle.display !== 'none' && 
        computedStyle.opacity !== '0';
      
      markerItem.innerHTML = `
        <div>ID: marker-${idx}</div>
        <div>Visible: ${isVisible ? '✅' : '❌'}</div>
        <button data-marker-id="marker-${idx}" class="fix-single-marker">Fix</button>
      `;
      
      overlayContainer.appendChild(markerItem);
    }
  });
  
  // Add to document
  document.body.appendChild(overlayContainer);
  
  // Setup event handlers
  const closeBtn = document.getElementById('close-debug-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlayContainer.remove();
      
      // Remove debug outlines
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.outline = '';
        }
      });
    });
  }
  
  const fixAllBtn = document.getElementById('fix-markers-btn');
  if (fixAllBtn) {
    fixAllBtn.addEventListener('click', () => {
      testMarkerVisibility({ fixIssues: true, showToast: true });
      
      // Update counts
      const result = testMarkerVisibility({ showToast: false, logResults: false });
      
      const totalMarkers = document.getElementById('total-markers');
      const visibleMarkers = document.getElementById('visible-markers');
      const hiddenMarkers = document.getElementById('hidden-markers');
      
      if (totalMarkers) totalMarkers.textContent = result.totalMarkers.toString();
      if (visibleMarkers) visibleMarkers.textContent = result.visibleMarkers.toString();
      if (hiddenMarkers) hiddenMarkers.textContent = result.hiddenMarkers.toString();
    });
  }
  
  // Setup fix buttons for individual markers
  document.querySelectorAll('.fix-single-marker').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const markerId = (e.currentTarget as HTMLElement).getAttribute('data-marker-id');
      const marker = document.querySelector(`[data-debug-id="${markerId}"]`);
      
      if (marker instanceof HTMLElement) {
        marker.style.cssText += `
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
          z-index: 9999 !important;
          pointer-events: auto !important;
          position: absolute !important;
        `;
        marker.setAttribute('data-fixed-by-debug', 'true');
        toast.success(`Fixed marker ${markerId}`);
      }
    });
  });
  
  // Update counts initially
  const result = testMarkerVisibility({ showToast: false, logResults: false });
  
  const totalMarkers = document.getElementById('total-markers');
  const visibleMarkers = document.getElementById('visible-markers');
  const hiddenMarkers = document.getElementById('hidden-markers');
  
  if (totalMarkers) totalMarkers.textContent = result.totalMarkers.toString();
  if (visibleMarkers) visibleMarkers.textContent = result.visibleMarkers.toString();
  if (hiddenMarkers) hiddenMarkers.textContent = result.hiddenMarkers.toString();
  
  return overlayContainer;
}

/**
 * Performs a comprehensive audit of marker visibility
 * Returns a detailed report
 */
export function auditMarkerVisibility(): string {
  const result = testMarkerVisibility({ showToast: false, logResults: false });
  
  let report = `
MARKER VISIBILITY AUDIT
======================
Time: ${new Date(result.timestamp).toLocaleTimeString()}

SUMMARY:
- Total markers: ${result.totalMarkers}
- Visible markers: ${result.visibleMarkers}
- Hidden markers: ${result.hiddenMarkers}
- Visibility rate: ${result.totalMarkers > 0 ? Math.round((result.visibleMarkers / result.totalMarkers) * 100) : 0}%

${result.issues.length > 0 ? `ISSUES FOUND (${result.issues.length}):` : 'No visibility issues found!'}
`;

  // Add detailed issues
  result.issues.forEach((issue, idx) => {
    report += `
Issue #${idx + 1}: ${issue.elementType} (${issue.elementId})
Type: ${issue.issueType}
Description: ${issue.description}
Computed styles:
- visibility: ${issue.computedStyles.visibility}
- display: ${issue.computedStyles.display}
- opacity: ${issue.computedStyles.opacity}
- z-index: ${issue.computedStyles.zIndex}
- position: ${issue.computedStyles.position}
- pointer-events: ${issue.computedStyles.pointerEvents}
Recommendation: ${issue.recommendation}
`;
  });
  
  console.log(report);
  return report;
}
