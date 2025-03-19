
import React from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import { MapLoadingState } from '../map/MapLoadingState';
import GoogleMapView from '../map/GoogleMapView';
import MapboxMapView from '../map-view/MapboxMapView';
import mapboxgl from 'mapbox-gl';

interface MapDisplayAreaProps {
  facilities: StorageFacility[];
  isLoading: boolean;
  recentlyViewedFacilityIds: string[];
  onMarkerClick: (facilityId: string) => void;
  useMapbox?: boolean;
  googleMapsApiKey?: string;
  mapboxApiKey?: string;
}

const MapDisplayArea: React.FC<MapDisplayAreaProps> = ({
  facilities,
  isLoading,
  recentlyViewedFacilityIds,
  onMarkerClick,
  useMapbox = false,
  googleMapsApiKey,
  mapboxApiKey
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

  return (
    <Card className="h-[650px] bg-connectivity-darkBg relative border-gray-700 overflow-hidden">
      {isLoading ? (
        <MapLoadingState />
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
