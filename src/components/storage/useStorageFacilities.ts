
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState, DatabaseStorageFacility } from './types';

// State name normalization mapping
const stateNormalization: { [key: string]: string } = {
  'TX': 'Texas',
  'Texas': 'Texas',
  'FL': 'Florida',
  'Florida': 'Florida',
  'AZ': 'Arizona',
  'Arizona': 'Arizona'
};

export const useStorageFacilities = (filters: FilterState) => {
  // Query for max price from the view
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
        return 1000; // fallback value
      }
      
      const priceRange = data?.price_range as { min: number; max: number; currency: string } | null;
      return priceRange?.max || 1000;
    }
  });

  // Main facilities query
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters],
    queryFn: async () => {
      console.log('Fetching facilities with filters:', filters);
      
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
      const activeFeatures = Object.entries(filters.features)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);

      if (activeFeatures.length > 0) {
        // Apply each feature filter as an AND condition
        activeFeatures.forEach(feature => {
          query = query.eq(`features->>${feature}`, 'true');
        });
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

      if (!data) return [];

      // Debug log to check data quality
      console.log('Filtered facilities:', data);
      console.log('Active features:', activeFeatures);

      return data.map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: stateNormalization[facility.state] || facility.state,
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

