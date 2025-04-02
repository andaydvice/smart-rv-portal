
import React, { createContext, useContext, useState, useCallback } from 'react';
import { runPreviewDiagnostics, logPreviewError } from '@/utils/debugging/previewDebugger';

interface PreviewDebugContextType {
  isDebugEnabled: boolean;
  enableDebug: () => void;
  disableDebug: () => void;
  logError: (component: string, filePath: string, error: Error) => void;
  runDiagnostics: () => void;
  clearErrorHistory: () => void;
}

const PreviewDebugContext = createContext<PreviewDebugContextType>({
  isDebugEnabled: false,
  enableDebug: () => {},
  disableDebug: () => {},
  logError: () => {},
  runDiagnostics: () => {},
  clearErrorHistory: () => {},
});

export const usePreviewDebug = () => useContext(PreviewDebugContext);

export const PreviewDebugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDebugEnabled, setIsDebugEnabled] = useState(
    typeof localStorage !== 'undefined' && localStorage.getItem('previewDebugEnabled') === 'true'
  );
  
  const enableDebug = useCallback(() => {
    setIsDebugEnabled(true);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('previewDebugEnabled', 'true');
    }
    console.info('Preview debugger enabled');
  }, []);
  
  const disableDebug = useCallback(() => {
    setIsDebugEnabled(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('previewDebugEnabled', 'false');
    }
    console.info('Preview debugger disabled');
  }, []);
  
  const logError = useCallback((component: string, filePath: string, error: Error) => {
    logPreviewError(component, filePath, error);
  }, []);
  
  const runDiagnostics = useCallback(() => {
    runPreviewDiagnostics();
  }, []);
  
  const clearErrorHistory = useCallback(() => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('previewErrors');
      console.info('Preview error history cleared');
    }
  }, []);
  
  return (
    <PreviewDebugContext.Provider 
      value={{ 
        isDebugEnabled, 
        enableDebug, 
        disableDebug, 
        logError, 
        runDiagnostics, 
        clearErrorHistory 
      }}
    >
      {children}
    </PreviewDebugContext.Provider>
  );
};

export default PreviewDebugProvider;
