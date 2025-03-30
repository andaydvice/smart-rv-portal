
import React from 'react';
import { Container } from '@/components/ui/container';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedGoogleMap from '../map/EnhancedGoogleMap';

interface LocationPreviewSectionProps {
  mapToken: string;
  featuredLocation?: StorageFacility;
}

// Function to scroll to map section
const scrollToMap = () => {
  const mapElement = document.querySelector('.storage-facilities-map');
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const LocationPreviewSection: React.FC<LocationPreviewSectionProps> = ({ mapToken, featuredLocation }) => {
  // Validate that we have required fields for the featured location
  const isValidFeaturedLocation = featuredLocation && featuredLocation.id && featuredLocation.name;
  const googleMapsKey = "AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o"; // Google Maps API key

  return (
    <Container className="py-8">
      <div className="bg-[#091020] rounded-lg p-6 border border-[#1a202c]">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Featured Storage Location
        </h2>
        
        {isValidFeaturedLocation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: Location details */}
            <div className="space-y-4">
              <h3 className="text-xl text-[#5B9BD5] font-semibold">{featuredLocation.name}</h3>
              <p className="text-gray-300">{featuredLocation.address}, {featuredLocation.city}, {featuredLocation.state}</p>
              
              {featuredLocation.features && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredLocation.features.indoor && (
                    <span className="bg-[#131a2a] text-[#5B9BD5] text-xs px-2 py-1 rounded">Indoor Storage</span>
                  )}
                  {featuredLocation.features.climate_controlled && (
                    <span className="bg-[#131a2a] text-[#5B9BD5] text-xs px-2 py-1 rounded">Climate Controlled</span>
                  )}
                  {featuredLocation.features["24h_access"] && (
                    <span className="bg-[#131a2a] text-[#5B9BD5] text-xs px-2 py-1 rounded">24/7 Access</span>
                  )}
                  {featuredLocation.features.security_system && (
                    <span className="bg-[#131a2a] text-[#5B9BD5] text-xs px-2 py-1 rounded">Security System</span>
                  )}
                </div>
              )}
              
              <p className="text-gray-300">
                Explore our premium indoor RV storage facility with climate control and 24/7 security.
              </p>
              
              <Button 
                variant="outline" 
                className="mt-2 flex items-center gap-2 text-[#5B9BD5] border-[#5B9BD5] hover:bg-[#5B9BD5]/10"
                onClick={scrollToMap}
              >
                <Navigation size={16} />
                <span>View on Map</span>
              </Button>
            </div>
            
            {/* Right side: Enhanced Google Map */}
            <div>
              <EnhancedGoogleMap 
                apiKey={googleMapsKey}
                location={{
                  lat: featuredLocation.latitude,
                  lng: featuredLocation.longitude
                }}
                facilities={[{
                  name: featuredLocation.name,
                  address: `${featuredLocation.address}, ${featuredLocation.city}, ${featuredLocation.state}`,
                  rating: featuredLocation.avg_rating,
                  description: "Premium indoor RV storage facility"
                }]}
              />
            </div>
          </div>
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
