
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  const { facilities: allFacilities, isLoading, error, maxPrice } = useStorageFacilities(filters);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { mapToken, mapTokenError } = useMapToken();
  
  // State-specific counts for debugging
  useEffect(() => {
    if (allFacilities && allFacilities.length > 0) {
      const stateMap = new Map<string, number>();
      
      allFacilities.forEach(facility => {
        if (facility.state) {
          stateMap.set(facility.state, (stateMap.get(facility.state) || 0) + 1);
        }
      });
      
      console.log('Facility counts by state:');
      Array.from(stateMap.entries()).sort(([a], [b]) => a.localeCompare(b)).forEach(([state, count]) => {
        console.log(`${state}: ${count} facilities`);
      });
      
      // Also log facility IDs for states with few facilities for easy verification
      ['Arizona', 'Nevada', 'Oregon'].forEach(state => {
        if (stateMap.has(state) && stateMap.get(state)! < 5) {
          const stateIds = allFacilities
            .filter(f => f.state === state)
            .map(f => f.id);
          console.log(`${state} facility IDs:`, stateIds);
        }
      });
    }
  }, [allFacilities]);
  
  const { 
    highlightedFacility, 
    scrollAreaRef, 
    handleFacilityClick 
  } = useFacilitySelection({ 
    addToRecentlyViewed 
  });
  
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
  }, []);
  
  // Clear highlight when state filter changes
  useEffect(() => {
    if (filters.selectedState) {
      const facilityInState = allFacilities?.find(f => 
        f.id === highlightedFacility && f.state === filters.selectedState
      );
      
      if (!facilityInState) {
        // Reset highlighted facility if it's not in the currently selected state
        handleFacilityClick(null, allFacilities || []);
      }
    }
  }, [filters.selectedState, highlightedFacility, allFacilities, handleFacilityClick]);
  
  const onMarkerClick = useCallback((facilityId: string) => {
    console.log(`Marker clicked: ${facilityId}`);
    handleFacilityClick(facilityId, allFacilities || []);
  }, [handleFacilityClick, allFacilities]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[800px]">
      <div className="lg:col-span-4">
        <div className="space-y-4">
          <FilterPanel onFilterChange={handleFilterChange} />
          <Card className="bg-[#080F1F] border-gray-700">
            <LoadingStateDisplay
              isLoading={isLoading}
              error={error}
              hasResults={!!(allFacilities && allFacilities.length > 0)}
            />
            
            {allFacilities && allFacilities.length > 0 && (
              <FacilityList
                facilities={allFacilities}
                highlightedFacility={highlightedFacility}
                onFacilityClick={onMarkerClick}
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
              facilities={allFacilities || []}
              highlightedFacility={highlightedFacility}
              onMarkerClick={onMarkerClick}
              selectedState={filters.selectedState}
            />
          )}
        </Card>
        <RecentlyViewedFacilities 
          facilities={recentlyViewed}
          onFacilityClick={onMarkerClick}
          className="h-[180px]"
        />
      </div>
    </div>
  );
};

export default StorageFacilitiesMap;
