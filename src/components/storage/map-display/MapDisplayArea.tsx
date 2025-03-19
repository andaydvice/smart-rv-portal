import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import { FilterState } from '../types';
import { forceMarkersRefresh } from '../map/utils/markerUtils';
import GoogleMapFacilitiesView from '../GoogleMapFacilitiesView';
import GoogleMapView from '../map/GoogleMapView';
import GoogleMapWithFilteredLocations from '../map/components/GoogleMapWithFilteredLocations';
import MapboxMapView from '../map-view/MapboxMapView';
import MapErrorState from '../map/components/MapErrorState';

interface MapDisplayAreaProps {
  showFilteredLocations: boolean;
  useGoogleMaps: boolean;
  allFacilities: StorageFacility[] | null;
  recentlyViewedIds: string[];
  onMarkerClick: (facilityId: string) => void;
  googleMapsKey?: string;
  mapToken?: string;
  mapTokenError?: string | null;
  highlightedFacility: string | null;
  filters: FilterState;
}

const MapDisplayArea: React.FC<MapDisplayAreaProps> = ({
  showFilteredLocations,
  useGoogleMaps,
  allFacilities,
  recentlyViewedIds,
  onMarkerClick,
  googleMapsKey,
  mapToken,
  mapTokenError,
  highlightedFacility,
  filters
}) => {
  // Track last filter state to detect changes
  const [lastFilterState, setLastFilterState] = React.useState<string>('');
  
  // Reference to the Google Map instance
  const [googleMapRef, setGoogleMapRef] = React.useState<google.maps.Map | null>(null);
  
  // Track filter changes to force marker refresh
  useEffect(() => {
    const currentFilterState = JSON.stringify(filters);
    
    // Only force refresh if filters have changed
    if (lastFilterState && lastFilterState !== currentFilterState && googleMapRef && useGoogleMaps) {
      console.log('Filter changed, forcing marker refresh');
      
      // Wait a moment for the facilities to update
      setTimeout(() => {
        forceMarkersRefresh(googleMapRef, allFacilities || []);
      }, 300);
    }
    
    // Update the stored filter state
    setLastFilterState(currentFilterState);
  }, [filters, lastFilterState, googleMapRef, useGoogleMaps, allFacilities]);
  
  // Function to capture map reference from GoogleMapView
  const captureGoogleMapRef = (map: google.maps.Map) => {
    if (!googleMapRef) {
      console.log('Captured Google Maps reference for visibility management');
      setGoogleMapRef(map);
    }
  };
  
  if (!allFacilities) {
    return (
      <Card className="h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700">
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>Loading facilities...</p>
        </div>
      </Card>
    );
  }
  
  // Handle the filtered locations demo view
  if (showFilteredLocations) {
    // Mock data for the filtered locations demo
    const filteredLocations = allFacilities.slice(0, 10).map((facility, index) => ({
      id: Number(facility.id),
      name: facility.name,
      latitude: Number(facility.latitude),
      longitude: Number(facility.longitude),
      icon: {
        url: index % 2 === 0 ? 'orange-pin.png' : 'blue-pin.png'
      }
    }));
    
    return (
      <GoogleMapWithFilteredLocations
        locations={filteredLocations}
        apiKey={googleMapsKey}
        className="h-[650px]"
      />
    );
  }
  
  // Use Google Maps view
  if (useGoogleMaps) {
    // Filter out facilities without valid coordinates
    const validFacilities = allFacilities.filter(
      facility => facility.latitude && facility.longitude
    );
    
    return (
      <GoogleMapView
        facilities={validFacilities}
        recentlyViewedFacilityIds={recentlyViewedIds}
        onMarkerClick={onMarkerClick}
        apiKey={googleMapsKey}
        onMapLoad={captureGoogleMapRef}
      />
    );
  }
  
  // Otherwise, use Mapbox view
  return (
    <GoogleMapFacilitiesView
      facilities={allFacilities}
      recentlyViewedFacilityIds={recentlyViewedIds}
      onMarkerClick={onMarkerClick}
      apiKey={mapToken}
    />
  );
};

export default MapDisplayArea;
