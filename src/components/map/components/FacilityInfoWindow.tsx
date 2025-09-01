
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
  const hasFeatures = () => {
    if (!facility.features) return false;
    
    if (Array.isArray(facility.features)) {
      return facility.features.length > 0;
    } else {
      return Object.values(facility.features).some(v => Boolean(v));
    }
  };

  // Only access google.maps objects when component renders
  const getInfoWindowOptions = () => {
    if (typeof google === 'undefined' || !google.maps) {
      return {
        maxWidth: 320,
        zIndex: 999
      };
    }
    
    return {
      pixelOffset: new google.maps.Size(0, -10),
      maxWidth: 320,
      zIndex: 999
    };
  };

  return (
    <InfoWindowF
      position={position}
      onCloseClick={onCloseClick}
      options={getInfoWindowOptions()}
    >
      <div className="p-0 max-w-[300px] bg-[#131a2a]">
        <div className="bg-[#091020] px-5 py-5">
          <h3 className="text-xl font-bold text-[#5B9BD5]">{facility.name}</h3>
        </div>
        
        <div className="px-5 pt-4 pb-5">
          {facility.address && (
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#5B9BD5]" />
              <span>{facility.address}</span>
            </div>
          )}
          
          {facility.phone && (
            <div className="flex items-center gap-2 mb-5">
              <Phone className="w-5 h-5 text-[#5B9BD5]" />
              <span>{facility.phone}</span>
            </div>
          )}
          
          {hasFeatures() && (
            <div className="mb-5">
              <h4 className="text-sm font-bold text-[#5B9BD5] uppercase mb-3">FACILITIES & AMENITIES</h4>
              <div className="grid grid-cols-2 gap-3">
                {Array.isArray(facility.features) ? (
                  facility.features.map((feature, idx) => (
                    <span key={idx} className="facility-feature">{feature}</span>
                  ))
                ) : (
                  facility.features && (
                    <>
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
                    </>
                  )
                )}
              </div>
            </div>
          )}
          
          {facility.description && (
            <div className="border-l-2 border-[#5B9BD5] pl-3 italic">
              <p>{facility.description}</p>
            </div>
          )}
        </div>
      </div>
    </InfoWindowF>
  );
};

export default FacilityInfoWindow;
