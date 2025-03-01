
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

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
      
      {isInitializing && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]/80">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MapLoadingState;
