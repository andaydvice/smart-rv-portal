
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Facility } from '../types';
import FacilityCard from '../FacilityCard';

interface FacilityListProps {
  facilities: Facility[];
  highlightedFacility: string | null;
  onFacilityClick: (id: string) => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  hideBadge?: boolean;
}

const FacilityList: React.FC<FacilityListProps> = ({
  facilities,
  highlightedFacility,
  onFacilityClick,
  scrollAreaRef,
  hideBadge = false
}) => {
  return (
    <ScrollArea className="h-[600px] pr-3">
      <div ref={scrollAreaRef} className="space-y-4 p-4">
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            highlighted={facility.id === highlightedFacility}
            onClick={() => onFacilityClick(facility.id)}
            hideBadge={hideBadge}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default FacilityList;
