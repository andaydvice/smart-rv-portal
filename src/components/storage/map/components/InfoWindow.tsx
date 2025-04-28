
import React from 'react';
import { StorageFacility } from '../../types';

interface InfoWindowProps {
  facility: StorageFacility;
  onClose: () => void;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ facility, onClose }) => {
  // Helper function to render rating stars
  const renderRatingStars = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300';
      stars.push(
        <span key={i} className={`${starClass} text-lg`}>★</span>
      );
    }
    
    return (
      <div className="flex items-center mt-1">
        {stars}
        <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="facility-info-window max-w-[300px]">
      <h3 className="text-lg font-semibold mb-1 text-[#5B9BD5]">{facility.name}</h3>
      
      {facility.avg_rating && renderRatingStars(facility.avg_rating)}
      
      {facility.review_count && facility.review_count > 0 && (
        <p className="text-xs text-gray-500 mb-2">
          {facility.review_count} {facility.review_count === 1 ? 'review' : 'reviews'}
        </p>
      )}
      
      <div className="space-y-1 text-sm">
        <p>{facility.address}</p>
        <p>{facility.city}, {facility.state}</p>
        {facility.price_range && (
          <p className="mt-2 font-semibold text-[#F97316]">
            Price: ${facility.price_range.min} - ${facility.price_range.max}
          </p>
        )}
        {facility.contact_phone && (
          <p className="mt-1">Phone: {facility.contact_phone}</p>
        )}
      </div>
      
      {facility.features && Object.values(facility.features).some(v => v) && (
        <div className="mt-2 border-t border-gray-300 pt-2">
          <p className="text-xs text-gray-600 mb-1">Features:</p>
          <div className="flex flex-wrap gap-1">
            {facility.features.indoor && (
              <span className="text-xs bg-[#131a2a] text-[#5B9BD5] px-2 py-0.5 rounded border border-[#5B9BD5]/20">Indoor</span>
            )}
            {facility.features.climate_controlled && (
              <span className="text-xs bg-[#131a2a] text-[#5B9BD5] px-2 py-0.5 rounded border border-[#5B9BD5]/20">Climate Controlled</span>
            )}
            {facility.features["24h_access"] && (
              <span className="text-xs bg-[#131a2a] text-[#5B9BD5] px-2 py-0.5 rounded border border-[#5B9BD5]/20">24/7 Access</span>
            )}
            {facility.features.security_system && (
              <span className="text-xs bg-[#131a2a] text-[#5B9BD5] px-2 py-0.5 rounded border border-[#5B9BD5]/20">Security</span>
            )}
            {facility.features.vehicle_washing && (
              <span className="text-xs bg-[#131a2a] text-[#5B9BD5] px-2 py-0.5 rounded border border-[#5B9BD5]/20">Vehicle Washing</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoWindow;
