
import React from 'react';
import MapPreview from '../map/MapPreview';
import { Container } from '@/components/ui/container';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import '../../styles/map-preview.css';

interface LocationPreviewSectionProps {
  mapToken: string;
  featuredLocation?: StorageFacility;
}

const LocationPreviewSection: React.FC<LocationPreviewSectionProps> = ({ mapToken, featuredLocation }) => {
  // Validate that we have required fields for the featured location
  const isValidFeaturedLocation = featuredLocation && featuredLocation.id && featuredLocation.name;

  return (
    <Container className="py-8">
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c]">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Featured Storage Location
        </h2>
        
        {isValidFeaturedLocation ? (
          <>
            <div className="mb-4">
              <h3 className="text-xl text-[#60A5FA] font-semibold">{featuredLocation.name}</h3>
              <p className="text-gray-300">{featuredLocation.address}, {featuredLocation.city}, {featuredLocation.state}</p>
              
              {featuredLocation.features && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredLocation.features.indoor && (
                    <span className="feature-badge">Indoor Storage</span>
                  )}
                  {featuredLocation.features.climate_controlled && (
                    <span className="feature-badge">Climate Controlled</span>
                  )}
                  {featuredLocation.features["24h_access"] && (
                    <span className="feature-badge">24/7 Access</span>
                  )}
                  {featuredLocation.features.security_system && (
                    <span className="feature-badge">Security System</span>
                  )}
                </div>
              )}
              
              <p className="text-gray-300 mt-3">
                Click on the marker to view more details about this location.
              </p>
            </div>
            
            <MapPreview 
              location={{
                lat: featuredLocation.latitude,
                lng: featuredLocation.longitude,
                details: `${featuredLocation.name}<br/>${featuredLocation.address}, ${featuredLocation.city}, ${featuredLocation.state}`
              }}
              mapToken={mapToken}
              title={featuredLocation.name}
            />
          </>
        ) : (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No featured location is currently available. Please select a facility from the map above.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default LocationPreviewSection;
