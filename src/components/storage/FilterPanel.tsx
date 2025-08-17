
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterState } from './types';
import { supabase } from '@/integrations/supabase/client';
import { LocationFilter } from './filter-components/LocationFilter';
import { FeaturesFilter } from './filter-components/FeaturesFilter';
import { PriceRangeFilter } from './filter-components/PriceRangeFilter';
import { RatingFilter } from './filter-components/RatingFilter';

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

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000],
    selectedState: null,
    minRating: null
  });

  const [states, setStates] = useState<{ state: string, count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      // Fetch all storage facilities and count by state
      const { data, error } = await supabase
        .from('storage_facilities')
        .select('state');

      if (!error && data) {
        // Count occurrences of each state using normalized state names
        const stateCounts: Record<string, number> = {};
        data.forEach(item => {
          if (!item.state) return;
          
          // Normalize the state name
          const normalizedState = normalizeStateName(item.state);
          
          // Add to counts with the normalized name
          stateCounts[normalizedState] = (stateCounts[normalizedState] || 0) + 1;
        });
        
        // Convert to array format and sort alphabetically
        const statesArray = Object.entries(stateCounts).map(([state, count]) => ({
          state,
          count
        })).sort((a, b) => a.state.localeCompare(b.state));
        
        setStates(statesArray);
      }
      setLoading(false);
    };

    fetchStates();
  }, []);

  const handleFeatureToggle = (feature: keyof FilterState['features']) => {
    const newFeatures = {
      ...filters.features,
      [feature]: !filters.features[feature]
    };
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: value as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStateChange = (state: string | null) => {
    const newFilters = { ...filters, selectedState: state };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: string | null) => {
    const newFilters = { ...filters, minRating: rating ? Number(rating) : null };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters: FilterState = {
      features: {
        indoor: false,
        climate_controlled: false,
        "24h_access": false,
        security_system: false,
        vehicle_washing: false
      },
      priceRange: [0, 1000],
      selectedState: null,
      minRating: null
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card className="p-4 bg-[#131a2a] border-gray-800">
      <div className="space-y-6 text-white">
        <LocationFilter
          selectedState={filters.selectedState}
          states={states}
          onStateChange={handleStateChange}
        />
        <FeaturesFilter
          features={filters.features}
          onFeatureToggle={handleFeatureToggle}
        />
        <PriceRangeFilter
          priceRange={filters.priceRange}
          onPriceChange={handlePriceChange}
        />
        <RatingFilter
          minRating={filters.minRating}
          onRatingChange={handleRatingChange}
        />
        <Button 
          variant="outline" 
          className="w-full text-black border-gray-600 hover:bg-gray-700 hover:text-white" 
          onClick={handleReset}
          id="filter-panel-reset-button"
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
};

export default FilterPanel;
