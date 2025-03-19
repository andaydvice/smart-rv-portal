
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import GoogleMapView from './map/GoogleMapView';
import { StorageFacility } from './types';
import { Dialog } from "@/components/ui/dialog";
import MapAlertDisplay from './map-display/MapAlertDisplay';
import FacilityDetailsModal from './map-display/FacilityDetailsModal';

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
  const [currentZoom, setCurrentZoom] = useState<number>(4);
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
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

  // Handle marker click
  const handleMarkerClick = (facilityId: string) => {
    // Find the facility
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      setSelectedFacility(facility);
      setShowDetailsModal(true);
    }
    
    // Call the original onMarkerClick if provided
    if (onMarkerClick) {
      onMarkerClick(facilityId);
    }
  };

  return (
    <Card className={`h-[650px] bg-[#080F1F] relative overflow-hidden border-gray-700 ${className}`}>
      <MapAlertDisplay error={!apiKey ? "Google Maps API key is not configured" : null}>
        {validFacilities.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No facilities with valid coordinates to display</p>
          </div>
        ) : (
          <>
            <GoogleMapView
              facilities={validFacilities}
              recentlyViewedFacilityIds={recentlyViewedFacilityIds}
              onMarkerClick={handleMarkerClick}
              apiKey={apiKey}
              zoom={currentZoom}
              onZoomChange={handleZoomChange}
            />
            
            {missingCoordinates > 0 && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {missingCoordinates} facilities missing coordinates
              </div>
            )}
            
            {currentZoom > 10 && (
              <div className="absolute top-4 left-4 bg-green-500/80 text-white text-xs px-3 py-1 rounded-full z-10 flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-1.5"></div>
                <span>Zoomed in - Showing nearby facilities</span>
              </div>
            )}
            
            {/* Facility Details Modal */}
            <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
              {selectedFacility && <FacilityDetailsModal selectedFacility={selectedFacility} />}
            </Dialog>
          </>
        )}
      </MapAlertDisplay>
    </Card>
  );
};

export default GoogleMapFacilitiesView;
