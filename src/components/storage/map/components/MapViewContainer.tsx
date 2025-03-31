
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Maximize2 } from 'lucide-react';
import MapView from '../../MapView';
import GoogleMapFacilitiesView from '../../GoogleMapFacilitiesView';
import { StorageFacility } from '../../types';
import FacilityCountBadge from './FacilityCountBadge';
import FullScreenPreview from './FullScreenPreview';
import { Button } from '@/components/ui/button';
import AutoRefreshControl from '@/components/ui/AutoRefreshControl';

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
  // Add state for fullscreen preview
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <FacilityCountBadge count={facilities?.length || 0} />
        
        {/* Auto-refresh control */}
        <div className="flex items-center gap-2">
          <AutoRefreshControl />
          
          {/* Full Screen Button */}
          <Button
            variant="outline"
            size="sm"
            className="bg-black/60 hover:bg-black/80 text-white border-gray-700"
            onClick={() => setIsFullScreenOpen(true)}
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Full Screen</span>
          </Button>
        </div>
      </div>
      
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
      
      {/* Full screen preview component */}
      <FullScreenPreview
        isOpen={isFullScreenOpen}
        onClose={() => setIsFullScreenOpen(false)}
        facilities={facilities || []}
        recentlyViewedFacilityIds={recentlyViewedIds}
        apiKey={googleMapsKey}
        selectedState={selectedState}
        highlightedFacility={highlightedFacility}
        onMarkerClick={onMarkerClick}
      />
    </div>
  );
};

export default MapViewContainer;
