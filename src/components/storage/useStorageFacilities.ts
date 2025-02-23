
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState } from './types';

export const useStorageFacilities = (filters: FilterState) => {
  // Query for max price using RPC
  const { data: maxPriceData } = useQuery({
    queryKey: ['max-facility-price'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_max_facility_price');
      
      if (error) {
        console.error('Error fetching max price:', error);
        return 1000; // fallback value
      }
      
      return data || 1000;
    }
  });

  // Main facilities query
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters],
    queryFn: async () => {
      console.log('Fetching facilities with filters:', filters);
      
      let query = supabase
        .from('facility_search')
        .select('*');
      
      if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
      }

      // Handle feature filters using boolean columns
      if (filters.features.indoor) {
        query = query.eq('has_indoor', true);
      }
      if (filters.features.climate_controlled) {
        query = query.eq('has_climate_control', true);
      }
      if (filters.features["24h_access"]) {
        query = query.eq('has_24h_access', true);
      }
      if (filters.features.security_system) {
        query = query.eq('has_security', true);
      }
      if (filters.features.vehicle_washing) {
        query = query.eq('has_washing', true);
      }

      // Handle rating filter
      if (filters.minRating !== null) {
        query = query.gte('avg_rating', filters.minRating);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching facilities:', error);
        throw error;
      }

      console.log('Fetched facilities:', data);
      
      return data?.map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: facility.state,
        latitude: Number(facility.latitude),
        longitude: Number(facility.longitude),
        features: {
          indoor: facility.has_indoor ?? false,
          climate_controlled: facility.has_climate_control ?? false,
          "24h_access": facility.has_24h_access ?? false,
          security_system: facility.has_security ?? false,
          vehicle_washing: facility.has_washing ?? false
        },
        price_range: {
          min: facility.min_price ?? 0,
          max: facility.max_price ?? 0,
          currency: facility.currency ?? 'USD'
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
      })) as StorageFacility[];
    }
  });

  // Apply price range filter in memory since it's a range
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
