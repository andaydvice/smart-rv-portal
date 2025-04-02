
/**
 * Utility for logging preview errors with detailed information
 */

export interface PreviewErrorDetails {
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
