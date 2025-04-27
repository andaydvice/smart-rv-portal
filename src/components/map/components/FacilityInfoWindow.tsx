
import React from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import { MapPin, Phone } from 'lucide-react';
import { Facility } from '../types';

interface FacilityInfoWindowProps {
  facility: Facility;
  position: google.maps.LatLngLiteral;
  onCloseClick: () => void;
}

const FacilityInfoWindow: React.FC<FacilityInfoWindowProps> = ({ 
  facility, 
  position, 
  onCloseClick 
}) => {
  return (
    <InfoWindowF
      position={position}
      onCloseClick={onCloseClick}
      options={{
        pixelOffset: new google.maps.Size(0, -10),
        maxWidth: 320,
        zIndex: 999
      }}
    >
      <div className="p-0 max-w-[300px] bg-[#131a2a] text-white rounded-lg">
        <div className="bg-[#091020] px-5 py-5 rounded-t-lg">
          <h3 className="text-xl font-bold text-[#5B9BD5] text-center">{facility.name}</h3>
        </div>
        
        <div className="px-5 pt-4 pb-5">
          {facility.address && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-white font-medium text-center">{facility.address}</span>
            </div>
          )}
          
          {facility.phone && (
            <div className="flex items-center justify-center gap-2 mb-5">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">{facility.phone}</span>
            </div>
          )}
          
          {facility.features && Object.values(facility.features).some(v => v) && (
            <div className="mb-5">
              <h4 className="text-sm font-bold text-gray-400 uppercase text-center mb-3">FACILITIES & AMENITIES</h4>
              <div className="grid grid-cols-2 gap-3">
                {facility.features.indoor && (
                  <span className="facility-feature">Indoor</span>
                )}
                {facility.features.climate_controlled && (
                  <span className="facility-feature">Climate Controlled</span>
                )}
                {facility.features["24h_access"] && (
                  <span className="facility-feature">24/7 Access</span>
                )}
                {facility.features.security_system && (
                  <span className="facility-feature">Security</span>
                )}
                {facility.features.vehicle_washing && (
                  <span className="facility-feature">Vehicle Washing</span>
                )}
              </div>
            </div>
          )}
          
          {facility.description && (
            <div className="border-l-2 border-[#5B9BD5] pl-3 italic text-gray-300 mb-2 mt-4 text-left">
              <p>{facility.description}</p>
            </div>
          )}
        </div>
      </div>
    </InfoWindowF>
  );
};

export default FacilityInfoWindow;
