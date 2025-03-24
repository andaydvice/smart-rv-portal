
import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import MapView from '../../MapView';
import GoogleMapFacilitiesView from '../../GoogleMapFacilitiesView';
import { StorageFacility } from '../../types';
import FacilityCountBadge from './FacilityCountBadge';

interface MapViewContainerProps {
  useGoogleMaps: boolean;
  facilities: StorageFacility[];
  recentlyViewedIds: string[];
  onMarkerClick: (facilityId: string) => void;
  highlightedFacility: string | null;
  googleMapsKey: string;
  mapToken: string;
  mapTokenError: string | null;
  selectedState: string | null;
}

const MapViewContainer: React.FC<MapViewContainerProps> = ({
  useGoogleMaps,
  facilities,
  recentlyViewedIds,
  onMarkerClick,
  highlightedFacility,
  googleMapsKey,
  mapToken,
  mapTokenError,
  selectedState
}) => {
  return (
    <div className="relative">
      <FacilityCountBadge count={facilities?.length || 0} />
      
      {useGoogleMaps ? (
        <GoogleMapFacilitiesView
          facilities={facilities || []}
          recentlyViewedFacilityIds={recentlyViewedIds}
          onMarkerClick={onMarkerClick}
          apiKey={googleMapsKey}
          selectedState={selectedState}
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
              facilities={facilities || []}
              highlightedFacility={highlightedFacility}
              onMarkerClick={onMarkerClick}
              selectedState={selectedState}
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default MapViewContainer;
