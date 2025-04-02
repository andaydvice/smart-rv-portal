
import React, { useState, useEffect } from 'react';
import { usePreviewDebugger } from '@/utils/debugging/previewDebugHooks';
import { Button } from '@/components/ui/button';

const HookDebugExample: React.FC = () => {
  const { logError } = usePreviewDebugger('HookDebugExample', 'src/components/debug/HookDebugExample.tsx');
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

export default HookDebugExample;
