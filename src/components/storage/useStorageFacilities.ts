import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState, DatabaseStorageFacility } from './types';

interface PriceRange {
  min: number;
  max: number;
  currency: string;
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
      
      // IMPROVED: Handle state filters with better OR conditions
      if (filters.selectedState === 'New York') {
        // Use multiple conditions to catch all variations of NY
        console.log('Using enhanced New York query with multiple state formats');
        query = query.or('state.eq.NY,state.eq.New York,state.ilike.%new%york%,state.eq.new york');
      } 
      // Added Ohio and Indiana state handling
      else if (filters.selectedState === 'Ohio') {
        query = query.or('state.eq.OH,state.eq.Ohio,state.ilike.%ohio%');
      } 
      else if (filters.selectedState === 'Indiana') {
        query = query.or('state.eq.IN,state.eq.Indiana,state.ilike.%indiana%');
      }
      // Handle different state formats for existing states
      else if (filters.selectedState === 'California') {
        query = query.or('state.eq.CA,state.eq.California,state.ilike.%california%');
      } else if (filters.selectedState === 'Arizona') {
        query = query.or('state.eq.AZ,state.eq.Arizona,state.ilike.%arizona%');
      } else if (filters.selectedState === 'Texas') {
        query = query.or('state.eq.TX,state.eq.Texas,state.ilike.%texas%');
      } else if (filters.selectedState === 'Florida') {
        query = query.or('state.eq.FL,state.eq.Florida,state.ilike.%florida%');
      } else if (filters.selectedState === 'Nevada') {
        query = query.or('state.eq.NV,state.eq.Nevada,state.ilike.%nevada%');
      } else if (filters.selectedState === 'Colorado') {
        query = query.or('state.eq.CO,state.eq.Colorado,state.ilike.%colorado%');
      } else if (filters.selectedState === 'Iowa') {
        query = query.or('state.eq.IA,state.eq.Iowa,state.ilike.%iowa%');
      } else if (filters.selectedState === 'Minnesota') {
        query = query.or('state.eq.MN,state.eq.Minnesota,state.ilike.%minnesota%');
      } else if (filters.selectedState === 'Wisconsin') {
        query = query.or('state.eq.WI,state.eq.Wisconsin,state.ilike.%wisconsin%');
      } else if (filters.selectedState === 'Oregon') {
        query = query.or('state.eq.OR,state.eq.Oregon,state.ilike.%oregon%');
      } else if (filters.selectedState === 'Pennsylvania') {
        query = query.or('state.eq.PA,state.eq.Pennsylvania,state.ilike.%pennsylvania%');
      } else if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
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
      
      // Map database results to StorageFacility objects
      return data.map(facility => {
        // Normalize state names for display
        const normalizedState = 
               facility.state === 'AZ' ? 'Arizona' : 
               facility.state === 'CA' ? 'California' : 
               facility.state === 'CO' ? 'Colorado' :
               facility.state === 'TX' ? 'Texas' :
               facility.state === 'FL' ? 'Florida' :
               facility.state === 'NV' ? 'Nevada' :
               facility.state === 'IA' ? 'Iowa' :
               facility.state === 'MN' ? 'Minnesota' :
               facility.state === 'WI' ? 'Wisconsin' :
               facility.state === 'OR' ? 'Oregon' :
               facility.state === 'PA' ? 'Pennsylvania' :
               facility.state === 'NY' ? 'New York' :
               facility.state === 'OH' ? 'Ohio' :
               facility.state === 'IN' ? 'Indiana' :
               facility.state;
        
        // Keep original coordinates as-is without validation
        const latitude = facility.latitude;
        const longitude = facility.longitude;
               
        // Return storage facility with original coordinates
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
    },
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minute cache
  });

  // Only filter by price range
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
