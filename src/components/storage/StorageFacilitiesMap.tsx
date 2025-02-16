"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import FilterPanel, { FilterState } from './FilterPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import FacilityCard from './FacilityCard';
import MapView from './MapView';
import { useStorageFacilities } from './useStorageFacilities';

const StorageFacilitiesMap = () => {
  const [mapToken, setMapToken] = useState<string>('');
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000]
  });

  const { facilities: filteredFacilities } = useStorageFacilities(filters);

  const handleFacilityClick = (facilityId: string) => {
    setHighlightedFacility(facilityId);
    const facility = filteredFacilities?.find(f => f.id === facilityId);
    if (facility) {
      // Find the marker and trigger its popup
      // The actual marker handling is now in MapView
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-3">
        <div className="space-y-4">
          <FilterPanel onFilterChange={setFilters} />
          <Card className="bg-[#080F1F] border-gray-700">
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-4">
                {filteredFacilities?.map(facility => (
                  <FacilityCard
                    key={facility.id}
                    facility={facility}
                    isHighlighted={facility.id === highlightedFacility}
                    onClick={() => handleFacilityClick(facility.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
      <Card className="lg:col-span-9 h-[600px] bg-[#080F1F] relative overflow-hidden">
        {!mapToken && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#080F1F]/80 backdrop-blur-sm z-10">
            <input
              type="text"
              placeholder="Enter your Mapbox public token"
              className="w-96 px-4 py-2 rounded border border-gray-600 bg-[#131a2a] text-white"
              onChange={(e) => setMapToken(e.target.value)}
            />
          </div>
        )}
        <MapView
          mapToken={mapToken}
          facilities={filteredFacilities || []}
          highlightedFacility={highlightedFacility}
          onMarkerClick={handleFacilityClick}
        />
      </Card>
    </div>
  );
};

export default StorageFacilitiesMap;
