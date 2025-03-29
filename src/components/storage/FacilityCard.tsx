
import React, { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StorageFacility } from './types';
import { FacilityHeader } from './facility-card/FacilityHeader';
import { FacilityFeatures } from './facility-card/FacilityFeatures';
import { ContactInfo } from './facility-card/ContactInfo';
import { PriceRange } from './facility-card/PriceRange';

interface FacilityCardProps {
  facility: StorageFacility;
  isHighlighted: boolean;
  onClick: () => void;
  actionContent?: React.ReactNode;
}

const FacilityCard = forwardRef<HTMLDivElement, FacilityCardProps>(
  ({ facility, isHighlighted, onClick, actionContent }, ref) => {
    return (
      <Card
        ref={ref}
        className={`bg-[#131a2a] border-gray-700 hover:border-gray-500 transition-colors cursor-pointer overflow-hidden ${
          isHighlighted ? 'border-[#5B9BD5] ring-1 ring-[#5B9BD5]' : ''
        }`}
        onClick={onClick}
        style={{ position: 'relative' }}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <FacilityHeader 
              name={facility.name}
              address={facility.address}
              city={facility.city}
              state={facility.state}
              verifiedFeatures={facility.verified_features || false}
              verifiedLocation={facility.verified_location || false}
              avgRating={facility.avg_rating}
              reviewCount={facility.review_count}
            />
            {actionContent}
          </div>
          
          <div className="mt-3 space-y-3">
            <FacilityFeatures features={facility.features} />
            
            <div className="grid gap-2 md:grid-cols-2">
              <PriceRange 
                min={facility.price_range?.min || 0}
                max={facility.price_range?.max || 0}
                currency={facility.price_range?.currency || 'USD'}
                verified={facility.price_range?.verified || false}
              />
              <ContactInfo 
                phone={facility.contact_phone} 
                email={facility.contact_email}
                verifiedContact={facility.verified_contact || false}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

FacilityCard.displayName = 'FacilityCard';

export default FacilityCard;
