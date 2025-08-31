
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StorageFacility, FilterState, DatabaseStorageFacility } from './types';
import { fallbackStorageFacilities, fallbackPriceRange } from '@/data/fallbackFacilities';

interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

// Helper function to normalize state names consistently
const normalizeStateName = (stateAbbr: string): string => {
  return stateAbbr === 'AZ' ? 'Arizona' : 
         stateAbbr === 'CA' ? 'California' : 
         stateAbbr === 'CO' ? 'Colorado' :
         stateAbbr === 'TX' ? 'Texas' :
         stateAbbr === 'FL' ? 'Florida' :
         stateAbbr === 'NV' ? 'Nevada' :
         stateAbbr === 'GA' ? 'Georgia' :
         stateAbbr === 'IA' ? 'Iowa' :
         stateAbbr === 'MN' ? 'Minnesota' :
         stateAbbr === 'WI' ? 'Wisconsin' :
         stateAbbr === 'OR' ? 'Oregon' :
         stateAbbr === 'PA' ? 'Pennsylvania' :
         stateAbbr === 'NY' ? 'New York' :
         stateAbbr === 'OH' ? 'Ohio' :
         stateAbbr === 'IN' ? 'Indiana' :
         stateAbbr;
};

// Get abbreviation from full state name
const getStateAbbreviation = (fullStateName: string): string => {
  if (fullStateName === 'Arizona') return 'AZ';
  if (fullStateName === 'California') return 'CA';
  if (fullStateName === 'Colorado') return 'CO';
  if (fullStateName === 'Texas') return 'TX';
  if (fullStateName === 'Florida') return 'FL';
  if (fullStateName === 'Nevada') return 'NV';
  if (fullStateName === 'Georgia') return 'GA';
  if (fullStateName === 'Iowa') return 'IA';
  if (fullStateName === 'Minnesota') return 'MN';
  if (fullStateName === 'Wisconsin') return 'WI';
  if (fullStateName === 'Oregon') return 'OR';
  if (fullStateName === 'Pennsylvania') return 'PA';
  if (fullStateName === 'New York') return 'NY';
  if (fullStateName === 'Ohio') return 'OH';
  if (fullStateName === 'Indiana') return 'IN';
  return fullStateName;
}

// Convert direct database results to StorageFacility format  
function convertToStorageFacility(facility: any): StorageFacility {
  const normalizedState = normalizeStateName(facility.state);
  
  return {
    id: facility.id,
    name: facility.name,
    address: facility.address,
    city: facility.city,
    state: normalizedState,
    latitude: Number(facility.latitude),
    longitude: Number(facility.longitude),
    features: facility.features || {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    price_range: facility.price_range || { min: 0, max: 0, currency: 'USD' },
    contact_phone: undefined, // Not exposed in public view
    contact_email: undefined, // Not exposed in public view
    avg_rating: facility.avg_rating,
    review_count: facility.review_count,
    verified_fields: {
      features: false,
      price_range: false,
      contact_info: false,
      location: true,
      business_hours: false
    }
  };
}

export const useStorageFacilities = (filters: FilterState) => {
  const { data: maxPriceData } = useQuery({
    queryKey: ['max-facility-price'],
    queryFn: async () => {
      console.log('Fetching max price data...');
      try {
        // Direct query to storage facilities table with SELECT access
        const { data, error } = await supabase
          .from('storage_facilities')
          .select('price_range');
        
        console.log('Max price query result:', { data: data?.length, error });
        
        if (error) {
          console.warn('Failed to fetch max price from Supabase, using fallback:', error);
          return fallbackPriceRange.max;
        }
        
        if (!data || data.length === 0) {
          console.warn('No price data found, using fallback');
          return fallbackPriceRange.max;
        }
        
        // Find max price from the price ranges
        const maxPrice = Math.max(...data.map(f => {
          const priceRange = f.price_range as any;
          return priceRange?.max || 0;
        }));
        return maxPrice || fallbackPriceRange.max;
      } catch (err) {
        console.error('Max price query failed completely, using fallback:', err);
        return fallbackPriceRange.max;
      }
    }
  });

  const { data: facilities, isLoading, error } = useQuery({
    queryKey: ['storage-facilities', filters],
    queryFn: async () => {
      console.log('Fetching storage facilities...');
      
      try {
        // Direct query to storage facilities table
        const { data: allData, error } = await supabase
          .from('storage_facilities') 
          .select(`
            id, name, address, city, state, latitude, longitude,
            features, price_range, avg_rating, review_count
          `);
        
        // Log query params for debugging
        console.log('Query params:', {
          selectedState: filters.selectedState,
          priceRange: filters.priceRange
        });
        
        console.log('Facilities query result:', { 
          dataLength: allData?.length, 
          error: error?.message || error,
          firstFacility: allData?.[0]
        });
        
        if (error) {
          console.warn('Supabase query failed, using fallback data:', error);
          return convertToStorageFacilityArray(fallbackStorageFacilities, filters);
        }
        
        if (!allData || allData.length === 0) {
          console.warn('No data returned from Supabase, using fallback');
          return convertToStorageFacilityArray(fallbackStorageFacilities, filters);
        }

      // Apply state filter if selected
      let filteredData = allData;
      if (filters.selectedState) {
        const stateValues = [];
        
        // Convert full state name to abbreviation, or vice versa
        if (filters.selectedState === 'Arizona' || filters.selectedState === 'AZ') {
          stateValues.push('AZ', 'Arizona');
        } else if (filters.selectedState === 'California' || filters.selectedState === 'CA') {
          stateValues.push('CA', 'California');
        } else if (filters.selectedState === 'Texas' || filters.selectedState === 'TX') {
          stateValues.push('TX', 'Texas');
        } else if (filters.selectedState === 'Florida' || filters.selectedState === 'FL') {
          stateValues.push('FL', 'Florida');
        } else if (filters.selectedState === 'Nevada' || filters.selectedState === 'NV') {
          stateValues.push('NV', 'Nevada');
        } else if (filters.selectedState === 'Georgia' || filters.selectedState === 'GA') {
          stateValues.push('GA', 'Georgia');
        } else if (filters.selectedState === 'Colorado' || filters.selectedState === 'CO') {
          stateValues.push('CO', 'Colorado');
        } else if (filters.selectedState === 'Iowa' || filters.selectedState === 'IA') {
          stateValues.push('IA', 'Iowa');
        } else if (filters.selectedState === 'Minnesota' || filters.selectedState === 'MN') {
          stateValues.push('MN', 'Minnesota');
        } else if (filters.selectedState === 'Wisconsin' || filters.selectedState === 'WI') {
          stateValues.push('WI', 'Wisconsin');
        } else if (filters.selectedState === 'Oregon' || filters.selectedState === 'OR') {
          stateValues.push('OR', 'Oregon');
        } else if (filters.selectedState === 'Pennsylvania' || filters.selectedState === 'PA') {
          stateValues.push('PA', 'Pennsylvania');
        } else if (filters.selectedState === 'New York' || filters.selectedState === 'NY') {
          stateValues.push('NY', 'New York');
        } else if (filters.selectedState === 'Ohio' || filters.selectedState === 'OH') {
          stateValues.push('OH', 'Ohio');
        } else if (filters.selectedState === 'Indiana' || filters.selectedState === 'IN') {
          stateValues.push('IN', 'Indiana');
        } else {
          stateValues.push(filters.selectedState);
        }
        
        filteredData = allData.filter(facility => 
          stateValues.includes(facility.state)
        );
      }

      // Log states returned for debugging
      console.log('Total facilities fetched:', filteredData.length);
      console.log('States returned:', [...new Set(filteredData.map(f => f.state))].sort());
      
        // Map database results to StorageFacility objects
        return filteredData.map(facility => convertToStorageFacility(facility));
      } catch (err) {
        console.error('Complete query failure, using fallback data:', err);
        return convertToStorageFacilityArray(fallbackStorageFacilities, filters);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minute cache
  });

  // Only filter by price range after fetching from database
  const filteredFacilities = facilities?.filter(facility => {
    const facilityMaxPrice = facility.price_range.max;
    
    return facilityMaxPrice >= filters.priceRange[0] && facilityMaxPrice <= filters.priceRange[1];
  });
  
  return {
    facilities: filteredFacilities,
    isLoading,
    error,
    maxPrice: maxPriceData || fallbackPriceRange.max
  };
};

// Helper function to filter emergency data
function convertToStorageFacilityArray(data: StorageFacility[], filters: FilterState): StorageFacility[] {
  let filteredData = [...data];
  
  // Apply state filter if selected
  if (filters.selectedState && filters.selectedState !== 'all') {
    const normalizedFilterState = normalizeStateName(filters.selectedState);
    filteredData = filteredData.filter(facility => 
      normalizeStateName(facility.state) === normalizedFilterState
    );
  }
  
  // Apply price range filter
  if (filters.priceRange) {
    filteredData = filteredData.filter(facility => {
      const facilityMaxPrice = facility.price_range?.max || 0;
      const facilityMinPrice = facility.price_range?.min || 0;
      return facilityMaxPrice >= filters.priceRange[0] && 
             facilityMinPrice <= filters.priceRange[1];
    });
  }
  
  return filteredData;
}
