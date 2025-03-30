import React from 'react';
import { Container } from '@/components/ui/container';
import { StorageFacility } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, MapPin, Phone, Star } from 'lucide-react';
import EnhancedGoogleMap from '../map/EnhancedGoogleMap';

interface LocationPreviewSectionProps {
  mapToken: string;
  featuredLocation?: StorageFacility;
}

const LocationPreviewSection: React.FC<LocationPreviewSectionProps> = ({ mapToken, featuredLocation }) => {
  // Validate that we have required fields for the featured location
  const isValidFeaturedLocation = featuredLocation && featuredLocation.id && featuredLocation.name;
  const googleMapsKey = "AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o"; // Google Maps API key

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

  // Convert facility features to array of strings for the map component
  const getFacilityFeatures = (featuredLocation?: StorageFacility): string[] => {
    if (!featuredLocation || !featuredLocation.features) return [];
    
    const features: string[] = [];
    if (featuredLocation.features.indoor) features.push('Indoor Storage');
    if (featuredLocation.features.climate_controlled) features.push('Climate Controlled');
    if (featuredLocation.features["24h_access"]) features.push('24/7 Access');
    if (featuredLocation.features.security_system) features.push('Security System');
    if (featuredLocation.features.vehicle_washing) features.push('Vehicle Washing');
    
    return features;
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
