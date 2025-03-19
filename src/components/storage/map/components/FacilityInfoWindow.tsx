
import React from 'react';
import { StorageFacility } from '../../types';

interface FacilityInfoWindowProps {
  facility: StorageFacility;
}

const FacilityInfoWindow: React.FC<FacilityInfoWindowProps> = ({ facility }) => {
  // Get rating and ensure it's between 1-5
  const rating = facility.avg_rating ? Math.min(Math.max(Math.round(facility.avg_rating), 1), 5) : 0;
  
  return (
    <div className="facility-info-window text-white" style={{ minWidth: '220px', maxWidth: '300px' }}>
      <h3 className="text-xl font-semibold mb-2 text-[#60A5FA]">{facility.name}</h3>
      
      {rating > 0 && (
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <svg 
              key={i}
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={i < rating ? '#FBBF24' : 'none'} 
              stroke={i < rating ? '#FBBF24' : '#6B7280'} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ display: 'inline-block', visibility: 'visible', opacity: 1 }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          ))}
        </div>
      )}
      
      <p className="text-sm mb-1">{facility.address}</p>
      <p className="text-sm mb-4">{facility.city}, {facility.state}</p>
      
      <p className="text-md font-medium text-[#F97316] mb-3">
        Price: ${facility.price_range?.min || 0} - ${facility.price_range?.max || 0}
      </p>
      
      {facility.contact_phone && (
        <p className="text-sm mb-4">Phone: {facility.contact_phone}</p>
      )}
      
      {Object.values(facility.features || {}).some(v => v) && (
        <div className="mt-2">
          <p className="text-sm text-gray-400 mb-2">Features:</p>
          <div className="flex flex-wrap gap-2">
            {facility.features?.indoor && <span className="text-xs text-[#60A5FA]">Indoor</span>}
            {facility.features?.climate_controlled && <span className="text-xs text-[#60A5FA]">Climate Controlled</span>}
            {facility.features?.["24h_access"] && <span className="text-xs text-[#60A5FA]">24/7 Access</span>}
            {facility.features?.security_system && <span className="text-xs text-[#60A5FA]">Security</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityInfoWindow;
