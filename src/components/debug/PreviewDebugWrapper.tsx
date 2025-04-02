
import React, { useState, useEffect } from 'react';
import { runPreviewDiagnostics } from '@/utils/debugging/previewDebugger';
import { Loader2 } from 'lucide-react';

interface PreviewDebugWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that helps diagnose blank preview issues
 * by analyzing the DOM and reporting issues
 */
const PreviewDebugWrapper: React.FC<PreviewDebugWrapperProps> = ({ children }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [elementCount, setElementCount] = useState(0);
  const [visibleElementCount, setVisibleElementCount] = useState(0);
  const [hiddenElementCount, setHiddenElementCount] = useState(0);
  const [showDebugPanel, setShowDebugPanel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      analyzeDOM();
      setIsAnalyzing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const analyzeDOM = () => {
    // Count all elements
    const allElements = document.querySelectorAll('*');
    setElementCount(allElements.length);
    
    // Count visible elements
    const visible = document.querySelectorAll('*:not([style*="display: none"]):not([style*="visibility: hidden"]):not([style*="opacity: 0"])');
    setVisibleElementCount(visible.length);
    
    // Count hidden elements
    const hidden = document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"], [style*="opacity: 0"]');
    setHiddenElementCount(hidden.length);
    
    // Run full diagnostics
    runPreviewDiagnostics();
  };

  const toggleDebugPanel = () => {
    setShowDebugPanel(prev => !prev);
  };

  return (
    <div className="relative">
      {/* Debug toggle button */}
      <button 
        onClick={toggleDebugPanel}
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-2 rounded-full shadow-lg"
        title={showDebugPanel ? "Hide debug panel" : "Show debug panel"}
      >
        {showDebugPanel ? "×" : "🐞"}
      </button>
      
      {/* Debug panel */}
      {showDebugPanel && (
        <div className="fixed bottom-16 right-4 z-50 w-80 bg-gray-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg border border-red-500/30">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="mr-2">🔍</span> Preview Debugger
          </h3>
          
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Analyzing preview...</span>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span>Total elements:</span>
                  <span className="font-mono">{elementCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Visible elements:</span>
                  <span className="font-mono">{visibleElementCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hidden elements:</span>
                  <span className="font-mono text-yellow-300">{hiddenElementCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Window size:</span>
                  <span className="font-mono">{window.innerWidth}×{window.innerHeight}</span>
                </div>
              </div>
              
              <div className="text-xs p-2 bg-gray-800/80 rounded mb-3">
                {visibleElementCount < 10 ? (
                  <p className="text-red-400">WARNING: Very few visible elements detected!</p>
                ) : visibleElementCount > 0 ? (
                  <p className="text-green-400">Content appears to be rendering.</p>
                ) : (
                  <p className="text-red-400">CRITICAL: No visible elements detected!</p>
                )}
              </div>
              
              <div className="flex space-x-2 text-xs">
                <button 
                  onClick={analyzeDOM}
                  className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                >
                  Re-analyze
                </button>
                <button 
                  onClick={() => console.clear()}
                  className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  Clear console
                </button>
                <button 
                  onClick={() => (window as any).debugPreview?.()}
                  className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded"
                >
                  Full diagnostics
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Actual page content */}
      {children}
    </div>
  );
};

export default PreviewDebugWrapper;
