
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FilterState } from '../types';

interface FeaturesFilterProps {
  features: FilterState['features'];
  onFeatureToggle: (feature: keyof FilterState['features']) => void;
}

export const FeaturesFilter = ({ features, onFeatureToggle }: FeaturesFilterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>
      <div className="space-y-4">
        {Object.entries(features).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={key} className="capitalize text-white">
              {key.replace(/_/g, ' ')}
            </Label>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={() => onFeatureToggle(key as keyof FilterState['features'])}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
