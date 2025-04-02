
/**
 * React hooks for preview debugging
 */
import { logPreviewError } from './previewErrorLogger';

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
