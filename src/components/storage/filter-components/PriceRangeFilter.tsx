
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
  maxPrice?: number;
}

export const PriceRangeFilter = ({ priceRange, onPriceChange, maxPrice = 1000 }: PriceRangeFilterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>
      <div className="px-2">
        <Slider
          defaultValue={[0, maxPrice]}
          max={maxPrice}
          step={Math.max(50, Math.floor(maxPrice / 20))} // Dynamic step size
          value={priceRange}
          onValueChange={onPriceChange}
          className="my-6"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};
