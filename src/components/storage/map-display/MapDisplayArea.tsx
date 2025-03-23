
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import MapLoadingState from '../map/components/MapLoadingState';
import GoogleMapView from '../map/GoogleMapView';
import MapboxMapView from '../map-view/MapboxMapView';
import mapboxgl from 'mapbox-gl';
import { FilterState } from '../types';
import { toast } from 'sonner';

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
  // Log API key state and facilities count for debugging
  useEffect(() => {
    console.log('MapDisplayArea - Google Maps API Key available:', !!googleMapsApiKey);
    console.log('MapDisplayArea - Mapbox Token available:', !!mapboxApiKey);
    console.log('MapDisplayArea - Facilities count:', facilities?.length || 0);
    
    // Check for any facilities with invalid coordinates
    if (facilities && facilities.length > 0) {
      const invalidCoords = facilities.filter(f => 
        !f.latitude || !f.longitude || 
        isNaN(Number(f.latitude)) || isNaN(Number(f.longitude))
      ).length;
      
      if (invalidCoords > 0) {
        console.warn(`${invalidCoords} facilities have invalid coordinates`);
      }
    }
  }, [googleMapsApiKey, mapboxApiKey, facilities]);

  const handleMapLoad = (map: google.maps.Map | mapboxgl.Map) => {
    console.log('Map loaded successfully');
    
    // Show loading confirmation to help user know map is working
    toast.success('Map loaded successfully');
    
    // Force visibility of markers after a brief delay
    setTimeout(() => {
      const markers = document.querySelectorAll('.gm-style [title], .gm-style-pbc [title], .mapbox-marker, .custom-marker, .mapboxgl-marker');
      console.log(`Found ${markers.length} markers to enhance visibility`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.display = 'block';
        }
      });
      
      // Dispatch event to trigger marker visibility fixes
      document.dispatchEvent(new Event('map-markers-ready'));
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
          zoom={4}
          onZoomChange={(zoom) => console.log('Zoom changed:', zoom)}
        />
      )}
      
      {/* Show map debug info */}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {facilities?.length || 0} facilities loaded | 
        Map type: {useMapbox ? 'Mapbox' : 'Google Maps'}
      </div>
    </Card>
  );
};

export default MapDisplayArea;
