
/**
 * Component wrapper utilities for debug purposes
 */
import React from 'react';
import { logPreviewError } from './previewErrorLogger';

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
      return React.createElement(WrappedComponent, props);
    } catch (error) {
      logPreviewError(componentName, filePath, error as Error);
      return React.createElement(
        'div', 
        { className: "p-4 m-4 bg-red-900/50 border border-red-500 rounded-lg text-white" },
        [
          React.createElement('h3', { key: 'title', className: "text-xl font-bold mb-2" }, "⚠️ Preview Rendering Error"),
          React.createElement('div', { key: 'component', className: "mb-2" }, [
            React.createElement('span', { key: 'label', className: "font-semibold" }, "Component:"),
            " " + componentName
          ]),
          React.createElement('div', { key: 'file', className: "mb-2" }, [
            React.createElement('span', { key: 'label', className: "font-semibold" }, "File:"),
            " " + filePath
          ]),
          React.createElement('div', { key: 'error', className: "mb-2" }, [
            React.createElement('span', { key: 'label', className: "font-semibold" }, "Error:"),
            " " + (error as Error).message
          ]),
          (error as Error).stack && React.createElement('div', { key: 'stack', className: "mt-4" }, 
            React.createElement('details', {}, [
              React.createElement('summary', { 
                key: 'summary',
                className: "cursor-pointer text-yellow-300 hover:text-yellow-200" 
              }, "Stack Trace"),
              React.createElement('pre', { 
                key: 'pre',
                className: "mt-2 p-2 bg-gray-900 rounded text-xs overflow-auto max-h-[200px] whitespace-pre-wrap" 
              }, (error as Error).stack)
            ])
          )
        ]
      );
    }
  };
  
  WithPreviewDebug.displayName = `withPreviewDebug(${componentName})`;
  return WithPreviewDebug;
};
