
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
    // Initial check
    checkForBlankScreen();
    
    // Periodic checks
    const intervalId = setInterval(checkForBlankScreen, 2000);
    
    // Force a recovery attempt after 5 seconds regardless
    const forceRecoveryTimeout = setTimeout(() => {
      attemptRecovery(true);
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(forceRecoveryTimeout);
    };
  }, []);

  // Check if the screen appears to be blank
  const checkForBlankScreen = () => {
    if (document.body.children.length === 0) {
      console.error("BLANK SCREEN: No children in body");
      setHasDetectedBlankScreen(true);
      attemptRecovery();
      return;
    }
    
    const rootElement = document.getElementById('root');
    if (!rootElement || rootElement.children.length === 0) {
      console.error("BLANK SCREEN: Empty root element");
      setHasDetectedBlankScreen(true);
      attemptRecovery();
      return;
    }
    
    // Check if main content containers exist but are empty or hidden
    const contentContainers = document.querySelectorAll('main, [role="main"], .content, #content, .container');
    let allEmpty = true;
    let allHidden = true;
    
    contentContainers.forEach((container) => {
      if (container.children.length > 0) {
        allEmpty = false;
      }
      
      const style = window.getComputedStyle(container);
      if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
        allHidden = false;
      }
    });
    
    if ((contentContainers.length > 0 && allEmpty) || allHidden) {
      console.error("BLANK SCREEN: Content containers empty or hidden");
      setHasDetectedBlankScreen(true);
      attemptRecovery();
    }
  };

  // Attempt to recover from blank screen
  const attemptRecovery = (force = false) => {
    if (recoveryAttempted && !force) return;
    
    console.log("RECOVERY: Attempting to recover from blank screen");
    setRecoveryAttempted(true);
    
    // Force root element and body to be visible
    document.body.style.backgroundColor = '#080F1F';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    document.body.style.opacity = '1';
    
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = '#080F1F';
      rootElement.style.visibility = 'visible';
      rootElement.style.display = 'block';
      rootElement.style.opacity = '1';
      rootElement.style.minHeight = '100vh';
    }
    
    // Force all content elements to be visible
    document.querySelectorAll('main, .container, .content, [role="main"], #content').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'visible';
        el.style.display = 'block';
        el.style.opacity = '1';
        el.style.backgroundColor = '#080F1F';
      }
    });
    
    // Force render React components by triggering a window resize event
    try {
      window.dispatchEvent(new Event('resize'));
    } catch (e) {
      console.error("RECOVERY: Error dispatching resize event", e);
    }
    
    // Try reloading the route without refreshing the page
    try {
      const event = new CustomEvent('lovable-navigation', {
        detail: { path: window.location.pathname }
      });
      document.dispatchEvent(event);
    } catch (e) {
      console.error("RECOVERY: Error dispatching navigation event", e);
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
      
      {/* Recovery UI that appears when blank screen is detected */}
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
