
import React, { useState, useEffect } from 'react';
import { Monitor, RefreshCw } from 'lucide-react';

// Extend the Performance interface to include the memory property
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

interface DebugInfo {
  lastUpdate: string;
  route: string;
  screenSize: string;
  performance: {
    fps: number;
    memory: number;
  };
}

const DebugOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    lastUpdate: new Date().toISOString(),
    route: window.location.pathname,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    performance: {
      fps: 0,
      memory: 0
    }
  });

  useEffect(() => {
    if (!isVisible) return;

    const updateInterval = setInterval(() => {
      // Cast performance to ExtendedPerformance to access memory property
      const extendedPerformance = performance as ExtendedPerformance;
      
      setDebugInfo(prev => ({
        ...prev,
        lastUpdate: new Date().toISOString(),
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        performance: {
          fps: Math.round(performance.now() / 1000),
          memory: Math.round(extendedPerformance.memory?.usedJSHeapSize / 1048576 || 0)
        }
      }));
    }, 1000);

    const handleResize = () => {
      setDebugInfo(prev => ({
        ...prev,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-2 bg-[#080F1F]/80 border border-[#1a202c] rounded-full hover:bg-[#080F1F] transition-colors"
        title="Show Debug Info"
      >
        <Monitor className="h-5 w-5 text-ocean-blue" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-[#080F1F]/95 border border-[#1a202c] rounded-lg backdrop-blur-sm w-80 text-left">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-ocean-blue font-semibold flex items-center gap-2">
          <Monitor className="h-4 w-4" />
          Debug Info
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-light-blue hover:text-ocean-blue transition-colors"
          title="Hide Debug Info"
        >
          <RefreshCw className="h-4 w-4 animate-spin" />
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-light-blue">
          <span>Route:</span>
          <span>{debugInfo.route}</span>
        </div>
        <div className="flex justify-between text-light-blue">
          <span>Screen:</span>
          <span>{debugInfo.screenSize}</span>
        </div>
        <div className="flex justify-between text-light-blue">
          <span>FPS:</span>
          <span>{debugInfo.performance.fps}</span>
        </div>
        <div className="flex justify-between text-light-blue">
          <span>Memory:</span>
          <span>{debugInfo.performance.memory}MB</span>
        </div>
        <div className="flex justify-between text-light-blue">
          <span>Last Update:</span>
          <span>{new Date(debugInfo.lastUpdate).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DebugOverlay;
