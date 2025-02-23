
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
        .from('facility_search')  // Using facility_search view instead of storage_facilities
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
          avg_rating,
          review_count
        `);
      
      if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
      }

      // Handle feature filters
      if (filters.features.indoor) {
        query = query.filter('features->indoor', 'eq', true);
      }
      if (filters.features.climate_controlled) {
        query = query.filter('features->climate_controlled', 'eq', true);
      }
      if (filters.features["24h_access"]) {
        query = query.filter('features->24h_access', 'eq', true);
      }
      if (filters.features.security_system) {
        query = query.filter('features->security_system', 'eq', true);
      }
      if (filters.features.vehicle_washing) {
        query = query.filter('features->vehicle_washing', 'eq', true);
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
        const features = (facility.features as Json) || {};
        const priceRange = (facility.price_range as Json) || {};
        
        return {
          id: facility.id,
          name: facility.name,
          address: facility.address,
          city: facility.city,
          state: facility.state,
          latitude: Number(facility.latitude),
          longitude: Number(facility.longitude),
          features: {
            indoor: Boolean((features as any)?.indoor),
            climate_controlled: Boolean((features as any)?.climate_controlled),
            "24h_access": Boolean((features as any)?.["24h_access"]),
            security_system: Boolean((features as any)?.security_system),
            vehicle_washing: Boolean((features as any)?.vehicle_washing)
          },
          price_range: {
            min: Number((priceRange as any)?.min) || 0,
            max: Number((priceRange as any)?.max) || 0,
            currency: ((priceRange as any)?.currency as string) || 'USD'
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
