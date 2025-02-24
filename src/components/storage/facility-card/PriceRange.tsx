
import React from 'react';
import { Check } from 'lucide-react';

interface PriceRangeProps {
  min: number;
  max: number;
  currency: string;
  verified: boolean;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  currency,
  verified
}) => {
  return (
    <div className="flex justify-between items-center py-2 border-y border-gray-700">
      <div>
        <span className="text-sm text-gray-400">Price Range</span>
        <div className="font-semibold text-[#60A5FA] flex items-center gap-2">
          ${min} - ${max}
          {verified && (
            <Check className="w-4 h-4 text-green-500" />
          )}
        </div>
      </div>
    </div>
  );
};
