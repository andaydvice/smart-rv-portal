
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface EmergencyContentRecoveryProps {
  children: React.ReactNode;
}

/**
 * Emergency recovery component that detects blank screens and
 * attempts to recover by forcing content visibility
 */
const EmergencyContentRecovery: React.FC<EmergencyContentRecoveryProps> = ({ children }) => {
  const [hasDetectedBlankScreen, setHasDetectedBlankScreen] = useState(false);
  const [recoveryAttempted, setRecoveryAttempted] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Check for blank screen on mount and periodically
  useEffect(() => {
    // Delay initial check to give the app time to render
    const initialCheckTimeout = setTimeout(() => {
      checkForBlankScreen();
    }, 2500);
    
    // Less frequent periodic checks to reduce interference
    const intervalId = setInterval(checkForBlankScreen, 5000);
    
    // Don't force recovery automatically as it may interfere with normal loading
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(initialCheckTimeout);
    };
  }, []);

  // Check if the screen appears to be blank
  const checkForBlankScreen = () => {
    // Only check if we haven't already detected a blank screen
    if (recoveryAttempted) return;
    
    // Check if we have any content in the main areas
    const rootElement = document.getElementById('root');
    const mainContent = document.querySelector('main, .min-h-screen, .layout-container');
    
    if (!rootElement || rootElement.children.length === 0) {
      console.error("BLANK SCREEN: Empty root element");
      setHasDetectedBlankScreen(true);
      attemptRecovery();
      return;
    }
    
    // If no main content and loader has been showing for too long
    if (!mainContent && document.querySelector('.animate-spin')) {
      const loaderElements = document.querySelectorAll('.animate-spin');
      if (loaderElements.length > 0) {
        console.log("Loader detected, waiting for content to appear");
        // Only attempt recovery if the loader has been visible for too long
        if (!recoveryAttempted) {
          setTimeout(() => {
            const stillHasLoader = document.querySelector('.animate-spin');
            const hasContent = document.querySelector('main, .min-h-screen, .layout-container');
            if (stillHasLoader && !hasContent) {
              console.error("LOADER STUCK: Loader has been visible for too long");
              setHasDetectedBlankScreen(true);
              attemptRecovery();
            }
          }, 5000);
        }
      }
    }
  };

  // Attempt to recover from blank screen
  const attemptRecovery = (force = false) => {
    if (recoveryAttempted && !force) return;
    
    console.log("RECOVERY: Attempting to recover from blank screen");
    setRecoveryAttempted(true);
    
    try {
      // Force background color
      document.body.style.backgroundColor = '#080F1F';
      document.documentElement.style.backgroundColor = '#080F1F';
      
      // Check if any React content has loaded
      const app = document.querySelector('#root > div');
      
      if (!app || app.children.length === 0) {
        // Force reload as a last resort
        console.error("CRITICAL: No React app detected, forcing reload");
        window.location.reload();
        return;
      }
      
      // Try to force show any hidden content
      document.querySelectorAll('main, .container, .content, [role="main"], #content').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.display = 'block';
          el.style.opacity = '1';
        }
      });
      
      // Trigger a resize event to potentially force React to update
      window.dispatchEvent(new Event('resize'));
      
      // Dispatch a custom event to notify other components
      document.dispatchEvent(new CustomEvent('recovery-attempted'));
    } catch (e) {
      console.error("Recovery attempt failed:", e);
    }
  };

  // Toggle debug information
  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  return (
    <div className="recovery-wrapper" style={{ minHeight: '100vh', backgroundColor: '#080F1F' }}>
      {/* Original content */}
      {children}
      
      {/* Recovery UI that appears only when blank screen is detected and confirmed */}
      {hasDetectedBlankScreen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-[#080F1F] bg-opacity-90">
          <div className="max-w-md w-full p-4">
            <Alert className="bg-[#151A22] border-[#5B9BD5] mb-4">
              <AlertTitle className="text-white">Recovering from blank screen</AlertTitle>
              <AlertDescription className="text-gray-300">
                We detected a blank screen issue and are attempting to recover your view.
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => window.location.reload()} 
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2 rounded"
              >
                Reload Page
              </button>
              
              <button 
                onClick={() => attemptRecovery(true)} 
                className="bg-[#151A22] hover:bg-[#1E2A3E] border border-[#5B9BD5] text-white px-4 py-2 rounded"
              >
                Try Again
              </button>
              
              <button 
                onClick={toggleDebugInfo} 
                className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 rounded"
              >
                {showDebugInfo ? "Hide Debug" : "Debug Info"}
              </button>
            </div>
            
            {showDebugInfo && (
              <div className="mt-4 p-3 bg-[#0D1423] border border-gray-800 rounded text-xs text-gray-400 font-mono overflow-auto max-h-40">
                <p>URL: {window.location.href}</p>
                <p>Path: {window.location.pathname}</p>
                <p>Root children: {document.getElementById('root')?.children.length || 0}</p>
                <p>Body children: {document.body.children.length}</p>
                <p>Screen size: {window.innerWidth}×{window.innerHeight}</p>
                <p>User Agent: {navigator.userAgent.substring(0, 50)}...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContentRecovery;
