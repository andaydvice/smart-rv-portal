
"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import FilterPanel from './FilterPanel';
import { FilterState } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useStorageFacilities } from './useStorageFacilities';
import { useRecentlyViewed } from './useRecentlyViewed';
import MapView from './MapView';
import RecentlyViewedFacilities from './RecentlyViewedFacilities';
import LoadingStateDisplay from './map-view/LoadingStateDisplay';
import FacilityList from './map-view/FacilityList';
import { useMapToken } from './map-view/useMapToken';
import { useFacilitySelection } from './map-view/useFacilitySelection';
import { toast } from "sonner";

const StorageFacilitiesMap = () => {
  const [filters, setFilters] = useState<FilterState>({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000],
    selectedState: null,
    minRating: null
  });

  const { facilities: filteredFacilities, isLoading, error } = useStorageFacilities(filters);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { mapToken, mapTokenError } = useMapToken();
  
  const { 
    highlightedFacility, 
    scrollAreaRef, 
    handleFacilityClick 
  } = useFacilitySelection({ 
    addToRecentlyViewed 
  });
  
  // Log when facilities are loaded to help with debugging
  useEffect(() => {
    if (filteredFacilities?.length) {
      console.log(`Loaded ${filteredFacilities.length} storage facilities`);
      toast.success(`Loaded ${filteredFacilities.length} storage facilities`);
    }
  }, [filteredFacilities?.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[800px]">
      <div className="lg:col-span-4">
        <div className="space-y-4">
          <FilterPanel onFilterChange={setFilters} />
          <Card className="bg-[#080F1F] border-gray-700">
            <LoadingStateDisplay
              isLoading={isLoading}
              error={error}
              hasResults={!!filteredFacilities?.length}
            />
            
            {filteredFacilities && filteredFacilities.length > 0 && (
              <FacilityList
                facilities={filteredFacilities}
                highlightedFacility={highlightedFacility}
                onFacilityClick={(facilityId) => handleFacilityClick(facilityId, filteredFacilities)}
                scrollAreaRef={scrollAreaRef}
              />
            )}
          </Card>
        </div>
      </div>
      <div className="lg:col-span-8 flex flex-col space-y-4">
        <Card className="h-[600px] bg-[#080F1F] relative overflow-hidden border-gray-700">
          {(!mapToken) ? (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {mapTokenError || 'Map configuration not loaded'}
              </AlertDescription>
            </Alert>
          ) : (
            <MapView
              mapToken={mapToken}
              facilities={filteredFacilities || []}
              highlightedFacility={highlightedFacility}
              onMarkerClick={(facilityId) => handleFacilityClick(facilityId, filteredFacilities)}
              selectedState={filters.selectedState}
            />
          )}
        </Card>
        <RecentlyViewedFacilities 
          facilities={recentlyViewed}
          onFacilityClick={(facilityId) => handleFacilityClick(facilityId, filteredFacilities)}
          className="h-[180px]"
        />
      </div>
    </div>
  );
};

export default StorageFacilitiesMap;
