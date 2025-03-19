
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import GoogleMapView from './map/GoogleMapView';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";

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

  // Format the facility rating to display up to 5 stars
  const renderRatingStars = (rating?: number) => {
    if (!rating && rating !== 0) return null;
    
    const normalizedRating = Math.min(Math.max(Math.round(rating), 0), 5);
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < normalizedRating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-400'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-300">
          {selectedFacility?.review_count ? `(${selectedFacility.review_count})` : ''}
        </span>
      </div>
    );
  };

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
            <DialogContent className="sm:max-w-[425px] bg-[#131a2a] text-white border-0">
              {selectedFacility ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-[#60A5FA]">
                      {selectedFacility.name}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-2">
                    {/* Rating Stars */}
                    {selectedFacility.avg_rating !== undefined && (
                      <div className="mb-4">
                        {renderRatingStars(selectedFacility.avg_rating)}
                      </div>
                    )}
                    
                    {/* Address */}
                    <p className="text-lg">
                      {selectedFacility.address}
                    </p>
                    <p className="text-lg">
                      {selectedFacility.city}, {selectedFacility.state}
                    </p>
                    
                    {/* Price Range */}
                    {selectedFacility.price_range && (
                      <p className="text-xl font-medium text-[#F97316]">
                        Price: ${selectedFacility.price_range.min} - ${selectedFacility.price_range.max}
                      </p>
                    )}
                    
                    {/* Contact Information */}
                    {selectedFacility.contact_phone && (
                      <p className="text-lg">
                        Phone: {selectedFacility.contact_phone}
                      </p>
                    )}
                    
                    {/* Features */}
                    {selectedFacility.features && Object.values(selectedFacility.features).some(v => v) && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Features:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedFacility.features.indoor && (
                            <span className="bg-[#1D283A] text-[#60A5FA] px-2 py-1 rounded text-sm">Indoor</span>
                          )}
                          {selectedFacility.features.climate_controlled && (
                            <span className="bg-[#1D283A] text-[#60A5FA] px-2 py-1 rounded text-sm">Climate Controlled</span>
                          )}
                          {selectedFacility.features["24h_access"] && (
                            <span className="bg-[#1D283A] text-[#60A5FA] px-2 py-1 rounded text-sm">24/7 Access</span>
                          )}
                          {selectedFacility.features.security_system && (
                            <span className="bg-[#1D283A] text-[#60A5FA] px-2 py-1 rounded text-sm">Security</span>
                          )}
                          {selectedFacility.features.vehicle_washing && (
                            <span className="bg-[#1D283A] text-[#60A5FA] px-2 py-1 rounded text-sm">Vehicle Washing</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Facility Details Unavailable</h3>
                  <p className="text-gray-400">
                    Unable to load details for this location. Please try again later.
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </Card>
  );
};

export default GoogleMapFacilitiesView;
