
/**
 * Utility functions to diagnose blank preview issues
 */

interface PreviewErrorDetails {
  component: string;
  filePath: string;
  errorMessage: string;
  timestamp: string;
  elementInfo?: {
    id?: string;
    className?: string;
    tagName?: string;
  };
  additionalInfo?: Record<string, any>;
}

/**
 * Logs detailed information about rendering errors
 * to help diagnose blank preview issues
 */
export const logPreviewError = (
  component: string,
  filePath: string,
  error: Error,
  additionalInfo?: Record<string, any>
): void => {
  const errorDetails: PreviewErrorDetails = {
    component,
    filePath,
    errorMessage: error.message,
    timestamp: new Date().toISOString(),
    additionalInfo
  };
  
  // Log detailed error information to console
  console.error("⚠️ PREVIEW ERROR DETECTED ⚠️");
  console.error(JSON.stringify(errorDetails, null, 2));
  console.error("Error stack:", error.stack);
  
  // Store in session storage for recovery
  try {
    const existingErrors = JSON.parse(sessionStorage.getItem('previewErrors') || '[]');
    existingErrors.push(errorDetails);
    sessionStorage.setItem('previewErrors', JSON.stringify(existingErrors.slice(-10))); // Keep last 10 errors
  } catch (e) {
    console.error("Failed to store error in session storage:", e);
  }
};

/**
 * Debug component wrapper that catches and displays rendering errors
 */
export const withPreviewDebug = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string,
  filePath: string
): React.FC<P> => {
  const WithPreviewDebug: React.FC<P> = (props) => {
    try {
      return <WrappedComponent {...props} />;
    } catch (error) {
      logPreviewError(componentName, filePath, error as Error);
      return <PreviewErrorDisplay error={error as Error} component={componentName} filePath={filePath} />;
    }
  };
  
  WithPreviewDebug.displayName = `withPreviewDebug(${componentName})`;
  return WithPreviewDebug;
};

/**
 * Component that displays error information when rendering fails
 */
const PreviewErrorDisplay: React.FC<{ 
  error: Error; 
  component: string; 
  filePath: string;
}> = ({ 
  error, 
  component, 
  filePath 
}) => {
  return (
    <div className="p-4 m-4 bg-red-900/50 border border-red-500 rounded-lg text-white">
      <h3 className="text-xl font-bold mb-2">⚠️ Preview Rendering Error</h3>
      <div className="mb-2">
        <span className="font-semibold">Component:</span> {component}
      </div>
      <div className="mb-2">
        <span className="font-semibold">File:</span> {filePath}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Error:</span> {error.message}
      </div>
      {error.stack && (
        <div className="mt-4">
          <details>
            <summary className="cursor-pointer text-yellow-300 hover:text-yellow-200">
              Stack Trace
            </summary>
            <pre className="mt-2 p-2 bg-gray-900 rounded text-xs overflow-auto max-h-[200px] whitespace-pre-wrap">
              {error.stack}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

/**
 * Hook to log errors in functional components
 */
export const usePreviewDebugger = (
  componentName: string,
  filePath: string
) => {
  const logError = (error: Error, additionalInfo?: Record<string, any>) => {
    logPreviewError(componentName, filePath, error, additionalInfo);
  };

  return { logError };
};

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

// Automatically run diagnostics on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      runPreviewDiagnostics();
    }, 1000); // Wait 1 second after load to check
  });
}

// Export a global function for manual diagnostics
if (typeof window !== 'undefined') {
  (window as any).debugPreview = runPreviewDiagnostics;
  (window as any).clearPreviewErrors = () => {
    sessionStorage.removeItem('previewErrors');
    console.info("Preview error history cleared");
  };
}
