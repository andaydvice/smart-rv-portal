
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
}

export const PriceRangeFilter = ({ priceRange, onPriceChange }: PriceRangeFilterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>
      <div className="px-2">
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={50}
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
