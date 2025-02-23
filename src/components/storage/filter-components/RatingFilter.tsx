
import { Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RatingFilterProps {
  minRating: number | null;
  onRatingChange: (rating: string | null) => void;
}

export const RatingFilter = ({ minRating, onRatingChange }: RatingFilterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
      <Select
        value={minRating?.toString() || "none"}
        onValueChange={onRatingChange}
      >
        <SelectTrigger className="w-full bg-[#080F1F] border-gray-700">
          <SelectValue placeholder="Any rating">
            {minRating ? (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {minRating}+ Stars
              </div>
            ) : (
              "Any rating"
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
          <SelectItem 
            value="none"
            className="text-white focus:bg-[#2a2f3e] focus:text-white"
          >
            Any rating
          </SelectItem>
          {[4, 3, 2, 1].map((rating) => (
            <SelectItem 
              key={rating} 
              value={rating.toString()}
              className="text-white focus:bg-[#2a2f3e] focus:text-white"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {rating}+ Stars
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
