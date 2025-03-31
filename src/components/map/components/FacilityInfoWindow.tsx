
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
        zIndex: 999,
      }}
    >
      <div className="p-0 max-w-[300px] bg-[#131a2a] text-white rounded-lg">
        {/* Title container with improved overflow handling */}
        <div className="bg-[#091020] px-4 py-4 rounded-t-lg">
          <h3 
            className="text-xl font-bold text-[#5B9BD5] text-center break-words whitespace-normal overflow-visible" 
            style={{ maxWidth: '100%', wordBreak: 'break-word' }}
          >
            {facility.name}
          </h3>
        </div>
        
        <div className="px-4 pt-4 pb-5">
          {facility.address && (
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              <span 
                className="text-white font-medium break-words whitespace-normal"
                style={{ wordBreak: 'break-word' }}
              >
                {facility.address}
              </span>
            </div>
          )}
          
          {facility.phone && (
            <div className="flex items-center gap-2 mb-5">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span 
                className="text-white font-medium break-words"
                style={{ wordBreak: 'break-word' }}
              >
                {facility.phone}
              </span>
            </div>
          )}
          
          {facility.features && facility.features.length > 0 && (
            <div className="mb-5">
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">FACILITIES & AMENITIES</h4>
              <div className="grid grid-cols-2 gap-3">
                {facility.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#1d2434] text-[#5B9BD5] text-sm font-medium px-3 py-2 rounded text-center break-words"
                    style={{ wordBreak: 'break-word' }}
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {facility.description && (
            <div className="border-l-2 border-[#5B9BD5] pl-3 italic text-gray-300 mb-2 mt-4">
              <p 
                className="break-words whitespace-normal"
                style={{ wordBreak: 'break-word' }}
              >
                {facility.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </InfoWindowF>
  );
};

export default FacilityInfoWindow;
