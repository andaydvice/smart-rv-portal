
import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import MapView from '../../MapView';
import GoogleMapFacilitiesView from '../../GoogleMapFacilitiesView';
import { StorageFacility } from '../../types';
import FacilityCountBadge from './FacilityCountBadge';
import { ErrorBoundary } from '../../../ErrorBoundary';

interface MapViewContainerProps {
  useGoogleMaps: boolean;
  facilities: StorageFacility[];
  recentlyViewedIds: string[];
  onMarkerClick: (facilityId: string) => void;
  highlightedFacility: string | null;
  googleMapsKey: string;
  mapToken: string;
  mapTokenError: string | null;
  isLoading: boolean;
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
  isLoading,
  selectedState
}) => {
  return (
    <ErrorBoundary>
      <div className="relative">
        <FacilityCountBadge count={facilities?.length || 0} />
        
        {useGoogleMaps ? (
        <GoogleMapFacilitiesView
          facilities={facilities || []}
          recentlyViewedFacilityIds={recentlyViewedIds}
          onMarkerClick={onMarkerClick}
          apiKey={googleMapsKey}
          selectedState={selectedState}
          useGoogleMaps={useGoogleMaps}
        />
      ) : (
        <Card className="h-[400px] md:h-[650px] bg-[#080F1F] relative overflow-visible border-gray-700 map-container">
          {isLoading ? (
            <div className="flex items-center justify-center h-full bg-card rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading Mapbox...</p>
              </div>
            </div>
          ) : mapTokenError ? (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {mapTokenError}
              </AlertDescription>
            </Alert>
          ) : !mapToken ? (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No map configuration available
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
    </ErrorBoundary>
  );
};

export default MapViewContainer;
