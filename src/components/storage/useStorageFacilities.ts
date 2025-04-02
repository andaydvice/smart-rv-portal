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

// Conversion function for consistent typing
function convertToStorageFacility(facility: any): StorageFacility {
  // Create a properly typed features object
  const features = {
    indoor: Boolean(facility.features?.indoor),
    climate_controlled: Boolean(facility.features?.climate_controlled),
    "24h_access": Boolean(facility.features?.["24h_access"]),
    security_system: Boolean(facility.features?.security_system),
    vehicle_washing: Boolean(facility.features?.vehicle_washing)
  };

  // Normalize state names for display
  const normalizedState = normalizeStateName(facility.state);
         
  // Return storage facility with proper typing
  return {
    id: facility.id,
    name: facility.name,
    address: facility.address,
    city: facility.city,
    state: normalizedState,
    latitude: Number(facility.latitude),
    longitude: Number(facility.longitude),
    features: features,
    price_range: {
      min: Number(facility.price_range?.min) || 0,
      max: Number(facility.price_range?.max) || 0,
      currency: facility.price_range?.currency || 'USD'
    },
    contact_phone: facility.contact_phone,
    contact_email: facility.contact_email,
    avg_rating: facility.avg_rating,
    review_count: facility.review_count,
    verified_fields: {
      features: Boolean(facility.verified_fields?.features),
      price_range: Boolean(facility.verified_fields?.price_range),
      contact_info: Boolean(facility.verified_fields?.contact_info),
      location: Boolean(facility.verified_fields?.location),
      business_hours: Boolean(facility.verified_fields?.business_hours)
    }
  };
}

export const useStorageFacilities = (filters: FilterState) => {
  const { data: maxPriceData } = useQuery({
    queryKey: ['max-facility-price'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('storage_facilities')
        .select('price_range')
        .order('price_range->max', { ascending: false })
        .limit(1)
        .single();
      
      if (error) return 1000;
      
      const priceRange = (data?.price_range as unknown) as PriceRange | null;
      return priceRange?.max || 1000;
    }
  });

  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters],
    queryFn: async () => {
      
      let query = supabase
        .from('storage_facilities')
        .select(`
          id,
          name,
          address,
          city,
          state,
          latitude,
          longitude,
          features,
          price_range,
          contact_phone,
          contact_email,
          avg_rating,
          review_count,
          verified_fields
        `);
      
      // Log query params for debugging
      console.log('Query params:', {
        selectedState: filters.selectedState,
        priceRange: filters.priceRange
      });
      
      // Apply state filter if selected
      if (filters.selectedState) {
        
        // Create an array of possible state values (full name and abbreviation)
        const stateValues = [];
        if (filters.selectedState === 'Arizona') {
          stateValues.push('AZ', 'Arizona');
        } else if (filters.selectedState === 'California') {
          stateValues.push('CA', 'California');
        } else if (filters.selectedState === 'Texas') {
          stateValues.push('TX', 'Texas');
        } else if (filters.selectedState === 'Florida') {
          stateValues.push('FL', 'Florida');
        } else if (filters.selectedState === 'Nevada') {
          stateValues.push('NV', 'Nevada');
        } else if (filters.selectedState === 'Georgia') {
          stateValues.push('GA', 'Georgia');
        } else if (filters.selectedState === 'Colorado') {
          stateValues.push('CO', 'Colorado');
        } else if (filters.selectedState === 'Iowa') {
          stateValues.push('IA', 'Iowa');
        } else if (filters.selectedState === 'Minnesota') {
          stateValues.push('MN', 'Minnesota');
        } else if (filters.selectedState === 'Wisconsin') {
          stateValues.push('WI', 'Wisconsin');
        } else if (filters.selectedState === 'Oregon') {
          stateValues.push('OR', 'Oregon');
        } else if (filters.selectedState === 'Pennsylvania') {
          stateValues.push('PA', 'Pennsylvania');
        } else if (filters.selectedState === 'New York') {
          stateValues.push('NY', 'New York');
        } else if (filters.selectedState === 'Ohio') {
          stateValues.push('OH', 'Ohio');
        } else if (filters.selectedState === 'Indiana') {
          stateValues.push('IN', 'Indiana');
        } else {
          // For other states, use direct equality and add the state name
          stateValues.push(filters.selectedState);
        }
        
        // Use in operator to match any of the possible state values
        query = query.in('state', stateValues);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      if (!data) return [];

      // Log states returned for debugging
      console.log('Total facilities fetched:', data.length);
      console.log('States returned:', [...new Set(data.map(f => f.state))].sort());
      
      // Map database results to StorageFacility objects using our conversion function
      return data.map(facility => convertToStorageFacility(facility));
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
