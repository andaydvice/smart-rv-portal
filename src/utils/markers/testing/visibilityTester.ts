
import { toast } from "sonner";

/**
 * Interface for marker visibility test results
 */
export interface MarkerVisibilityTestResult {
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
  styleIssues: number;
  zIndexIssues: number;
  positionIssues: number;
  eventIssues: number;
  details: VisibilityIssueDetail[];
  timestamp: number;
  duration: number;
}

/**
 * Interface for detailed marker visibility issues
 */
export interface VisibilityIssueDetail {
  elementId: string;
  elementType: string;
  issueType: 'visibility' | 'display' | 'opacity' | 'zIndex' | 'position' | 'events' | 'other';
  description: string;
  computedStyles?: Partial<CSSStyleDeclaration>;
  recommendation: string;
}

/**
 * Runs a comprehensive test on marker visibility and reports issues
 */
export function testMarkerVisibility(options?: {
  showToast?: boolean;
  logToConsole?: boolean;
  selector?: string;
  fixIssues?: boolean;
}): MarkerVisibilityTestResult {
  const startTime = performance.now();
  const {
    showToast = true,
    logToConsole = true,
    selector = '.mapboxgl-marker, .custom-marker',
    fixIssues = false
  } = options || {};

  // Find all markers in the document
  const markers = document.querySelectorAll(selector);
  const issues: VisibilityIssueDetail[] = [];
  
  // Count different types of issues
  let hiddenMarkers = 0;
  let styleIssues = 0;
  let zIndexIssues = 0;
  let positionIssues = 0;
  let eventIssues = 0;

  // Test each marker
  markers.forEach((marker, index) => {
    if (!(marker instanceof HTMLElement)) return;
    
    const markerId = marker.id || `unnamed-marker-${index}`;
    const markerType = marker.className || 'unknown';
    const computedStyle = window.getComputedStyle(marker);
    const issues: string[] = [];
    
    // Check visibility
    if (computedStyle.visibility !== 'visible') {
      issues.push(`visibility: ${computedStyle.visibility}`);
      hiddenMarkers++;
    }
    
    // Check display
    if (computedStyle.display === 'none') {
      issues.push(`display: ${computedStyle.display}`);
      hiddenMarkers++;
    }
    
    // Check opacity
    if (parseFloat(computedStyle.opacity) < 0.1) {
      issues.push(`opacity: ${computedStyle.opacity}`);
      styleIssues++;
    }
    
    // Check z-index
    if (parseInt(computedStyle.zIndex) < 1) {
      issues.push(`zIndex: ${computedStyle.zIndex}`);
      zIndexIssues++;
    }
    
    // Check position
    if (computedStyle.position !== 'absolute') {
      issues.push(`position: ${computedStyle.position}`);
      positionIssues++;
    }
    
    // Check pointer events
    if (computedStyle.pointerEvents === 'none') {
      issues.push(`pointerEvents: ${computedStyle.pointerEvents}`);
      eventIssues++;
    }
    
    // If there are issues with this marker, add it to the list
    if (issues.length > 0) {
      // Determine issue type for categorization
      let primaryIssueType: 'visibility' | 'display' | 'opacity' | 'zIndex' | 'position' | 'events' | 'other' = 'other';
      
      if (computedStyle.visibility !== 'visible') {
        primaryIssueType = 'visibility';
      } else if (computedStyle.display === 'none') {
        primaryIssueType = 'display';
      } else if (parseFloat(computedStyle.opacity) < 0.1) {
        primaryIssueType = 'opacity';
      } else if (parseInt(computedStyle.zIndex) < 1) {
        primaryIssueType = 'zIndex';
      } else if (computedStyle.position !== 'absolute') {
        primaryIssueType = 'position';
      } else if (computedStyle.pointerEvents === 'none') {
        primaryIssueType = 'events';
      }
      
      // Create recommendation based on the issue
      let recommendation = 'Apply forced visibility styles';
      if (primaryIssueType === 'zIndex') {
        recommendation = 'Increase z-index to ensure marker is above other elements';
      } else if (primaryIssueType === 'position') {
        recommendation = 'Set position to absolute for proper placement';
      } else if (primaryIssueType === 'events') {
        recommendation = 'Enable pointer-events for interaction';
      }
      
      // Add to detailed issues list
      issues.push({
        elementId: markerId,
        elementType: markerType,
        issueType: primaryIssueType,
        description: `Marker has style issues: ${issues.join(', ')}`,
        computedStyles: {
          visibility: computedStyle.visibility,
          display: computedStyle.display,
          opacity: computedStyle.opacity,
          zIndex: computedStyle.zIndex,
          position: computedStyle.position,
          pointerEvents: computedStyle.pointerEvents
        },
        recommendation
      });
      
      // Apply fixes if requested
      if (fixIssues) {
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
        marker.style.zIndex = '9999';
        marker.style.position = 'absolute';
        marker.style.pointerEvents = 'auto';
        marker.setAttribute('data-fixed-by-test', 'true');
      }
    }
  });

  // Calculate results
  const visibleMarkers = markers.length - hiddenMarkers;
  const endTime = performance.now();
  const duration = endTime - startTime;

  const result: MarkerVisibilityTestResult = {
    totalMarkers: markers.length,
    visibleMarkers,
    hiddenMarkers,
    styleIssues,
    zIndexIssues,
    positionIssues,
    eventIssues,
    details: issues,
    timestamp: Date.now(),
    duration
  };

  // Log results if requested
  if (logToConsole) {
    console.group('Marker Visibility Test Results');
    console.log(`Found ${markers.length} markers, ${visibleMarkers} visible, ${hiddenMarkers} hidden`);
    
    if (issues.length > 0) {
      console.warn(`Found ${issues.length} markers with visibility issues`);
      console.table(issues.map(issue => ({
        id: issue.elementId,
        type: issue.elementType,
        issue: issue.issueType,
        description: issue.description
      })));
    } else {
      console.log('No visibility issues detected');
    }
    
    console.log(`Test completed in ${duration.toFixed(2)}ms`);
    console.groupEnd();
  }

  // Show toast notification if requested
  if (showToast) {
    if (hiddenMarkers > 0) {
      toast.error(`Found ${hiddenMarkers} hidden markers out of ${markers.length}`, {
        description: 'Use the console for detailed information',
        action: {
          label: 'Fix Now',
          onClick: () => testMarkerVisibility({ ...options, fixIssues: true })
        }
      });
    } else if (markers.length > 0) {
      toast.success(`All ${markers.length} markers are visible`);
    } else {
      toast.warning('No markers found on the page');
    }
  }

  return result;
}

/**
 * Periodically runs visibility tests to detect issues in real-time
 */
export function monitorMarkerVisibility(options?: {
  interval?: number;
  selector?: string;
  autoFix?: boolean;
  showToasts?: boolean;
}): () => void {
  const {
    interval = 2000,
    selector = '.mapboxgl-marker, .custom-marker',
    autoFix = false,
    showToasts = false
  } = options || {};

  let previousResult: MarkerVisibilityTestResult | null = null;
  
  // Run initial test
  previousResult = testMarkerVisibility({
    showToast: showToasts,
    logToConsole: true,
    selector,
    fixIssues: autoFix
  });

  // Set up interval to periodically check
  const intervalId = setInterval(() => {
    const result = testMarkerVisibility({
      showToast: false,
      logToConsole: false,
      selector,
      fixIssues: autoFix
    });
    
    // Only show notifications if something changed
    if (previousResult && 
        (previousResult.visibleMarkers !== result.visibleMarkers || 
         previousResult.totalMarkers !== result.totalMarkers)) {
      
      if (showToasts) {
        if (result.visibleMarkers < previousResult.visibleMarkers) {
          toast.warning(`Markers disappeared: ${previousResult.visibleMarkers} → ${result.visibleMarkers}`);
          
          // Log only if there's a significant change
          console.warn('Marker visibility decreased:', {
            before: previousResult,
            after: result
          });
          
          if (autoFix) {
            testMarkerVisibility({ showToast: false, fixIssues: true, selector });
          }
        } else if (result.totalMarkers > previousResult.totalMarkers) {
          toast.info(`New markers: ${result.totalMarkers - previousResult.totalMarkers}`);
        }
      }
    }
    
    previousResult = result;
  }, interval);

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Creates a visual debug overlay for markers
 */
export function createMarkerDebugOverlay(): () => void {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'marker-debug-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    max-width: 300px;
    max-height: 400px;
    overflow: auto;
    pointer-events: auto;
  `;
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.cssText = `
    position: absolute;
    top: 5px;
    right: 5px;
    background: #666;
    border: none;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    cursor: pointer;
  `;
  closeButton.addEventListener('click', () => {
    document.body.removeChild(overlay);
  });
  overlay.appendChild(closeButton);
  
  // Create content container
  const content = document.createElement('div');
  content.id = 'marker-debug-content';
  overlay.appendChild(content);
  
  // Add test button
  const testButton = document.createElement('button');
  testButton.textContent = 'Run Visibility Test';
  testButton.style.cssText = `
    margin-top: 10px;
    background: #F97316;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
  `;
  testButton.addEventListener('click', () => {
    const result = testMarkerVisibility({ showToast: true });
    updateOverlayContent(result);
  });
  overlay.appendChild(testButton);
  
  // Add fix button
  const fixButton = document.createElement('button');
  fixButton.textContent = 'Fix Visibility Issues';
  fixButton.style.cssText = `
    margin-top: 5px;
    background: #10B981;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
  `;
  fixButton.addEventListener('click', () => {
    const result = testMarkerVisibility({ fixIssues: true, showToast: true });
    updateOverlayContent(result);
  });
  overlay.appendChild(fixButton);
  
  // Add to document
  document.body.appendChild(overlay);
  
  // Initial test
  const initialResult = testMarkerVisibility({ showToast: false });
  updateOverlayContent(initialResult);
  
  // Function to update overlay content
  function updateOverlayContent(result: MarkerVisibilityTestResult) {
    const contentElement = document.getElementById('marker-debug-content');
    if (!contentElement) return;
    
    contentElement.innerHTML = `
      <div>Total markers: ${result.totalMarkers}</div>
      <div>Visible: ${result.visibleMarkers}</div>
      <div>Hidden: ${result.hiddenMarkers}</div>
      <div>Style issues: ${result.styleIssues}</div>
      <div>Z-Index issues: ${result.zIndexIssues}</div>
      <div>Position issues: ${result.positionIssues}</div>
      <div>Event issues: ${result.eventIssues}</div>
      <div>Last updated: ${new Date().toLocaleTimeString()}</div>
    `;
    
    if (result.details.length > 0) {
      contentElement.innerHTML += `<div style="margin-top: 10px; font-weight: bold;">Issues:</div>`;
      
      const issuesList = document.createElement('ul');
      issuesList.style.cssText = `
        margin-top: 5px;
        padding-left: 20px;
        font-size: 11px;
      `;
      
      result.details.slice(0, 5).forEach(issue => {
        const item = document.createElement('li');
        item.textContent = `${issue.elementId}: ${issue.description}`;
        issuesList.appendChild(item);
      });
      
      if (result.details.length > 5) {
        const item = document.createElement('li');
        item.textContent = `... and ${result.details.length - 5} more issues`;
        issuesList.appendChild(item);
      }
      
      contentElement.appendChild(issuesList);
    }
  }
  
  // Set up periodic updates
  const updateIntervalId = setInterval(() => {
    const result = testMarkerVisibility({ showToast: false, logToConsole: false });
    updateOverlayContent(result);
  }, 5000);
  
  // Return cleanup function
  return () => {
    clearInterval(updateIntervalId);
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  };
}

/**
 * Performs a one-time audit of marker visibility and returns a detailed report
 */
export function auditMarkerVisibility(): string {
  const result = testMarkerVisibility({
    showToast: false,
    logToConsole: false
  });
  
  let report = `# Marker Visibility Audit Report\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- Total markers: ${result.totalMarkers}\n`;
  report += `- Visible markers: ${result.visibleMarkers}\n`;
  report += `- Hidden markers: ${result.hiddenMarkers}\n`;
  report += `- Style issues: ${result.styleIssues}\n`;
  report += `- Z-Index issues: ${result.zIndexIssues}\n`;
  report += `- Position issues: ${result.positionIssues}\n`;
  report += `- Event issues: ${result.eventIssues}\n\n`;
  
  if (result.details.length > 0) {
    report += `## Detailed Issues\n\n`;
    
    result.details.forEach((issue, index) => {
      report += `### Issue ${index + 1}: ${issue.elementId}\n\n`;
      report += `- Type: ${issue.elementType}\n`;
      report += `- Issue: ${issue.issueType}\n`;
      report += `- Description: ${issue.description}\n`;
      report += `- Recommendation: ${issue.recommendation}\n\n`;
      
      if (issue.computedStyles) {
        report += `#### Computed Styles\n\n`;
        Object.entries(issue.computedStyles).forEach(([key, value]) => {
          if (value) report += `- ${key}: ${value}\n`;
        });
        report += `\n`;
      }
    });
  }
  
  report += `## Recommendations\n\n`;
  
  if (result.hiddenMarkers > 0) {
    report += `- Apply the \`forceMapMarkersVisible()\` function to ensure all markers are visible\n`;
    report += `- Check for any CSS rules that might be hiding markers\n`;
    report += `- Ensure marker elements have proper z-index values\n`;
  } else {
    report += `- No visibility issues detected. Maintain current implementation.\n`;
  }
  
  // Log report to console
  console.info('Marker Visibility Audit Report', report);
  
  return report;
}
