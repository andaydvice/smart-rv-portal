
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState } from './types';
import { Json } from '@/integrations/supabase/types';

// State name normalization mapping
const stateNormalization: { [key: string]: string } = {
  'TX': 'Texas',
  'Texas': 'Texas',
  // Add other state abbreviations as needed
};

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
        .from('facility_search')
        .select(`
          id,
          name,
          address,
          city,
          state,
          latitude,
          longitude,
          features,
          min_price,
          max_price,
          currency,
          contact_phone,
          contact_email,
          avg_rating,
          review_count,
          has_indoor,
          has_climate_control,
          has_24h_access,
          has_security,
          has_washing
        `);
      
      if (filters.selectedState) {
        // Handle both state formats
        const stateConditions = [filters.selectedState];
        // Add abbreviated version if we have a full name, or full version if we have abbreviation
        Object.entries(stateNormalization).forEach(([abbr, full]) => {
          if (filters.selectedState === full) stateConditions.push(abbr);
          if (filters.selectedState === abbr) stateConditions.push(full);
        });
        query = query.in('state', stateConditions);
      }

      // Handle feature filters - only apply if true
      const conditions = [];
      if (filters.features.indoor) {
        conditions.push("has_indoor.eq.true");
      }
      if (filters.features.climate_controlled) {
        conditions.push("has_climate_control.eq.true");
      }
      if (filters.features["24h_access"]) {
        conditions.push("has_24h_access.eq.true");
      }
      if (filters.features.security_system) {
        conditions.push("has_security.eq.true");
      }
      if (filters.features.vehicle_washing) {
        conditions.push("has_washing.eq.true");
      }

      // Only apply feature filters if any are selected
      if (conditions.length > 0) {
        query = query.or(conditions.join(","));
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
        // Normalize state in the returned data
        const normalizedState = stateNormalization[facility.state] || facility.state;
        
        return {
          id: facility.id,
          name: facility.name,
          address: facility.address,
          city: facility.city,
          state: normalizedState,
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
            features: false,
            price_range: false,
            contact_info: false,
            location: false,
            business_hours: false
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
