import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import LocationPreviewSection from "@/components/storage/LocationPreviewSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import React, { useState, useEffect } from "react";
import { StorageFacility } from "@/components/storage/types";
import "../styles/force-markers.css"; // Only load the minimal, clean CSS
import "../styles/map-fixes.css"; // Add our marker edge-clipping fixes
import "../styles/marker-fix.css"; // Additional critical marker fixes
import "../styles/responsive-map.css"; // Add our new responsive map styles
import "../styles/map-preview.css"; // Add our map preview styles
import "../styles/map-loading.css"; // Add loading styles
import "../styles/map/index.css"; // Updated path to use the index file that imports all map styles

// Helper function to normalize state names consistently
const normalizeStateName = (stateAbbr: string): string => {
  return stateAbbr === 'AZ' ? 'Arizona' : 
         stateAbbr === 'CA' ? 'California' : 
         stateAbbr === 'CO' ? 'Colorado' :
         stateAbbr === 'TX' ? 'Texas' :
         stateAbbr === 'FL' ? 'Florida' :
         stateAbbr === 'NV' ? 'Nevada' :
         stateAbbr === 'GA' ? 'Georgia' :
         stateAbbr === 'IA' ? 'Iowa' :
         stateAbbr === 'MN' ? 'Minnesota' :
         stateAbbr === 'WI' ? 'Wisconsin' :
         stateAbbr === 'OR' ? 'Oregon' :
         stateAbbr === 'PA' ? 'Pennsylvania' :
         stateAbbr === 'NY' ? 'New York' :
         stateAbbr === 'OH' ? 'Ohio' :
         stateAbbr === 'IN' ? 'Indiana' :
         stateAbbr;
};

// Create a function to count facilities by state using secure function
async function getStateCountsWithSQL() {
  try {
    // Use the secure public function instead of direct table access
    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.rpc('get_public_facility_data');
    
    if (error) {
      console.error('Error fetching storage facilities for state counts:', error);
      return {};
    }

    if (!data || data.length === 0) {
      console.warn('No facilities found for state counts');
      return {};
    }

    // Group by state and count
    const stateCounts: { [key: string]: number } = {};
    data.forEach(facility => {
      if (facility.state) {
        const normalizedState = normalizeStateName(facility.state);
        stateCounts[normalizedState] = (stateCounts[normalizedState] || 0) + 1;
      }
    });

    return stateCounts;
  } catch (error) {
    console.error('Error in getStateCountsWithSQL:', error);
    return {};
  }
}

// Helper function to convert public data to StorageFacility type
function convertToStorageFacilityFromPublic(data: any): StorageFacility {
  // Create a properly typed features object from basic features
  const features = {
    indoor: Boolean(data.basic_features?.indoor),
    climate_controlled: Boolean(data.basic_features?.climate_controlled),
    "24h_access": false, // Not exposed in public view
    security_system: Boolean(data.basic_features?.security_system),
    vehicle_washing: false // Not exposed in public view
  };
  
  // Convert price category to approximate range
  let priceRange = { min: 0, max: 0, currency: 'USD' };
  if (data.price_category === 'premium') {
    priceRange = { min: 301, max: 500, currency: 'USD' };
  } else if (data.price_category === 'standard') {
    priceRange = { min: 151, max: 300, currency: 'USD' };
  } else if (data.price_category === 'budget') {
    priceRange = { min: 50, max: 150, currency: 'USD' };
  }
  
  // Create a verified fields object (limited for public view)
  const verifiedFields = {
    features: false, // Not exposed in public view
    price_range: false, // Not exposed in public view
    contact_info: false, // Not exposed in public view
    location: true, // Location is publicly available
    business_hours: false // Not exposed in public view
  };
  
  // Return a properly typed StorageFacility object (no sensitive data)
  return {
    id: data.id,
    name: data.name,
    address: data.address,
    city: data.city,
    state: normalizeStateName(data.state),
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
    features: features,
    price_range: priceRange,
    contact_phone: undefined, // Contact info not exposed in public view
    contact_email: undefined, // Contact info not exposed in public view
    avg_rating: data.avg_rating || undefined,
    review_count: data.review_count || undefined,
    verified_fields: verifiedFields
  };
}

export default function StorageFacilities() {
  const [featuredLocation, setFeaturedLocation] = useState<StorageFacility | undefined>();
  const mapToken = import.meta.env.VITE_MAPBOX_TOKEN || "";
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Function to handle selecting a featured location
  const handleSelectFeaturedLocation = (facility: StorageFacility | null) => {
    if (facility) {
      setFeaturedLocation(facility);
    }
  };

  // Handle map load event
  const handleMapLoad = () => {
    setMapLoaded(true);
    console.log("Map loaded successfully");
  };

  // Set a random featured location if none is selected using secure function
  useEffect(() => {
    const fetchRandomLocation = async () => {
      if (!featuredLocation) {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          // Use the secure public function instead of direct table access
          const { data, error } = await supabase.rpc('get_public_facility_data');
            
          if (data && data.length > 0) {
            // Pick a random facility from the fetched data
            const randomIndex = Math.floor(Math.random() * data.length);
            // Convert the public data to StorageFacility type
            setFeaturedLocation(convertToStorageFacilityFromPublic(data[randomIndex]));
          }
        } catch (error) {
          console.error('Error fetching random facility:', error);
        }
      }
    };
    
    fetchRandomLocation();
  }, [featuredLocation]);


  return (
    <Layout>
      
      {/* Hero Header with Image */}
      {/* Hero Header with Image */}
      <div className="relative w-full h-[300px]">
        <img 
          src="/lovable-uploads/e9503bf4-354a-4790-8a83-fefea32abc5b.png" 
          alt="Indoor RV Storage Facility" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent">
          <Container className="h-full flex flex-col justify-center items-center" fullWidth>
            <div className="text-center max-w-3xl bg-black/40 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Warehouse className="h-7 w-7 text-[#5B9BD5]" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Indoor RV Storage Facilities
                </h1>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Find the perfect indoor storage solution for your RV across the USA including Oregon, Pennsylvania, New York, Minnesota, Iowa, Wisconsin, California, Arizona, Colorado, Texas, Florida, Georgia and Nevada.
              </p>
            </div>
          </Container>
        </div>
      </div>
      
      {/* Add clear spacing between hero and map content */}
      <div className="h-6"></div>
      
      {/* Main map container */}
      <Container fullWidth className="px-2 md:px-4 overflow-hidden max-w-[1920px] mx-auto flex-grow">
        <div className="py-4 storage-facilities-map">
          <StorageFacilitiesMap onSelectFeaturedLocation={handleSelectFeaturedLocation} />
        </div>
      </Container>
      
      {/* Location Preview Section */}
      <div className="mt-8 mb-12">
        <LocationPreviewSection mapToken={mapToken} featuredLocation={featuredLocation} />
      </div>
      
      {/* Storage recommendations removed */}
    </Layout>
  );
}
