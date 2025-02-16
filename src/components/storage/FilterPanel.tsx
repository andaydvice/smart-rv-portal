
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  features: {
    indoor: boolean;
    climate_controlled: boolean;
    "24h_access": boolean;
    security_system: boolean;
    vehicle_washing: boolean;
  };
  priceRange: [number, number];
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
    priceRange: [0, 1000]
  });

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

  const handleReset = () => {
    const defaultFilters: FilterState = {
      features: {
        indoor: false,
        climate_controlled: false,
        "24h_access": false,
        security_system: false,
        vehicle_washing: false
      },
      priceRange: [0, 1000]
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card className="p-4 bg-[#131a2a] border-gray-800">
      <div className="space-y-6">
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
