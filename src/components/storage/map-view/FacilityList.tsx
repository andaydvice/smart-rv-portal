
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StorageFacility } from '../types';
import FacilityCard from '../FacilityCard';

interface FacilityListProps {
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onFacilityClick: (facilityId: string) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  renderFacilityAction?: (facilityId: string) => React.ReactNode;
}

const FacilityList: React.FC<FacilityListProps> = ({
  facilities,
  highlightedFacility,
  onFacilityClick,
  scrollAreaRef,
  renderFacilityAction
}) => {
  // Create a ref object for each facility card
  const facilityRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <ScrollArea className="h-[600px] w-full" ref={scrollAreaRef}>
      <div className="p-4 space-y-4">
        {facilities.map(facility => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            isHighlighted={facility.id === highlightedFacility}
            onClick={() => onFacilityClick(facility.id)}
            ref={(el) => {
              facilityRefs.current[facility.id] = el;
            }}
            actionContent={renderFacilityAction ? renderFacilityAction(facility.id) : undefined}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default FacilityList;
