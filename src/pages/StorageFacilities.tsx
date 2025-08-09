import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import LocationPreviewSection from "@/components/storage/LocationPreviewSection";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { useState, useEffect } from "react";
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

// Create a function to count facilities by state without relying on RPC
// This runs client-side when the Supabase RPC is not available
export async function getStateCountsWithSQL() {
  const { supabase } = await import('@/integrations/supabase/client');
  
  // Execute a plain SQL query
  const { data, error } = await supabase
    .from('storage_facilities')
    .select('state');
  
  if (error || !data) {
    console.error('Error fetching states:', error);
    return [];
  }
  
  // Count occurrences of each state using normalized state names
  const stateCounts: Record<string, number> = {};
  data.forEach(item => {
    if (!item.state) return;
    
    // Normalize the state name
    const normalizedState = normalizeStateName(item.state);
    
    // Add to counts with the normalized name
    stateCounts[normalizedState] = (stateCounts[normalizedState] || 0) + 1;
  });
  
  // Convert to array format
  return Object.entries(stateCounts).map(([state, count]) => ({
    state,
    count
  })).sort((a, b) => a.state.localeCompare(b.state));
}

// Helper function to convert Supabase data to StorageFacility type
function convertToStorageFacility(data: any): StorageFacility {
  // Create a properly typed features object
  const features = {
    indoor: Boolean(data.features?.indoor),
    climate_controlled: Boolean(data.features?.climate_controlled),
    "24h_access": Boolean(data.features?.["24h_access"]),
    security_system: Boolean(data.features?.security_system),
    vehicle_washing: Boolean(data.features?.vehicle_washing)
  };
  
  // Create a properly typed price_range object
  const priceRange = {
    min: Number(data.price_range?.min) || 0,
    max: Number(data.price_range?.max) || 0,
    currency: data.price_range?.currency || 'USD'
  };
  
  // Create a properly typed verified_fields object
  const verifiedFields = {
    features: Boolean(data.verified_fields?.features),
    price_range: Boolean(data.verified_fields?.price_range),
    contact_info: Boolean(data.verified_fields?.contact_info),
    location: Boolean(data.verified_fields?.location),
    business_hours: Boolean(data.verified_fields?.business_hours)
  };
  
  // Return a properly typed StorageFacility object
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
    contact_phone: data.contact_phone || undefined,
    contact_email: data.contact_email || undefined,
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

  // Set a random featured location if none is selected
  useEffect(() => {
    const fetchRandomLocation = async () => {
      if (!featuredLocation) {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const { data, error } = await supabase
            .from('storage_facilities')
            .select('*')
            .limit(5);
            
          if (data && data.length > 0) {
            // Pick a random facility from the fetched data
            const randomIndex = Math.floor(Math.random() * data.length);
            // Convert the Supabase data to StorageFacility type
            setFeaturedLocation(convertToStorageFacility(data[randomIndex]));
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
      
      {/* Storage Services and Recommendations */}
      <div className="max-w-7xl mx-auto px-4">
        <OptimizedAffiliateGrid
          title="Recommended Storage Solutions"
          subtitle="Professional RV storage facilities and services to keep your RV safe and secure when not in use."
          partners={[
            { partner: 'rvlife', title: 'RV Life Storage Guide', description: 'Comprehensive storage guides and facility reviews' },
            { partner: 'goodsam', title: 'Good Sam Storage', description: 'Member discounts on storage facilities nationwide' },
            { partner: 'technorv', title: 'Storage Equipment', description: 'Professional RV covers and storage accessories' }
          ]}
          gridCols="3"
        />
      </div>
    </Layout>
  );
}
