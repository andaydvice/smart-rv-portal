
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';
import MapView from '../MapView';
import GoogleMapFacilitiesView from '../GoogleMapFacilitiesView';
import FilteredLocationMapDemo from '../map/components/FilteredLocationMapDemo';

interface MapDisplayAreaProps {
  showFilteredLocations: boolean;
  useGoogleMaps: boolean;
  allFacilities: StorageFacility[] | null;
  recentlyViewedIds: string[];
  onMarkerClick: (facilityId: string) => void;
  googleMapsKey: string;
  mapToken: string | null;
  mapTokenError: string | null;
  highlightedFacility: string | null;
  filters: {
    selectedState: string | null;
    [key: string]: any;
  };
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
  return (
    <>
      {showFilteredLocations ? (
        <FilteredLocationMapDemo />
      ) : useGoogleMaps ? (
        <GoogleMapFacilitiesView
          facilities={allFacilities || []}
          recentlyViewedFacilityIds={recentlyViewedIds}
          onMarkerClick={onMarkerClick}
          apiKey={googleMapsKey}
        />
      ) : (
        <Card className="h-[650px] bg-[#080F1F] relative overflow-visible border-gray-700 map-container">
          {(!mapToken) ? (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {mapTokenError || 'Map configuration not loaded'}
              </AlertDescription>
            </Alert>
          ) : (
            <MapView
              mapToken={mapToken}
              facilities={allFacilities || []}
              highlightedFacility={highlightedFacility}
              onMarkerClick={onMarkerClick}
              selectedState={filters.selectedState}
            />
          )}
        </Card>
      )}
    </>
  );
};

export default MapDisplayArea;
