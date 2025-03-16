
import React from 'react';
import MapPreviewExample from '../map/MapPreviewExample';
import { Container } from '@/components/ui/container';
import '../../styles/map-preview.css';

interface LocationPreviewSectionProps {
  mapToken: string;
}

const LocationPreviewSection: React.FC<LocationPreviewSectionProps> = ({ mapToken }) => {
  return (
    <Container className="py-8">
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c]">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Featured Storage Location
        </h2>
        <p className="text-gray-300 mb-6">
          Explore our premium indoor RV storage facility with climate control and 24/7 security.
          Click on the marker to view more details about this location.
        </p>
        
        <MapPreviewExample mapToken={mapToken} />
      </div>
    </Container>
  );
};

export default LocationPreviewSection;
