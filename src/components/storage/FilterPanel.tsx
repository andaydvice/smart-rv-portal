
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState } from './types';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Star, X } from 'lucide-react';

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
      const { data, error } = await supabase
        .from('state_bounds')
        .select('state, facility_count')
        .order('state');

      if (!error && data) {
        setStates(data.map(item => ({
          state: item.state,
          count: item.facility_count
        })));
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
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="space-y-2">
            <Select
              value={filters.selectedState || "all"}
              onValueChange={(value) => handleStateChange(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-full bg-[#080F1F] border-gray-700 text-white">
                <SelectValue placeholder="Select a state">
                  {filters.selectedState ? (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {filters.selectedState}
                    </div>
                  ) : (
                    "All States"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent 
                className="z-50 bg-[#1a1f2e] border-gray-700"
                style={{
                  position: 'relative',
                  zIndex: 50
                }}
              >
                <SelectItem value="all" className="text-white focus:bg-[#2a2f3e] focus:text-white">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem 
                    key={state.state} 
                    value={state.state}
                    className="text-white focus:bg-[#2a2f3e] focus:text-white"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{state.state}</span>
                      <span className="text-sm text-gray-400">({state.count})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <div className="space-y-4">
            {Object.entries(filters.features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/_/g, ' ')}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={() => handleFeatureToggle(key as keyof FilterState['features'])}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={50}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex justify-between text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
          <Select
            value={filters.minRating?.toString() || "none"}
            onValueChange={handleRatingChange}
          >
            <SelectTrigger className="w-full bg-[#080F1F] border-gray-700">
              <SelectValue placeholder="Any rating">
                {filters.minRating ? (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {filters.minRating}+ Stars
                  </div>
                ) : (
                  "Any rating"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Any rating</SelectItem>
              {[4, 3, 2, 1].map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {rating}+ Stars
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
};

export default FilterPanel;

