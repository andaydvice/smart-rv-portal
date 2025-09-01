
import React, { Suspense, lazy, useState } from 'react';
import { Container } from '@/components/ui/container';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, MapPin, Phone, Star } from 'lucide-react';
import MapFallback from '../map/MapFallback';

// Enhanced error boundary for map loading with console logging
const EnhancedGoogleMap = lazy(() => {
  console.log('Starting to load EnhancedGoogleMap...');
  return import('../map/EnhancedGoogleMap')
    .then(module => {
      console.log('EnhancedGoogleMap loaded successfully');
      return { default: module.default };
    })
    .catch((error) => {
      console.error('Failed to load EnhancedGoogleMap:', error);
      // Return a fallback component
      return { 
        default: ({ location, ...props }: any) => (
          <MapFallback location={location} error={error} />
        )
      };
    });
});

interface LocationPreviewSectionProps {
  mapToken: string;
  featuredLocation?: StorageFacility;
}

const LocationPreviewSection: React.FC<LocationPreviewSectionProps> = ({ mapToken, featuredLocation }) => {
  const [mapError, setMapError] = useState<Error | null>(null);
  
  // Validate that we have required fields for the featured location
  const isValidFeaturedLocation = featuredLocation && featuredLocation.id && featuredLocation.name;
  const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Render star rating display
  const renderRating = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1 mt-1">
        {Array(5).fill(0).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
          />
        ))}
        <span className="text-sm text-gray-300">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Convert facility features for the map component
  const getFacilityFeatures = (featuredLocation?: StorageFacility) => {
    if (!featuredLocation || !featuredLocation.features) return {};
    
    // Return the features object directly instead of converting to string array
    return {
      indoor: featuredLocation.features.indoor || false,
      climate_controlled: featuredLocation.features.climate_controlled || false,
      "24h_access": featuredLocation.features["24h_access"] || false,
      security_system: featuredLocation.features.security_system || false,
      vehicle_washing: featuredLocation.features.vehicle_washing || false
    };
  };
  
  // Handle map load event to ensure persistence of markers
  const handleMapLoad = () => {
    // Add a small delay to ensure the map is fully loaded
    setTimeout(() => {
      // Force any markers to be visible via DOM manipulation
      document.querySelectorAll('.gm-style img[src*="marker"]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.display = 'block';
          el.style.zIndex = '1000';
        }
      });
    }, 500);
  };

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
              <div>
                <h3 className="text-xl text-[#5B9BD5] font-semibold">{featuredLocation.name}</h3>
                {renderRating(featuredLocation.avg_rating)}
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  {featuredLocation.address}, {featuredLocation.city}, {featuredLocation.state}
                </span>
              </div>
              
              {featuredLocation.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{featuredLocation.contact_phone}</span>
                </div>
              )}
              
              {featuredLocation.features && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">FACILITIES & AMENITIES</h4>
                  <div className="flex flex-wrap gap-2">
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
                    {featuredLocation.features.vehicle_washing && (
                      <span className="bg-[#131a2a] text-[#5B9BD5] text-xs px-2 py-1 rounded">Vehicle Washing</span>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-gray-300 border-l-2 border-[#5B9BD5] pl-3 italic mt-6 text-left">
                Explore our premium indoor RV storage facility with climate control and 24/7 security.
              </p>
            </div>
            
            {/* Right side: Enhanced Google Map with persistent markers */}
            <div className="map-container-persistent">
              <Suspense fallback={<MapFallback location={{ lat: featuredLocation.latitude, lng: featuredLocation.longitude }} />}>
                {googleMapsKey ? (
                  <EnhancedGoogleMap 
                    apiKey={googleMapsKey}
                    location={{
                      lat: featuredLocation.latitude,
                      lng: featuredLocation.longitude
                    }}
                    onMapLoad={handleMapLoad}
                    facilities={[{
                      name: featuredLocation.name,
                      address: `${featuredLocation.address}, ${featuredLocation.city}, ${featuredLocation.state}`,
                      rating: featuredLocation.avg_rating,
                      phone: featuredLocation.contact_phone,
                      description: "Premium indoor RV storage facility",
                      features: getFacilityFeatures(featuredLocation)
                    }]}
                  />
                ) : (
                  <MapFallback 
                    location={{ lat: featuredLocation.latitude, lng: featuredLocation.longitude }} 
                    error={new Error('Google Maps API key not configured')}
                  />
                )}
              </Suspense>
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
