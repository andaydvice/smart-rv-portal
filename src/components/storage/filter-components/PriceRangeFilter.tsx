
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
}

export const PriceRangeFilter = ({ priceRange, onPriceChange }: PriceRangeFilterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">Price Range</h3>
      <div className="space-y-6">
        <Slider
          defaultValue={priceRange}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={onPriceChange}
        />
        <div className="flex justify-between text-white">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};
