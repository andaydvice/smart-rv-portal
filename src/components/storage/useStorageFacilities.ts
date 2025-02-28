
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
      
      // Log the query parameters for debugging
      console.log('Query params:', {
        selectedState: filters.selectedState,
        priceRange: filters.priceRange
      });
      
      // Handle different state formats
      if (filters.selectedState === 'California') {
        query = query.or('state.eq.CA,state.eq.California');
      } else if (filters.selectedState === 'Arizona') {
        query = query.or('state.eq.AZ,state.eq.Arizona');
      } else if (filters.selectedState === 'Texas') {
        query = query.or('state.eq.TX,state.eq.Texas');
      } else if (filters.selectedState === 'Florida') {
        query = query.or('state.eq.FL,state.eq.Florida');
      } else if (filters.selectedState === 'Nevada') {
        query = query.or('state.eq.NV,state.eq.Nevada');
      } else if (filters.selectedState === 'Colorado') {
        query = query.or('state.eq.CO,state.eq.Colorado');
      } else if (filters.selectedState === 'Lowa') {
        query = query.or('state.eq.IA,state.eq.Lowa');
      } else if (filters.selectedState === 'Minnesota') {
        query = query.or('state.eq.MN,state.eq.Minnesota');
      } else if (filters.selectedState === 'Wisconsin') {
        query = query.or('state.eq.WI,state.eq.Wisconsin');
      } else if (filters.selectedState === 'Oregon') {
        query = query.or('state.eq.OR,state.eq.Oregon');
      } else if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      if (!data) return [];

      // Log the results for verification
      console.log('Total facilities fetched:', data.length);
      console.log('Facility names:', data.map(f => f.name).sort());

      return data.map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: facility.state === 'AZ' ? 'Arizona' : 
               facility.state === 'CA' ? 'California' : 
               facility.state === 'CO' ? 'Colorado' :
               facility.state === 'TX' ? 'Texas' :
               facility.state === 'FL' ? 'Florida' :
               facility.state === 'NV' ? 'Nevada' :
               facility.state === 'IA' ? 'Lowa' :
               facility.state === 'MN' ? 'Minnesota' :
               facility.state === 'WI' ? 'Wisconsin' :
               facility.state === 'OR' ? 'Oregon' :
               facility.state,
        latitude: Number(facility.latitude),
        longitude: Number(facility.longitude),
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
      }));
    },
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minute cache
  });

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
