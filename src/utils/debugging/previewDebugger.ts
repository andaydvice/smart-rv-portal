
/**
 * Utility functions to diagnose blank preview issues
 */
import { logPreviewError } from './previewErrorLogger';
import { usePreviewDebugger } from './previewDebugHooks';
import { withPreviewDebug } from './previewDebugWrapper';
import { checkForBlankPreview, runPreviewDiagnostics } from './previewDiagnostics';

// Re-export the core functions
export { 
  logPreviewError, 
  usePreviewDebugger, 
  withPreviewDebug,
  checkForBlankPreview,
  runPreviewDiagnostics
};

// Automatically run diagnostics on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      runPreviewDiagnostics();
    }, 1000); // Wait 1 second after load to check
  });
}

// Export global functions for manual diagnostics
if (typeof window !== 'undefined') {
  (window as any).debugPreview = runPreviewDiagnostics;
  (window as any).clearPreviewErrors = () => {
    sessionStorage.removeItem('previewErrors');
    console.info("Preview error history cleared");
  };
}
