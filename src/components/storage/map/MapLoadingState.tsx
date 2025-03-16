
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import MapLoadingProgress from './MapLoadingProgress';

interface MapLoadingStateProps {
  isInitializing: boolean;
  mapError: string | null;
  mapLoaded: boolean;
  facilitiesCount?: number;
  infiniteLoading?: boolean;
}

const MapLoadingState: React.FC<MapLoadingStateProps> = ({
  isInitializing,
  mapError,
  mapLoaded,
  facilitiesCount,
  infiniteLoading = false
}) => {
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  
  // Animate loading progress
  useEffect(() => {
    if (!isInitializing) return;
    
    let progressInterval: NodeJS.Timeout;
    
    // For infinite loading mode, we'll let the MapLoadingProgress component handle the animation
    if (!infiniteLoading) {
      // Simulate loading progress for normal mode
      progressInterval = setInterval(() => {
        setPercentLoaded(prev => {
          // Start slow, accelerate in the middle, and slow down at the end
          const increment = prev < 30 ? 1 : prev < 70 ? 2 : 0.5;
          const newValue = prev + increment;
          
          // Cap at 90% until fully loaded
          return newValue > 90 && !mapLoaded ? 90 : newValue;
        });
      }, 100);
    } else {
      // For infinite loading, we just need to signal completion when map loads
      setPercentLoaded(1); // Start with a minimal value
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isInitializing, mapLoaded, infiniteLoading]);
  
  // Complete progress when map is loaded
  useEffect(() => {
    if (mapLoaded) {
      // Set to 100% when map is loaded
      setPercentLoaded(100);
      
      // Hide loader after a short delay to show 100%
      const hideTimer = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      
      return () => clearTimeout(hideTimer);
    }
  }, [mapLoaded]);

  return (
    <>
      {mapError && (
        <Alert variant="destructive" className="absolute top-4 left-4 right-4 z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{mapError}</AlertDescription>
        </Alert>
      )}
      
      {/* Show the facilities count in a small overlay (in dev mode only) */}
      {process.env.NODE_ENV === 'development' && facilitiesCount !== undefined && (
        <div className="absolute top-2 right-2 z-50 bg-gray-800 text-white px-2 py-1 rounded text-xs">
          Facilities: {facilitiesCount}
        </div>
      )}
      
      {/* Use our progress component with infinite loading option */}
      <MapLoadingProgress 
        percentLoaded={percentLoaded} 
        showProgress={isInitializing && !mapLoaded && showLoader} 
        infiniteLoading={infiniteLoading}
      />
    </>
  );
};

export default MapLoadingState;
