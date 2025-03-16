
import React from 'react';
import { useMapContext } from '../MapContext';
import MapControls from '../MapControls';
import MapDebugOverlay from './MapDebugOverlay';
import FailedAttemptsCounter from './FailedAttemptsCounter';

interface MapControlsLayerProps {
  showDebugOverlay?: boolean;
  enableControls?: boolean;
  onFilterClick?: () => void;
}

/**
 * Component to handle map controls and overlays
 */
const MapControlsLayer: React.FC<MapControlsLayerProps> = ({
  showDebugOverlay = false,
  enableControls = true,
  onFilterClick
}) => {
  const { mapRef, markersRef, markerErrorHandling } = useMapContext();
  
  // Get total failed attempts if available
  const failedAttempts = markerErrorHandling?.getTotalFailedAttempts() || 0;
  const maxAttempts = markerErrorHandling?.MAX_RETRY_ATTEMPTS || 10;

  return (
    <>
      {enableControls && (
        <MapControls onFilterClick={onFilterClick} />
      )}
      
      {showDebugOverlay && mapRef.current && (
        <MapDebugOverlay 
          map={mapRef.current} 
          markers={markersRef.current || {}} 
        />
      )}
      
      {/* Display failed attempts counter */}
      <FailedAttemptsCounter 
        failedAttempts={failedAttempts}
        maxAttempts={maxAttempts}
      />
    </>
  );
};

export default MapControlsLayer;
