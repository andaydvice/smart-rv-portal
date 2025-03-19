import React, { useState, useEffect, useCallback } from 'react';
import { toast } from "sonner";
import { Card } from '@/components/ui/card';
import FilterPanel from './FilterPanel';
import { FilterState } from './types';
import { useStorageFacilities } from './useStorageFacilities';
import { useRecentlyViewed } from './useRecentlyViewed';
import { useMapToken } from './map-view/useMapToken';
import { useFacilitySelection } from './map-view/useFacilitySelection';
import LoadingStateDisplay from './map-view/LoadingStateDisplay';
import FacilityList from './map-view/FacilityList';
import RecentlyViewedFacilities from './RecentlyViewedFacilities';
import MapNavigationHint from './map-controls/MapNavigationHint';
import MapViewToggle from './map-controls/MapViewToggle';
import MapDisplayArea from './map-display/MapDisplayArea';
import { useGoogleMapsKey } from './hooks/useGoogleMapsKey';
import '../styles/location-filter.css';
import '../styles/google-maps.css'; // Add Google Maps specific styles

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

  // State to toggle between map views
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean>(false);
  const [showFilteredLocations, setShowFilteredLocations] = useState<boolean>(false);

  const { facilities: allFacilities, isLoading, error, maxPrice } = useStorageFacilities(filters);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { mapToken, mapTokenError } = useMapToken();
  const { apiKey: googleMapsKey, error: googleMapsError } = useGoogleMapsKey();
  
  // Get recently viewed facility IDs for highlighting on the map
  const recentlyViewedIds = recentlyViewed.map(facility => facility.id);
  
  // Log state-specific counts for debugging
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
    console.log('Filter changed:', newFilters);
    
    // Save current filter state to compare later
    const currentState = filters.selectedState;
    const newState = newFilters.selectedState;
    
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
    
    // Show a notification for state changes to help users understand what's happening
    if (currentState !== newState) {
      if (newState) {
        toast.info(`Showing facilities in ${newState}`);
      } else {
        toast.info('Showing facilities in all states');
      }
      
      // If switching to Google Maps when changing state, alert user about marker visibility
      if (useGoogleMaps) {
        setTimeout(() => {
          toast.info('Refreshing map markers...', { duration: 2000 });
        }, 500);
      }
    }
  }, [filters.selectedState, useGoogleMaps]);
  
  // Reset highlight when filter changes
  useEffect(() => {
    if (filters.selectedState) {
      const facilityInState = allFacilities?.find(f => 
        f.id === highlightedFacility && f.state === filters.selectedState
      );
      
      if (!facilityInState) {
        handleFacilityClick(null, allFacilities || []);
      }
    }
  }, [filters.selectedState, highlightedFacility, allFacilities, handleFacilityClick]);
  
  const onMarkerClick = useCallback((facilityId: string) => {
    console.log(`Marker clicked: ${facilityId}`);
    handleFacilityClick(facilityId, allFacilities || []);
  }, [handleFacilityClick, allFacilities]);

  // Toggle map view
  const toggleMapView = () => {
    if (showFilteredLocations) {
      setShowFilteredLocations(false);
      return;
    }
    
    setUseGoogleMaps(prev => !prev);
    toast.info(`Switched to ${!useGoogleMaps ? 'Google Maps' : 'Mapbox'} view`);
    
    // Force reload markers if switching to Google Maps
    if (!useGoogleMaps) {
      setTimeout(() => {
        // This delay gives the component time to update before showing toast
        toast.info('Loading map markers...', { duration: 2000 });
      }, 100);
    }
  };

  // Toggle filtered location demo
  const toggleFilteredLocations = () => {
    setShowFilteredLocations(prev => !prev);
    if (!showFilteredLocations) {
      setUseGoogleMaps(false);
    }
    toast.info(showFilteredLocations ? 'Switched to standard view' : 'Viewing filtered locations demo');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[800px] map-content-wrapper">
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
        {/* Navigation hint and map toggle buttons */}
        <div className="flex justify-between items-center">
          <MapNavigationHint />
          <MapViewToggle 
            showFilteredLocations={showFilteredLocations}
            useGoogleMaps={useGoogleMaps}
            onToggleFilteredLocations={toggleFilteredLocations}
            onToggleMapView={toggleMapView}
          />
        </div>
        
        {/* Map view based on toggle state */}
        <MapDisplayArea 
          showFilteredLocations={showFilteredLocations}
          useGoogleMaps={useGoogleMaps}
          allFacilities={allFacilities}
          recentlyViewedIds={recentlyViewedIds}
          onMarkerClick={onMarkerClick}
          googleMapsKey={googleMapsKey}
          mapToken={mapToken}
          mapTokenError={mapTokenError}
          highlightedFacility={highlightedFacility}
          filters={filters}
        />
        
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
