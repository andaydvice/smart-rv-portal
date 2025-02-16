
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState } from './types';

export const useStorageFacilities = (filters: FilterState) => {
  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters.selectedState, filters.features],
    queryFn: async () => {
      console.log('Fetching facilities with filters:', filters);
      
      let query = supabase
        .from('storage_facilities')
        .select('*');
      
      if (filters.selectedState) {
        query = query.eq('state', filters.selectedState);
      }

      // Build features filter condition
      const activeFeatures = Object.entries(filters.features)
        .filter(([_, enabled]) => enabled)
        .map(([feature]) => `features->'${feature}' = 'true'`);

      if (activeFeatures.length > 0) {
        query = query.or(activeFeatures.join(','));
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching facilities:', error);
        throw error;
      }

      console.log('Fetched facilities:', data);
      
      return data.map(facility => ({
        id: facility.id,
        name: facility.name,
        address: facility.address,
        city: facility.city,
        state: facility.state,
        latitude: Number(facility.latitude),
        longitude: Number(facility.longitude),
        features: {
          indoor: (facility.features as any)?.indoor ?? false,
          climate_controlled: (facility.features as any)?.climate_controlled ?? false,
          "24h_access": (facility.features as any)?.["24h_access"] ?? false,
          security_system: (facility.features as any)?.security_system ?? false,
          vehicle_washing: (facility.features as any)?.vehicle_washing ?? false
        },
        price_range: {
          min: (facility.price_range as any)?.min ?? 0,
          max: (facility.price_range as any)?.max ?? 0,
          currency: (facility.price_range as any)?.currency ?? 'USD'
        },
        contact_phone: facility.contact_phone,
        contact_email: facility.contact_email
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
    error
  };
};
