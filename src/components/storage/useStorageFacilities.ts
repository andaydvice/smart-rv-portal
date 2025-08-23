
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState, DatabaseStorageFacility } from './types';

interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

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

// Get abbreviation from full state name
const getStateAbbreviation = (fullStateName: string): string => {
  if (fullStateName === 'Arizona') return 'AZ';
  if (fullStateName === 'California') return 'CA';
  if (fullStateName === 'Colorado') return 'CO';
  if (fullStateName === 'Texas') return 'TX';
  if (fullStateName === 'Florida') return 'FL';
  if (fullStateName === 'Nevada') return 'NV';
  if (fullStateName === 'Georgia') return 'GA';
  if (fullStateName === 'Iowa') return 'IA';
  if (fullStateName === 'Minnesota') return 'MN';
  if (fullStateName === 'Wisconsin') return 'WI';
  if (fullStateName === 'Oregon') return 'OR';
  if (fullStateName === 'Pennsylvania') return 'PA';
  if (fullStateName === 'New York') return 'NY';
  if (fullStateName === 'Ohio') return 'OH';
  if (fullStateName === 'Indiana') return 'IN';
  return fullStateName;
}

// Conversion function for public data (non-sensitive info only)
function convertToStorageFacilityFromPublic(facility: any): StorageFacility {
  // Use basic features from the public function
  const features = {
    indoor: Boolean(facility.basic_features?.indoor),
    climate_controlled: Boolean(facility.basic_features?.climate_controlled),
    "24h_access": false, // Not exposed in public view
    security_system: Boolean(facility.basic_features?.security_system),
    vehicle_washing: false // Not exposed in public view
  };

  // Normalize state names for display
  const normalizedState = normalizeStateName(facility.state);

  // Convert price category back to approximate range
  let priceRange = { min: 0, max: 0, currency: 'USD' };
  if (facility.price_category === 'premium') {
    priceRange = { min: 301, max: 500, currency: 'USD' };
  } else if (facility.price_category === 'standard') {
    priceRange = { min: 151, max: 300, currency: 'USD' };
  } else if (facility.price_category === 'budget') {
    priceRange = { min: 50, max: 150, currency: 'USD' };
  }
         
  // Return storage facility with proper typing (no sensitive data)
  return {
    id: facility.id,
    name: facility.name,
    address: facility.address,
    city: facility.city,
    state: normalizedState,
    latitude: Number(facility.latitude),
    longitude: Number(facility.longitude),
    features: features,
    price_range: priceRange,
    contact_phone: undefined, // Not exposed in public view
    contact_email: undefined, // Not exposed in public view
    avg_rating: facility.avg_rating,
    review_count: facility.review_count,
    verified_fields: {
      features: false, // Not exposed in public view
      price_range: false, // Not exposed in public view
      contact_info: false, // Not exposed in public view
      location: true, // Location is publicly visible
      business_hours: false // Not exposed in public view
    }
  };
}

export const useStorageFacilities = (filters: FilterState) => {
  const { data: maxPriceData } = useQuery({
    queryKey: ['max-facility-price'],
    queryFn: async () => {
      // Use the public function for getting max price data
      const { data, error } = await supabase.rpc('get_public_facility_data');
      
      if (error || !data) return 1000;
      
      // Find max price from the price categories
      const hasAnyPremium = data.some(f => f.price_category === 'premium');
      const hasAnyStandard = data.some(f => f.price_category === 'standard');
      
      return hasAnyPremium ? 500 : hasAnyStandard ? 300 : 150;
    }
  });

  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters],
    queryFn: async () => {
      
      // Use the secure public function to get non-sensitive facility data
      const { data: allData, error } = await supabase.rpc('get_public_facility_data');
      
      // Log query params for debugging
      console.log('Query params:', {
        selectedState: filters.selectedState,
        priceRange: filters.priceRange
      });
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      if (!allData) return [];

      // Apply state filter if selected
      let filteredData = allData;
      if (filters.selectedState) {
        const stateValues = [];
        
        // Convert full state name to abbreviation, or vice versa
        if (filters.selectedState === 'Arizona' || filters.selectedState === 'AZ') {
          stateValues.push('AZ', 'Arizona');
        } else if (filters.selectedState === 'California' || filters.selectedState === 'CA') {
          stateValues.push('CA', 'California');
        } else if (filters.selectedState === 'Texas' || filters.selectedState === 'TX') {
          stateValues.push('TX', 'Texas');
        } else if (filters.selectedState === 'Florida' || filters.selectedState === 'FL') {
          stateValues.push('FL', 'Florida');
        } else if (filters.selectedState === 'Nevada' || filters.selectedState === 'NV') {
          stateValues.push('NV', 'Nevada');
        } else if (filters.selectedState === 'Georgia' || filters.selectedState === 'GA') {
          stateValues.push('GA', 'Georgia');
        } else if (filters.selectedState === 'Colorado' || filters.selectedState === 'CO') {
          stateValues.push('CO', 'Colorado');
        } else if (filters.selectedState === 'Iowa' || filters.selectedState === 'IA') {
          stateValues.push('IA', 'Iowa');
        } else if (filters.selectedState === 'Minnesota' || filters.selectedState === 'MN') {
          stateValues.push('MN', 'Minnesota');
        } else if (filters.selectedState === 'Wisconsin' || filters.selectedState === 'WI') {
          stateValues.push('WI', 'Wisconsin');
        } else if (filters.selectedState === 'Oregon' || filters.selectedState === 'OR') {
          stateValues.push('OR', 'Oregon');
        } else if (filters.selectedState === 'Pennsylvania' || filters.selectedState === 'PA') {
          stateValues.push('PA', 'Pennsylvania');
        } else if (filters.selectedState === 'New York' || filters.selectedState === 'NY') {
          stateValues.push('NY', 'New York');
        } else if (filters.selectedState === 'Ohio' || filters.selectedState === 'OH') {
          stateValues.push('OH', 'Ohio');
        } else if (filters.selectedState === 'Indiana' || filters.selectedState === 'IN') {
          stateValues.push('IN', 'Indiana');
        } else {
          stateValues.push(filters.selectedState);
        }
        
        filteredData = allData.filter(facility => 
          stateValues.includes(facility.state)
        );
      }

      // Log states returned for debugging
      console.log('Total facilities fetched:', filteredData.length);
      console.log('States returned:', [...new Set(filteredData.map(f => f.state))].sort());
      
      // Map database results to StorageFacility objects using our conversion function
      return filteredData.map(facility => convertToStorageFacilityFromPublic(facility));
    },
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minute cache
  });

  // Only filter by price range after fetching from database
  const filteredFacilities = facilities?.filter(facility => {
    const facilityMaxPrice = facility.price_range.max;
    
    return facilityMaxPrice >= filters.priceRange[0] && facilityMaxPrice <= filters.priceRange[1];
  });
  
  return { 
    facilities: filteredFacilities,
    isLoading,
    error,
    maxPrice: maxPriceData || 1000
  };
};
