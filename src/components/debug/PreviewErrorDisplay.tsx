
import React from 'react';

interface PreviewErrorDisplayProps {
  error: Error;
  component: string;
  filePath: string;
}

/**
 * Component that displays error information when rendering fails
 */
const PreviewErrorDisplay: React.FC<PreviewErrorDisplayProps> = ({ 
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

export default PreviewErrorDisplay;
