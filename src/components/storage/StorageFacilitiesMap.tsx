
"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import FilterPanel, { FilterState } from './FilterPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import FacilityCard from './FacilityCard';
import MapView from './MapView';
import { useStorageFacilities } from './useStorageFacilities';
import { AlertCircle, Loader2, Search } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StorageFacilitiesMap = () => {
  const [mapToken, setMapToken] = useState<string>('');
  const [mapTokenError, setMapTokenError] = useState<string>('');
  const [highlightedFacility, setHighlightedFacility] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000],
    selectedState: null
  });

  const { facilities: filteredFacilities, isLoading, error } = useStorageFacilities(filters);

  useEffect(() => {
    if (mapToken && !mapToken.startsWith('pk.')) {
      setMapTokenError('Invalid Mapbox token. Token should start with "pk."');
    } else {
      setMapTokenError('');
    }
  }, [mapToken]);

  const handleFacilityClick = (facilityId: string) => {
    setHighlightedFacility(facilityId);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-[600px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-400">Loading storage facilities...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading storage facilities. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (filteredFacilities?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[600px] text-center p-4">
          <Search className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">No Storage Facilities Found</h3>
          <p className="text-gray-400 max-w-md">
            Try adjusting your filters or price range to see more results.
          </p>
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-3">
        <div className="space-y-4">
          <FilterPanel onFilterChange={setFilters} />
          <Card className="bg-[#080F1F] border-gray-700">
            {renderContent()}
          </Card>
        </div>
      </div>
      <Card className="lg:col-span-9 h-[600px] bg-[#080F1F] relative overflow-hidden">
        {!mapToken && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080F1F]/80 backdrop-blur-sm z-10 p-4">
            <div className="w-full max-w-md space-y-4">
              <input
                type="text"
                placeholder="Enter your Mapbox public token"
                className="w-full px-4 py-2 rounded border border-gray-600 bg-[#131a2a] text-white"
                onChange={(e) => setMapToken(e.target.value)}
              />
              {mapTokenError && (
                <Alert variant="destructive" className="bg-red-900/50 border-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{mapTokenError}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        )}
        <MapView
          mapToken={mapTokenError ? '' : mapToken}
          facilities={filteredFacilities || []}
          highlightedFacility={highlightedFacility}
          onMarkerClick={handleFacilityClick}
          selectedState={filters.selectedState}
        />
      </Card>
    </div>
  );
};

export default StorageFacilitiesMap;
