
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronRight } from 'lucide-react';
import { Facility } from './types';
import FacilityHeader from './facility-card/FacilityHeader';
import FacilityFeatures from './facility-card/FacilityFeatures';
import PriceRange from './facility-card/PriceRange';
import ContactInfo from './facility-card/ContactInfo';
import VerifiedBadge from './facility-card/VerifiedBadge';

interface FacilityCardProps {
  facility: Facility;
  highlighted?: boolean;
  onClick?: () => void;
  compact?: boolean;
  hideBadge?: boolean;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ 
  facility, 
  highlighted = false, 
  onClick,
  compact = false,
  hideBadge = false
}) => {
  return (
    <Card 
      className={`
        border-gray-700 cursor-pointer transition-all duration-200 overflow-hidden
        ${highlighted ? 'bg-[#131a2a] ring-2 ring-[#5B9BD5] shadow-lg' : 'bg-[#080F1F] hover:bg-[#131a2a]'}
        ${compact ? 'p-2' : 'p-4'}
      `}
      onClick={onClick}
    >
      <CardContent className={compact ? 'p-0' : 'p-0 pb-2'}>
        <div className="flex justify-between items-start mb-2">
          <FacilityHeader 
            name={facility.name} 
            address={{
              city: facility.city || '',
              state: facility.state || '',
              street: facility.street || '',
              zip: facility.zip || ''
            }}
            compact={compact}
          />
          
          {!hideBadge && facility.is_verified && <VerifiedBadge />}
        </div>
        
        {/* Rating */}
        {facility.rating && (
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < facility.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} 
              />
            ))}
            <span className="text-white ml-2 text-sm">{facility.rating.toFixed(1)}</span>
          </div>
        )}
        
        {!compact && (
          <>
            <PriceRange minPrice={facility.min_price} maxPrice={facility.max_price} />
            <FacilityFeatures features={facility.features || {}} />
            <ContactInfo phone={facility.phone} website={facility.website} />
          </>
        )}
        
        {compact && (
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-300 truncate max-w-[200px]">
              {facility.features && Object.keys(facility.features).filter(key => facility.features![key]).length} amenities
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FacilityCard;
