
import React from 'react';
import { StorageFacility } from '../../types';

interface FacilityInfoWindowProps {
  facility: StorageFacility;
}

const FacilityInfoWindow: React.FC<FacilityInfoWindowProps> = ({ facility }) => {
  return (
    <div className="facility-info-window max-w-[300px]">
      <h3 className="text-lg font-semibold mb-1 text-[#5B9BD5]">{facility.name}</h3>
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
              <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Indoor</span>
            )}
            {facility.features.climate_controlled && (
              <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Climate Controlled</span>
            )}
            {facility.features["24h_access"] && (
              <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">24/7 Access</span>
            )}
            {facility.features.security_system && (
              <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Security</span>
            )}
            {facility.features.vehicle_washing && (
              <span className="text-xs bg-[#e0f2ff] text-[#4285F4] px-2 py-0.5 rounded">Vehicle Washing</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityInfoWindow;
