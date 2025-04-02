
import React, { useState, useEffect } from 'react';
import { usePreviewDebugger } from '@/utils/debugging/previewDebugger';
import { withPreviewDebugJSX } from '@/utils/debugging/previewDebuggerWithJSX';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// Example component using the hook approach
const HookDebugExample: React.FC = () => {
  const { logError } = usePreviewDebugger('HookDebugExample', 'src/components/debug/PreviewDebugDemo.tsx');
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (hasError) {
      try {
        // This will throw an error
        throw new Error('This is a test error from useEffect');
      } catch (error) {
        logError(error as Error, { location: 'useEffect', triggered: 'manually' });
      }
    }
  }, [hasError, logError]);
  
  const triggerError = () => {
    setHasError(true);
  };
  
  return (
    <div className="mb-6 p-4 bg-[#151A22] rounded-lg">
      <h3 className="text-xl font-semibold mb-2 text-white">Hook-based Debug Example</h3>
      <p className="text-gray-300 mb-4">Click the button to trigger and log an error using the hook approach</p>
      <Button onClick={triggerError} variant="destructive">
        Trigger Error
      </Button>
    </div>
  );
};

// Example component that will throw an error when the flag is true
const ErrorProne: React.FC<{ shouldError?: boolean }> = ({ shouldError = false }) => {
  if (shouldError) {
    throw new Error('This is a demonstration error from the ErrorProne component');
  }
  
  return (
    <div className="p-4 bg-[#151A22] rounded-lg">
      <h3 className="text-xl font-semibold mb-2 text-white">Error Prone Component</h3>
      <p className="text-gray-300">This component will throw an error when the flag is set to true</p>
    </div>
  );
};

// Wrap the error-prone component with our debug wrapper
const DebuggableErrorProne = withPreviewDebugJSX(
  ErrorProne, 
  'ErrorProne', 
  'src/components/debug/PreviewDebugDemo.tsx'
);

// Main demo component
const PreviewDebugDemo: React.FC = () => {
  const [showError, setShowError] = useState(false);
  
  const toggleError = () => {
    setShowError(!showError);
  };
  
  const runDiagnostics = () => {
    if (typeof window !== 'undefined' && (window as any).debugPreview) {
      (window as any).debugPreview();
    }
  };
  
  const clearErrorHistory = () => {
    if (typeof window !== 'undefined' && (window as any).clearPreviewErrors) {
      (window as any).clearPreviewErrors();
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Alert className="mb-6 bg-[#091020] border-[#5B9BD5]">
        <AlertTitle className="text-white">Preview Debugger Demo</AlertTitle>
        <AlertDescription className="text-gray-300">
          This component demonstrates how to use the preview debugging utilities to diagnose blank preview issues.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-6 mb-8">
        <HookDebugExample />
        
        <div className="p-4 bg-[#151A22] rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">HOC-wrapped Component Example</h3>
          <p className="text-gray-300 mb-4">
            This example uses the withPreviewDebug HOC to catch and display errors
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={toggleError} variant="destructive">
              {showError ? 'Hide Error' : 'Show Error'}
            </Button>
          </div>
          
          <div className="mt-6">
            <DebuggableErrorProne shouldError={showError} />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={runDiagnostics} className="bg-[#5B9BD5] hover:bg-[#4B8FE3]">
          Run Preview Diagnostics
        </Button>
        <Button onClick={clearErrorHistory} variant="outline" className="border-[#1a202c]">
          Clear Error History
        </Button>
      </div>
    </div>
  );
};

export default PreviewDebugDemo;
