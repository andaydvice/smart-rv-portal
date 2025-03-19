
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Star } from "lucide-react";
import { StorageFacility } from '../types';

interface FacilityDetailsModalProps {
  selectedFacility: StorageFacility | null;
}

const FacilityDetailsModal: React.FC<FacilityDetailsModalProps> = ({
  selectedFacility
}) => {
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
  );
};

export default FacilityDetailsModal;
