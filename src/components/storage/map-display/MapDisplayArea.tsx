
import React from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import MapLoadingState from '../map/MapLoadingState';
import GoogleMapView from '../map/GoogleMapView';
import MapboxMapView from '../map-view/MapboxMapView';
import mapboxgl from 'mapbox-gl';
import { FilterState } from '../types';

interface MapDisplayAreaProps {
  facilities: StorageFacility[];
  isLoading?: boolean;
  recentlyViewedFacilityIds: string[];
  onMarkerClick: (facilityId: string) => void;
  useMapbox?: boolean;
  googleMapsApiKey?: string;
  mapboxApiKey?: string;
  showFilteredLocations?: boolean;
  useGoogleMaps?: boolean;
  allFacilities?: StorageFacility[];
  mapToken?: string;
  mapTokenError?: string | null;
  highlightedFacility?: string | null;
  filters?: FilterState;
}

const MapDisplayArea: React.FC<MapDisplayAreaProps> = ({
  facilities,
  isLoading = false,
  recentlyViewedFacilityIds,
  onMarkerClick,
  useMapbox = false,
  googleMapsApiKey,
  mapboxApiKey,
  showFilteredLocations = false,
  useGoogleMaps = false,
  allFacilities = [],
  mapToken,
  mapTokenError,
  highlightedFacility,
  filters
}) => {
  const handleMapLoad = (map: google.maps.Map | mapboxgl.Map) => {
    console.log('Map loaded successfully');
    // Any common map initialization logic can go here
    
    // Force visibility of markers after a brief delay
    setTimeout(() => {
      const markers = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title], .mapbox-marker');
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
        }
      });
    }, 500);
  };

  // If we have specialized filtering logic or views based on showFilteredLocations prop
  if (showFilteredLocations) {
    // For now, just show a message - in the future this could render a different map component
    return (
      <Card className="h-[650px] bg-connectivity-darkBg relative border-gray-700 overflow-hidden">
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Filtered Locations Demo View</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[650px] bg-connectivity-darkBg relative border-gray-700 overflow-hidden">
      {isLoading ? (
        <MapLoadingState 
          isInitializing={true} 
          mapError={null} 
          mapLoaded={false}
          facilitiesCount={facilities?.length}
        />
      ) : facilities.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No storage facilities found. Try adjusting your filters.</p>
        </div>
      ) : useMapbox ? (
        <MapboxMapView
          facilities={facilities}
          recentlyViewedFacilityIds={recentlyViewedFacilityIds}
          onMarkerClick={onMarkerClick}
          apiKey={mapboxApiKey || ''}
          onMapLoad={(map) => handleMapLoad(map)}
        />
      ) : (
        <GoogleMapView
          facilities={facilities}
          recentlyViewedFacilityIds={recentlyViewedFacilityIds}
          onMarkerClick={onMarkerClick}
          apiKey={googleMapsApiKey || ''}
          onMapLoad={(map) => handleMapLoad(map)}
        />
      )}
    </Card>
  );
};

export default MapDisplayArea;
