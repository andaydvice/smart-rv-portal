
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import GoogleMapView from './map/GoogleMapView';
import SimpleMapView from './map/SimpleMapView';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface GoogleMapFacilitiesViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  className?: string;
  selectedState?: string | null;
  useGoogleMaps?: boolean;
}

const GoogleMapFacilitiesView: React.FC<GoogleMapFacilitiesViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey,
  className = '',
  selectedState,
  useGoogleMaps = true
}) => {
  const [currentZoom, setCurrentZoom] = useState<number>(4);
  
  // Validate facilities before rendering
  const validFacilities = facilities.filter(
    facility => facility.latitude && facility.longitude
  );

  // Check if we have missing coordinates
  const missingCoordinates = facilities.length - validFacilities.length;
  
  // Handle zoom change
  const handleZoomChange = (zoom: number) => {
    setCurrentZoom(zoom);
  };

  return (
    <Card className={`h-[400px] md:h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700 ${className}`}>
      {!apiKey && useGoogleMaps ? (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Google Maps API key is not configured. Please check the configuration.
          </AlertDescription>
        </Alert>
      ) : validFacilities.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No facilities with valid coordinates to display</p>
        </div>
      ) : (
        <>
          {useGoogleMaps ? (
            <GoogleMapView
              facilities={validFacilities}
              recentlyViewedFacilityIds={recentlyViewedFacilityIds}
              onMarkerClick={onMarkerClick}
              apiKey={apiKey}
              zoom={currentZoom}
              onZoomChange={handleZoomChange}
              selectedState={selectedState}
            />
          ) : (
            <SimpleMapView
              facilities={validFacilities}
              onMarkerClick={onMarkerClick}
            />
          )}
          
          {missingCoordinates > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {missingCoordinates} facilities missing coordinates
            </div>
          )}
          
          {currentZoom > 10 && useGoogleMaps && (
            <div className="absolute top-4 left-4 bg-green-500/80 text-white text-xs px-3 py-1 rounded-full z-10 flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-1.5"></div>
              <span>Zoomed in - Showing nearby facilities</span>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default GoogleMapFacilitiesView;
