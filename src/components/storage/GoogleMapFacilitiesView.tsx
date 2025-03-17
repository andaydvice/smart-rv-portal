
import React from 'react';
import { Card } from '@/components/ui/card';
import GoogleMapView from './map/GoogleMapView';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface GoogleMapFacilitiesViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
  className?: string;
}

const GoogleMapFacilitiesView: React.FC<GoogleMapFacilitiesViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey,
  className = ''
}) => {
  // Validate facilities before rendering
  const validFacilities = facilities.filter(
    facility => facility.latitude && facility.longitude
  );

  // Check if we have missing coordinates
  const missingCoordinates = facilities.length - validFacilities.length;

  return (
    <Card className={`h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700 ${className}`}>
      {!apiKey ? (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Google Maps API key is not configured
          </AlertDescription>
        </Alert>
      ) : validFacilities.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>No facilities with valid coordinates to display</p>
        </div>
      ) : (
        <>
          <GoogleMapView
            facilities={validFacilities}
            recentlyViewedFacilityIds={recentlyViewedFacilityIds}
            onMarkerClick={onMarkerClick}
            apiKey={apiKey}
          />
          
          {missingCoordinates > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {missingCoordinates} facilities missing coordinates
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default GoogleMapFacilitiesView;
