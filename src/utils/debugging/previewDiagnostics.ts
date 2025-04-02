
/**
 * Diagnostics utilities to check for blank previews and other issues
 */

/**
 * Checks for blank preview by scanning DOM elements
 */
export const checkForBlankPreview = (): void => {
  // Check if there's content in the main containers
  const rootElement = document.getElementById('root');
  
  if (!rootElement || !rootElement.children.length) {
    console.error("⚠️ BLANK PREVIEW DETECTED: Root element is empty");
    return;
  }
  
  // Check if main content areas have visible content
  const contentContainers = document.querySelectorAll('main, [role="main"], .content, #content');
  
  if (contentContainers.length === 0) {
    console.warn("No main content containers found to check");
    return;
  }
  
  let allEmpty = true;
  contentContainers.forEach((container) => {
    if (container.children.length > 0) {
      allEmpty = false;
    }
  });
  
  if (allEmpty) {
    console.error("⚠️ BLANK PREVIEW DETECTED: Content containers exist but are empty");
  }

  // Check for CSS visibility issues
  const hiddenElements = document.querySelectorAll(
    '[style*="display: none"], [style*="visibility: hidden"], [style*="opacity: 0"]'
  );
  
  if (hiddenElements.length > 0) {
    console.warn("Potential visibility issues detected:", hiddenElements.length, "hidden elements");
  }
  
  // Report visible elements count
  console.info("Visible elements count:", document.querySelectorAll('*:not([style*="display: none"])').length);
};

/**
 * Run diagnostics on the current preview
 */
export const runPreviewDiagnostics = (): void => {
  console.group("Preview Diagnostics Report");
  
  try {
    // Check for blank preview
    checkForBlankPreview();
    
    // Report window dimensions
    console.info("Window dimensions:", {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    });
    
    // Check for JavaScript errors
    console.info("Checking for recent errors...");
    const errorHistory = JSON.parse(sessionStorage.getItem('previewErrors') || '[]');
    if (errorHistory.length > 0) {
      console.warn("Recent errors detected:", errorHistory.length);
      console.table(errorHistory.map(e => ({ 
        component: e.component,
        file: e.filePath,
        error: e.errorMessage,
        time: new Date(e.timestamp).toLocaleTimeString()
      })));
    } else {
      console.info("No recent errors detected");
    }

    // DOM content check
    console.info("DOM content status:", document.readyState);
    console.info("Body children count:", document.body.children.length);
    
  } catch (e) {
    console.error("Error running diagnostics:", e);
  }
  
  console.groupEnd();
};
