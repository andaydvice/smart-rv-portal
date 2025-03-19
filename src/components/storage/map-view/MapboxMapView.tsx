
import React from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from '../types';

interface MapboxMapViewProps {
  facilities: StorageFacility[];
  recentlyViewedFacilityIds: string[];
  onMarkerClick?: (facilityId: string) => void;
  apiKey?: string;
}

// This is a placeholder component to fix the import error
// Actual implementation would use Mapbox GL JS
const MapboxMapView: React.FC<MapboxMapViewProps> = ({
  facilities,
  recentlyViewedFacilityIds,
  onMarkerClick,
  apiKey
}) => {
  return (
    <Card className="h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700">
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Mapbox view not currently implemented. Please use Google Maps view.</p>
      </div>
    </Card>
  );
};

export default MapboxMapView;
