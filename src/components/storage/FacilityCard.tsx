
import React, { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StorageFacility } from './types';
import FacilityHeader from './facility-card/FacilityHeader';
import FacilityFeatures from './facility-card/FacilityFeatures';
import ContactInfo from './facility-card/ContactInfo';
import PriceRange from './facility-card/PriceRange';

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
            <FacilityHeader facility={facility} className="flex-1" />
            {actionContent}
          </div>
          
          <div className="mt-3 space-y-3">
            <FacilityFeatures features={facility.features} />
            
            <div className="grid gap-2 md:grid-cols-2">
              <PriceRange priceRange={facility.price_range} />
              <ContactInfo 
                phone={facility.contact_phone} 
                email={facility.contact_email}
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
