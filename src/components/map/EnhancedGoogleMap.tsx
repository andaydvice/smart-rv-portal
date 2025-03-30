
import React, { useState, useEffect, useRef } from 'react';
import { useGoogleMaps } from './hooks/useGoogleMaps';
import LoadingState from './components/LoadingState';
import MapErrorAlert from './components/MapErrorAlert';
import GoogleMapContainer from './components/GoogleMapContainer';
import FacilityMarker from './components/FacilityMarker';
import FacilityInfoWindow from './components/FacilityInfoWindow';
import { Facility } from './types';
import { forceMarkersVisible } from './utils/markerUtils';
import { ensureMarkersVisible, removeUnwantedMapElements } from '../storage/map/services/markerVisibilityService';

interface EnhancedGoogleMapProps {
  apiKey: string;
  location: { lat: number; lng: number };
  zoom?: number;
  facilities?: Facility[];
  onMapLoad?: () => void;
}

const EnhancedGoogleMap: React.FC<EnhancedGoogleMapProps> = ({
  apiKey,
  location,
  zoom = 14,
  facilities = [],
  onMapLoad
}) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const cleanupRef = useRef<number | null>(null);
  
  // Use our custom hook to load Google Maps
  const { isLoaded, error } = useGoogleMaps({ apiKey });

  // Handle map load
  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    ensureMarkersVisible(map);
    
    // Add cleanup interval
    cleanupRef.current = removeUnwantedMapElements() as unknown as number;
    
    if (onMapLoad) onMapLoad();
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current !== null) {
        clearInterval(cleanupRef.current);
      }
    };
  }, []);
  
  // Ensure markers remain visible even when info window is open
  useEffect(() => {
    if (selectedFacility) {
      // Force markers to remain visible when a popup is open
      const runForceVisible = () => {
        forceMarkersVisible(markersRef);
        ensureMarkersVisible(mapRef.current);
      };
      
      // Run immediately and set up recurring check
      runForceVisible();
      const intervalId = setInterval(runForceVisible, 300);
      
      return () => clearInterval(intervalId);
    }
  }, [selectedFacility]);

  // If no facilities are provided, create a default one at the location
  const displayFacilities = facilities.length > 0 ? facilities : [
    { 
      name: "Location", 
      address: "Pin location",
      description: "View details for this location"
    }
  ];

  // Render loading state
  if (!isLoaded) {
    return <LoadingState />;
  }

  // Render map with error handling
  return (
    <div className="bg-[#091020] rounded-lg p-4 border border-[#1a202c] w-full">
      {error && <MapErrorAlert error={error} />}
      
      <div className="w-full overflow-hidden rounded-lg relative">
        <GoogleMapContainer
          center={location}
          zoom={zoom}
          onLoad={handleMapLoad}
        >
          {/* Markers for each facility */}
          {displayFacilities.map((facility, index) => (
            <FacilityMarker
              key={`marker-${index}`}
              position={location}
              title={facility.name}
              onClick={() => setSelectedFacility(facility)}
              onLoad={(marker) => {
                // Store reference to marker for visibility management
                markersRef.current.push(marker);
              }}
            />
          ))}

          {/* Enhanced Info Window for selected facility */}
          {selectedFacility && (
            <FacilityInfoWindow
              facility={selectedFacility}
              position={location}
              onCloseClick={() => setSelectedFacility(null)}
            />
          )}
        </GoogleMapContainer>
      </div>
    </div>
  );
};

export default EnhancedGoogleMap;
