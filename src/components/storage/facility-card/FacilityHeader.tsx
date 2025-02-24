
import React from 'react';
import { Building2, MapPin, Check, Star } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

interface FacilityHeaderProps {
  name: string;
  address: string;
  city: string;
  state: string;
  verifiedFeatures: boolean;
  verifiedLocation: boolean;
  avgRating?: number;
  reviewCount?: number;
}

export const FacilityHeader: React.FC<FacilityHeaderProps> = ({
  name,
  address,
  city,
  state,
  verifiedFeatures,
  verifiedLocation,
  avgRating,
  reviewCount
}) => {
  const renderRating = () => {
    if (!avgRating) return null;
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < Math.floor(avgRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-400">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>
    );
  };

  return (
    <div>
      <h3 className="font-semibold text-lg text-[#60A5FA] flex items-center gap-2">
        <Building2 className="w-5 h-5" />
        {name}
        {verifiedFeatures && (
          <Check className="w-4 h-4 text-green-500" />
        )}
      </h3>
      <div className="flex items-start gap-2 mt-1 text-gray-300">
        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
        <span className="text-sm">
          {address}, {city}, {state}
          {verifiedLocation && (
            <VerifiedBadge verified={true} />
          )}
        </span>
      </div>
      {renderRating()}
    </div>
  );
};
