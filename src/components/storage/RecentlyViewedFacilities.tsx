
import React from 'react';
import { Card } from '@/components/ui/card';
import { StorageFacility } from './types';
import { Button } from '@/components/ui/button';
import { Eye, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentlyViewedFacilitiesProps {
  facilities: StorageFacility[];
  onFacilityClick: (facilityId: string) => void;
  className?: string;
}

const RecentlyViewedFacilities = ({
  facilities,
  onFacilityClick,
  className
}: RecentlyViewedFacilitiesProps) => {
  // RecentlyViewedFacilities rendering
  
  if (facilities.length === 0) {
    return (
      <Card className={cn("bg-[#080F1F] border-gray-700 p-4", className)}>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-5 w-5 text-[#60A5FA]" />
          <h3 className="text-lg font-semibold text-white">Recently Viewed Facilities</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Facilities you view will appear here for quick access.
        </p>
        <p className="text-xs mt-2 text-gray-500">
          Debug: {facilities ? `Array with ${facilities.length} items` : 'No facilities prop'}
        </p>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-[#080F1F] border-gray-700 p-4", className)}>
      <div className="flex items-center gap-2 mb-3">
        <Eye className="h-5 w-5 text-[#60A5FA]" />
        <h3 className="text-lg font-semibold text-white">Recently Viewed Facilities</h3>
      </div>
      <div className="space-y-2">
        {facilities.map(facility => (
          <div
            key={facility.id}
            className="p-3 rounded-lg bg-[#131a2a] border border-gray-700 hover:border-gray-500 cursor-pointer transition-colors duration-200"
            onClick={() => onFacilityClick(facility.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-base truncate">{facility.name}</h4>
                <div className="flex items-center gap-1 text-gray-400 mt-1">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm truncate">{facility.city}, {facility.state}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-[#60A5FA] hover:text-blue-300 hover:bg-blue-900/20 transition-colors flex-shrink-0 ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onFacilityClick(facility.id);
                }}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentlyViewedFacilities;
