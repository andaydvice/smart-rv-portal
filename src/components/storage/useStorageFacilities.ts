
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState, DatabaseStorageFacility } from './types';

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
      
      if (error) {
        console.error('Error fetching max price:', error);
        return 1000;
      }
      
      const priceRange = data?.price_range as { min: number; max: number; currency: string } | null;
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
      
      if (filters.selectedState === 'Arizona') {
        // If Arizona is selected, get both 'AZ' and 'Arizona' records using or()
        query = query.or('state.eq.AZ,state.eq.Arizona');
        console.log('Fetching Arizona facilities...');
      } else if (filters.selectedState) {
        // For other states, use exact match
        query = query.eq('state', filters.selectedState);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      if (!data) return [];

      // Log the raw data to verify what we're getting
      console.log('Raw facilities data:', data);

      const normalizedFacilities = data.map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: facility.state === 'AZ' ? 'Arizona' : facility.state,
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

      // Log normalized facilities and their coordinates
      console.log('Normalized facilities with coordinates:', 
        normalizedFacilities.map(f => ({
          id: f.id,
          name: f.name,
          state: f.state,
          lat: f.latitude,
          lng: f.longitude
        }))
      );

      return normalizedFacilities;
    },
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  const filteredFacilities = facilities?.filter(facility => {
    const facilityMaxPrice = facility.price_range.max;
    return facilityMaxPrice >= filters.priceRange[0] && facilityMaxPrice <= filters.priceRange[1];
  });

  // Log filtered facilities count
  console.log('Filtered facilities count:', filteredFacilities?.length);
  
  return { 
    facilities: filteredFacilities,
    isLoading,
    error,
    maxPrice: maxPriceData || 1000
  };
};
