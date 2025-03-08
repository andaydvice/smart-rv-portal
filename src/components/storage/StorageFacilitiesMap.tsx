
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
import { forceMapMarkersVisible } from '@/utils/forceMapMarkers';

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

  // Get data with useQuery
  const { facilities: filteredFacilities, isLoading, error, maxPrice } = useStorageFacilities(filters);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { mapToken, mapTokenError } = useMapToken();
  
  // Memoize facilities to prevent unnecessary re-renders
  const displayFacilities = useMemo(() => filteredFacilities || [], [filteredFacilities]);
  
  // Memoize handlers to prevent unnecessary re-renders
  const { 
    highlightedFacility, 
    scrollAreaRef, 
    handleFacilityClick 
  } = useFacilitySelection({ 
    addToRecentlyViewed 
  });
  
  // Optimize filter change handler 
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(prevFilters => {
      // Only update if actually changed
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
  }, []);
  
  // Force map markers to be visible
  useEffect(() => {
    // Add a direct approach to force marker visibility
    const forceInterval = setInterval(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
        }
      });
    }, 1000);
    
    // Run the standalone force function as well
    forceMapMarkersVisible();
    
    return () => {
      clearInterval(forceInterval);
    };
  }, []);
  
  // Simplified effect to reduce re-renders and only show critical information
  useEffect(() => {
    // Only show success message if loaded a significant number of facilities
    if (filteredFacilities?.length > 10 && !isLoading) {
      toast.success(`Loaded ${filteredFacilities.length} storage facilities`);
    } else if (filteredFacilities && filteredFacilities.length === 0 && !isLoading) {
      toast.info('No facilities found for the current filters');
    }
  }, [filteredFacilities, isLoading]);

  // Only show actual errors
  useEffect(() => {
    if (error) {
      console.error('Error loading facilities:', error);
      toast.error(`Error loading facilities: ${error.message}`);
    }
  }, [error]);

  // Create a memoized click handler
  const onMarkerClick = useCallback((facilityId: string) => {
    handleFacilityClick(facilityId, displayFacilities);
  }, [handleFacilityClick, displayFacilities]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[800px]">
      <div className="lg:col-span-4">
        <div className="space-y-4">
          <FilterPanel onFilterChange={handleFilterChange} />
          <Card className="bg-[#080F1F] border-gray-700">
            <LoadingStateDisplay
              isLoading={isLoading}
              error={error}
              hasResults={!!displayFacilities.length}
            />
            
            {displayFacilities.length > 0 && (
              <FacilityList
                facilities={displayFacilities}
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
              facilities={displayFacilities}
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
