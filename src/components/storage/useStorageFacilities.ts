
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState } from './types';
import { Json } from '@/integrations/supabase/types';

export const useStorageFacilities = (filters: FilterState) => {
  // Query for max price from the view
  const { data: maxPriceData } = useQuery({
    queryKey: ['max-facility-price'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('facility_search')
        .select('max_price')
        .order('max_price', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching max price:', error);
        return 1000; // fallback value
      }
      
      return data?.max_price || 1000;
    }
  });

  // Main facilities query
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters],
    queryFn: async () => {
      console.log('Fetching facilities with filters:', filters);
      
      let query = supabase
        .from('storage_facilities') // Changed to storage_facilities table
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
          verified_fields,
          contact_email,
          avg_rating,
          review_count,
          has_indoor:features->>'indoor',
          has_climate_control:features->>'climate_controlled',
          has_24h_access:features->>'24h_access',
          has_security:features->>'security_system',
          has_washing:features->>'vehicle_washing',
          min_price:price_range->>'min',
          max_price:price_range->>'max',
          currency:price_range->>'currency'
        `);
      
      if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
      }

      // Handle feature filters using JSON operators
      if (filters.features.indoor) {
        query = query.eq('features->indoor', true);
      }
      if (filters.features.climate_controlled) {
        query = query.eq('features->climate_controlled', true);
      }
      if (filters.features["24h_access"]) {
        query = query.eq('features->24h_access', true);
      }
      if (filters.features.security_system) {
        query = query.eq('features->security_system', true);
      }
      if (filters.features.vehicle_washing) {
        query = query.eq('features->vehicle_washing', true);
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
      
      return data?.map(facility => {
        // Parse the verified_fields JSON data
        const rawVerifiedFields = (facility.verified_fields as Json) || {};
        
        return {
          id: facility.id,
          name: facility.name,
          address: facility.address,
          city: facility.city,
          state: facility.state,
          latitude: Number(facility.latitude),
          longitude: Number(facility.longitude),
          features: {
            indoor: Boolean(facility.has_indoor),
            climate_controlled: Boolean(facility.has_climate_control),
            "24h_access": Boolean(facility.has_24h_access),
            security_system: Boolean(facility.has_security),
            vehicle_washing: Boolean(facility.has_washing)
          },
          price_range: {
            min: Number(facility.min_price) || 0,
            max: Number(facility.max_price) || 0,
            currency: facility.currency || 'USD'
          },
          contact_phone: facility.contact_phone,
          contact_email: facility.contact_email,
          avg_rating: facility.avg_rating,
          review_count: facility.review_count,
          verified_fields: {
            features: Boolean((rawVerifiedFields as any)?.features),
            price_range: Boolean((rawVerifiedFields as any)?.price_range),
            contact_info: Boolean((rawVerifiedFields as any)?.contact_info),
            location: Boolean((rawVerifiedFields as any)?.location),
            business_hours: Boolean((rawVerifiedFields as any)?.business_hours)
          }
        };
      }) as StorageFacility[];
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
