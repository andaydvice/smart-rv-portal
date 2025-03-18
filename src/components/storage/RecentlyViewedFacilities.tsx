
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Facility } from './types';
import FacilityCard from './FacilityCard';
import { History } from 'lucide-react';

interface RecentlyViewedFacilitiesProps {
  facilities: Facility[];
  onFacilityClick: (facilityId: string) => void;
  className?: string;
  hideBadge?: boolean;
}

const RecentlyViewedFacilities: React.FC<RecentlyViewedFacilitiesProps> = ({ 
  facilities, 
  onFacilityClick,
  className = "",
  hideBadge = false
}) => {
  if (facilities.length === 0) return null;
  
  return (
    <Card className={`bg-[#080F1F] border-gray-700 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <History className="h-5 w-5 text-[#5B9BD5]" />
          <span>Recently Viewed</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {facilities.map(facility => (
              <div key={facility.id} className="min-w-[280px] max-w-[280px]">
                <FacilityCard 
                  facility={facility} 
                  compact={true} 
                  onClick={() => onFacilityClick(facility.id)}
                  hideBadge={hideBadge}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentlyViewedFacilities;
