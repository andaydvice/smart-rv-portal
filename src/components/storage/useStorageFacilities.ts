
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

// Get abbreviated state code for a given full state name
const getStateAbbreviation = (stateName: string): string => {
  if (stateName === 'Arizona') return 'AZ';
  if (stateName === 'California') return 'CA';
  if (stateName === 'Colorado') return 'CO';
  if (stateName === 'Texas') return 'TX';
  if (stateName === 'Florida') return 'FL';
  if (stateName === 'Nevada') return 'NV';
  if (stateName === 'Georgia') return 'GA';
  if (stateName === 'Iowa') return 'IA';
  if (stateName === 'Minnesota') return 'MN';
  if (stateName === 'Wisconsin') return 'WI';
  if (stateName === 'Oregon') return 'OR';
  if (stateName === 'Pennsylvania') return 'PA';
  if (stateName === 'New York') return 'NY';
  if (stateName === 'Ohio') return 'OH';
  if (stateName === 'Indiana') return 'IN';
  return stateName; // Return original if no abbreviation found
};

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
      try {
        // Create base query
        let query = supabase
          .from('storage_facilities')
          .select<string, DatabaseStorageFacility>(`
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
            review_count
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
          const stateAbbr = getStateAbbreviation(filters.selectedState);
          
          // Add both the full name and abbreviation to handle inconsistencies in the database
          stateValues.push(filters.selectedState, stateAbbr);
          
          // Log state values for debugging
          console.log('Filtering by states:', stateValues);
          
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
        if (data.length > 0) {
          console.log('States returned:', [...new Set(data.map(f => f.state))].sort());
        }
        
        // Map database results to StorageFacility objects
        const mappedFacilities = data.map(facility => {
          // Normalize state names for display
          const normalizedState = normalizeStateName(facility.state);
                
          // Store original coordinates
          const latitude = facility.latitude;
          const longitude = facility.longitude;
                
          // Return storage facility
          return {
            id: facility.id,
            name: facility.name,
            address: facility.address,
            city: facility.city,
            state: normalizedState,
            latitude: latitude,
            longitude: longitude,
            features: {
              indoor: Boolean(facility.features?.indoor),
              climate_controlled: Boolean(facility.features?.climate_controlled),
              "24h_access": Boolean(facility.features?.["24h_access"]),
              security_system: Boolean(facility.features?.security_system),
              vehicle_washing: Boolean(facility.features?.vehicle_washing)
            },
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
              features: false,
              price_range: false,
              contact_info: false,
              location: false,
              business_hours: false
            }
          };
        });

        // Log the obtained facilities with their coordinates
        console.log(`Mapped ${mappedFacilities.length} facilities with coordinates`);
        return mappedFacilities;
      } catch (error) {
        console.error('Error fetching storage facilities:', error);
        return [];
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minute cache
  });

  // Only filter by price range after fetching from database
  const filteredFacilities = facilities?.filter(facility => {
    const facilityMaxPrice = facility.price_range.max;
    
    return facilityMaxPrice >= filters.priceRange[0] && facilityMaxPrice <= filters.priceRange[1];
  });
  
  // Add additional logging to track filtered results
  console.log(`Filtered facilities: ${filteredFacilities?.length || 0} out of ${facilities?.length || 0}`);
  
  return { 
    facilities: filteredFacilities,
    isLoading,
    error,
    maxPrice: maxPriceData || 1000
  };
};
