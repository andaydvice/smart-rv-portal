
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
  
  // Force map markers to be visible with multiple strategies
  useEffect(() => {
    console.log("StorageFacilitiesMap: Running visibility enforcement");
    
    // Set a flag on body to indicate we're loading markers
    document.body.setAttribute('data-markers-loading', 'true');
    
    // Approach 1: Run the standalone force function
    forceMapMarkersVisible();
    
    // Approach 2: Direct DOM manipulation at regular intervals
    const forceInterval = setInterval(() => {
      const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
      console.log(`Found ${markers.length} markers - forcing visible`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          // Use style.cssText to make sure !important is included
          marker.style.cssText += `
            visibility: visible !important;
            display: block !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            pointer-events: auto !important;
            position: absolute !important;
          `;
          
          // Add data attribute for debugging
          marker.setAttribute('data-forced-visible', 'true');
        }
      });
    }, 1000);
    
    // Approach 3: Use a mutation observer to catch any newly added markers
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (node.classList.contains('mapboxgl-marker') || 
                  node.classList.contains('custom-marker')) {
                console.log('Mutation observer caught new marker - forcing visible');
                node.style.cssText += `
                  visibility: visible !important;
                  display: block !important;
                  opacity: 1 !important;
                  z-index: 9999 !important;
                  pointer-events: auto !important;
                  position: absolute !important;
                `;
              }
            }
          });
        }
      });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
    
    // Remove the loading flag after a delay
    setTimeout(() => {
      document.body.removeAttribute('data-markers-loading');
    }, 5000);
    
    return () => {
      clearInterval(forceInterval);
      observer.disconnect();
      document.body.removeAttribute('data-markers-loading');
    };
  }, []);
  
  // Simplified effect to show only critical information
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
    console.log(`Marker clicked: ${facilityId}`);
    handleFacilityClick(facilityId, displayFacilities);
  }, [handleFacilityClick, displayFacilities]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[800px]">
      {/* Sidebar */}
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
      
      {/* Map section */}
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
