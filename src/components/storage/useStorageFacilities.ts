
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
      
      // Changed the filtering logic for Arizona to use a simpler OR condition
      if (filters.selectedState === 'Arizona') {
        query = query.or(`state.in.(AZ,Arizona)`);
      } else if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      if (!data) return [];

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

      return normalizedFacilities;
    },
    refetchOnWindowFocus: false, // Changed to false to prevent unnecessary refetches
    staleTime: 300000 // Added 5 minute stale time to prevent unnecessary refetches
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
