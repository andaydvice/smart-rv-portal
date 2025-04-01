
import React, { useEffect, useState } from 'react';
import GoogleMapView from './map/GoogleMapView';
import MapLoadingState from './map/MapLoadingState';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  rating?: number;
  priceRange?: string;
  features?: string[];
}

interface StorageFacilitiesMapProps {
  facilities: Facility[];
  isLoading: boolean;
  error: string | null;
}

const StorageFacilitiesMap: React.FC<StorageFacilitiesMapProps> = ({
  facilities,
  isLoading,
  error
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(error);
  
  // Update error state when prop changes
  useEffect(() => {
    setMapError(error);
  }, [error]);
  
  // Handle map load event
  const handleMapLoad = () => {
    console.log('Map loaded successfully');
    setMapLoaded(true);
  };
  
  // Handle map error
  const handleMapError = (error: string) => {
    console.error('Map error:', error);
    setMapError(error);
  };

  return (
    <div className="relative h-full w-full bg-[#080F1F]">
      {/* Always render the loading state component but it will self-hide when not needed */}
      <MapLoadingState 
        isInitializing={isLoading || !mapLoaded} 
        mapError={mapError}
        mapLoaded={mapLoaded}
        facilitiesCount={facilities.length}
      />
      
      {/* Error message when no facilities */}
      {!isLoading && mapLoaded && facilities.length === 0 && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]/80 z-40">
          <Alert variant="default" className="max-w-md bg-[#151A22] border-[#1E2A3E] text-white">
            <AlertCircle className="h-4 w-4 text-[#5B9BD5]" />
            <AlertDescription>
              No storage facilities found matching your criteria. Try adjusting your filters or zoom out to see more options.
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* The actual map component */}
      <div className="h-full w-full bg-[#080F1F]">
        <GoogleMapView 
          facilities={facilities}
          onLoad={handleMapLoad}
          onError={handleMapError}
        />
      </div>
    </div>
  );
};

export default StorageFacilitiesMap;
