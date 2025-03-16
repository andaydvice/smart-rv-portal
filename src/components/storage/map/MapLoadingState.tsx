
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import MapLoadingProgress from './MapLoadingProgress';

interface MapLoadingStateProps {
  isInitializing: boolean;
  mapError: string | null;
  mapLoaded: boolean;
  facilitiesCount?: number;
}

const MapLoadingState: React.FC<MapLoadingStateProps> = ({
  isInitializing,
  mapError,
  mapLoaded,
  facilitiesCount
}) => {
  const [percentLoaded, setPercentLoaded] = useState(0);
  
  // Animate loading progress
  useEffect(() => {
    if (!isInitializing || mapLoaded) return;
    
    let progressInterval: NodeJS.Timeout;
    
    // Simulate loading progress
    progressInterval = setInterval(() => {
      setPercentLoaded(prev => {
        // Start slow, accelerate in the middle, and slow down at the end
        const increment = prev < 30 ? 1 : prev < 70 ? 2 : 0.5;
        const newValue = prev + increment;
        
        // Cap at 90% until fully loaded
        return newValue > 90 && !mapLoaded ? 90 : newValue;
      });
    }, 100);
    
    return () => {
      clearInterval(progressInterval);
    };
  }, [isInitializing, mapLoaded]);
  
  // Complete progress when map is loaded
  useEffect(() => {
    if (mapLoaded && percentLoaded < 100) {
      setPercentLoaded(100);
    }
  }, [mapLoaded, percentLoaded]);

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
      
      {/* Use our new progress component */}
      <MapLoadingProgress 
        percentLoaded={percentLoaded} 
        showProgress={isInitializing && !mapLoaded} 
      />
    </>
  );
};

export default MapLoadingState;
