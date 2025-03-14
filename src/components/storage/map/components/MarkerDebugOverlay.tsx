
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createMarkerDebugger, testMarkersVisibility, MarkerVisibilityTestResult } from '@/utils/markers';

/**
 * A component that provides debugging tools for marker visibility issues
 */
const MarkerDebugOverlay: React.FC = () => {
  const [testResults, setTestResults] = useState<MarkerVisibilityTestResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Run visibility test when component mounts
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Run the test and set the results directly
      const results = testMarkersVisibility(false);
      setTestResults(results);
    }
  }, []);
  
  // Toggle visibility of the debug panel
  const toggleOpen = () => setIsOpen(!isOpen);
  
  // Run another test and force visibility
  const runTest = () => {
    // Run the test and set the results directly
    const results = testMarkersVisibility(true);
    setTestResults(results);
  };
  
  // Show full debugger
  const showDebugger = () => {
    const debugElement = createMarkerDebugger();
    document.body.appendChild(debugElement);
  };
  
  // Do not render in production
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {!isOpen ? (
        <Button onClick={toggleOpen} size="sm" variant="outline" className="bg-black text-white">
          Debug Markers
        </Button>
      ) : (
        <div className="bg-black/80 text-white p-4 rounded-lg shadow-lg w-80">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold">Marker Debug</h3>
            <Button variant="ghost" size="sm" onClick={toggleOpen} className="h-6 w-6 p-0">✕</Button>
          </div>
          
          {testResults && (
            <div className="text-xs space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <div>Total Markers:</div>
                <div className="font-mono">{testResults.totalMarkers}</div>
                <div>Visible:</div>
                <div className="font-mono">{testResults.visibleMarkers}</div>
                <div>Hidden:</div>
                <div className="font-mono">{testResults.hiddenMarkers}</div>
              </div>
              
              {testResults.issues.length > 0 && (
                <div className="mt-2">
                  <div className="font-semibold text-orange-400">{testResults.issues.length} Issues Found</div>
                  <ul className="mt-1 space-y-1 max-h-32 overflow-y-auto">
                    {testResults.issues.slice(0, 5).map((issue, i) => (
                      <li key={i} className="text-[10px] border-l-2 border-orange-400 pl-2">
                        {issue.description}
                      </li>
                    ))}
                    {testResults.issues.length > 5 && (
                      <li className="text-[10px] italic">...and {testResults.issues.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="destructive" onClick={runTest} className="text-xs px-2 py-1 h-auto">
                  Fix Issues
                </Button>
                <Button size="sm" variant="outline" onClick={showDebugger} className="text-xs px-2 py-1 h-auto">
                  Full Debug
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkerDebugOverlay;
