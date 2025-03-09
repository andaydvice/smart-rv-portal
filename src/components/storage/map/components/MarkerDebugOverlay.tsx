
import React, { useEffect, useState } from 'react';
import { createMarkerDebugger, testMarkersVisibility, MarkerVisibilityTestResult } from '@/utils/markers/testing';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bug, CheckCircle2, AlertTriangle } from 'lucide-react';

const MarkerDebugOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerStats, setMarkerStats] = useState<{
    total: number;
    visible: number;
    hidden: number;
  }>({
    total: 0,
    visible: 0,
    hidden: 0
  });
  
  // Run visibility test to get initial stats
  useEffect(() => {
    const result = testMarkersVisibility(false);
    setMarkerStats({
      total: result.totalMarkers,
      visible: result.visibleMarkers,
      hidden: result.hiddenMarkers
    });
    
    // Periodically update stats
    const interval = setInterval(() => {
      const updatedResult = testMarkersVisibility(false);
      setMarkerStats({
        total: updatedResult.totalMarkers,
        visible: updatedResult.visibleMarkers,
        hidden: updatedResult.hiddenMarkers
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleShowDebugger = () => {
    createMarkerDebugger();
    setIsOpen(false);
  };
  
  const handleFixIssues = () => {
    testMarkersVisibility(true);
    const result = testMarkersVisibility(false);
    setMarkerStats({
      total: result.totalMarkers,
      visible: result.visibleMarkers,
      hidden: result.hiddenMarkers
    });
  };

  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Status icon based on marker visibility
  const StatusIcon = markerStats.hidden === 0 
    ? CheckCircle2 
    : (markerStats.hidden < markerStats.total / 2 ? AlertTriangle : Bug);
  
  const statusColor = markerStats.hidden === 0 
    ? 'text-green-500' 
    : (markerStats.hidden < markerStats.total / 2 ? 'text-amber-500' : 'text-red-500');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="fixed bottom-4 right-4 z-[1000] bg-black/60 hover:bg-black/80"
        >
          <StatusIcon className={`w-5 h-5 mr-2 ${statusColor}`} />
          <span className="text-xs">
            Markers: {markerStats.visible}/{markerStats.total}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Map Marker Debug Tools</DialogTitle>
          <DialogDescription>
            Tools for diagnosing and fixing marker visibility issues.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{markerStats.total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{markerStats.visible}</div>
              <div className="text-xs text-gray-500">Visible</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{markerStats.hidden}</div>
              <div className="text-xs text-gray-500">Hidden</div>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {markerStats.hidden === 0 
                ? "All markers are visible! 🎉" 
                : `Found ${markerStats.hidden} marker${markerStats.hidden !== 1 ? 's' : ''} with visibility issues.`}
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
          <Button 
            variant="secondary"
            onClick={handleShowDebugger}
          >
            Open Debugger
          </Button>
          <Button 
            variant={markerStats.hidden > 0 ? "default" : "outline"}
            disabled={markerStats.hidden === 0}
            onClick={handleFixIssues}
          >
            Fix Issues
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkerDebugOverlay;
