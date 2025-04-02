
/**
 * React components for the preview debugging system
 * This file contains the JSX versions of components used in the debugging system
 */
import React from 'react';
import PreviewErrorDisplay from '@/components/debug/PreviewErrorDisplay';
import { logPreviewError } from './previewErrorLogger';

/**
 * Debug component wrapper that catches and displays rendering errors
 * JSX version to be used in .tsx files
 */
export const withPreviewDebugJSX = <P extends object>(
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
