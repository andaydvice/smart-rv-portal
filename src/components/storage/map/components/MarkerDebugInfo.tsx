
import React from 'react';
import MarkerStats from './MarkerStats';
import MarkerErrorDisplay from './MarkerErrorDisplay';
import MarkerDebugOverlay from './MarkerDebugOverlay';

interface MarkerDebugInfoProps {
  facilities: any[];
  stats: {
    markersCreated: number;
    skippedFacilities: number;
    processedNYFacilities?: number;
    totalNYFacilities?: number;
  };
  errors: Array<{
    facilityId: string;
    error?: Error;
    type: string;
    timestamp: number;
  }> | null;
  markErrorAsRecovered: (facilityId: string) => void;
}

const MarkerDebugInfo: React.FC<MarkerDebugInfoProps> = ({
  facilities,
  stats,
  errors,
  markErrorAsRecovered
}) => {
  // Create a proper stats object for the MarkerStats component
  const displayStats = {
    total: stats.markersCreated + stats.skippedFacilities || 0,
    created: stats.markersCreated || 0,
    visible: stats.markersCreated - (stats.skippedFacilities || 0),
    hidden: stats.skippedFacilities || 0,
    failed: stats.skippedFacilities || 0,
    processedNYFacilities: stats.processedNYFacilities || 0,
    totalNYFacilities: stats.totalNYFacilities || 0
  };

  // Convert errors to the format expected by MarkerErrorDisplay
  const displayErrors = errors ? errors.map(err => ({
    id: `${err.facilityId}-${err.timestamp}`,
    facilityId: err.facilityId,
    errorMessage: err.error?.message || 'Unknown error',
    errorCode: err.type || 'ERR',
    timestamp: err.timestamp
  })) : [];

  return (
    <>
      {/* Debug marker count */}
      <div className="absolute top-2 left-2 z-50 bg-black/70 text-white p-2 rounded text-xs pointer-events-none">
        {facilities.length} facilities | 
        {document.querySelectorAll('.mapboxgl-marker, .custom-marker').length} markers
      </div>
      
      {/* Only show stats in development mode */}
      {process.env.NODE_ENV === 'development' && <MarkerStats stats={displayStats} />}
      
      {/* Marker debugger component (dev only) */}
      {process.env.NODE_ENV === 'development' && <MarkerDebugOverlay />}
      
      {/* Show errors only in dev mode or if there are critical errors */}
      {(process.env.NODE_ENV === 'development' || (displayErrors && displayErrors.length > 5)) && (
        <div className="absolute top-20 right-4 z-50 w-80">
          <MarkerErrorDisplay 
            errors={displayErrors} 
            onDismiss={(errorId) => {
              const parts = errorId.split('-');
              if (parts.length > 0) {
                markErrorAsRecovered(parts[0]);
              }
            }}
            className="max-h-48 overflow-y-auto"
          />
        </div>
      )}
    </>
  );
};

export default MarkerDebugInfo;
