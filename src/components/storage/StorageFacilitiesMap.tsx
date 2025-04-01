import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import FilterPanel from './FilterPanel';
import { FilterState, StorageFacility } from './types';
import { useStorageFacilities } from './useStorageFacilities';
import { useRecentlyViewed } from './useRecentlyViewed';
import RecentlyViewedFacilities from './RecentlyViewedFacilities';
import LoadingStateDisplay from './map-view/LoadingStateDisplay';
import FacilityList from './map-view/FacilityList';
import { useFacilitySelection } from './map-view/useFacilitySelection';
import { useMapView } from './hooks/useMapView';
import { useFacilityAnalytics } from './hooks/useFacilityAnalytics';
import { useWindowFacilityViewer } from './hooks/useWindowFacilityViewer';
import NavigationHint from './map/components/NavigationHint';
import MapToggleButton from './map/components/MapToggleButton';
import MapViewContainer from './map/components/MapViewContainer';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface StorageFacilitiesMapProps {
  onSelectFeaturedLocation?: (facility: StorageFacility | null) => void;
}

const StorageFacilitiesMap: React.FC<StorageFacilitiesMapProps> = ({ onSelectFeaturedLocation }) => {
  console.log('StorageFacilitiesMap component rendering');
  
  // Debug: Check if QueryClient is available
  try {
    const queryClient = useQueryClient();
    console.log('QueryClient in StorageFacilitiesMap is available:', !!queryClient);
  } catch (error) {
    console.error('QueryClient access error in StorageFacilitiesMap:', error);
  }
  
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

  console.log('About to call useStorageFacilities with filters:', filters);
  const { facilities: allFacilities, isLoading, error, maxPrice } = useStorageFacilities(filters);
  console.log('useStorageFacilities returned:', { 
    facilitiesCount: allFacilities?.length, 
    isLoading, 
    hasError: !!error, 
    maxPrice 
  });

  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { 
    useGoogleMaps, 
    toggleMapView, 
    mapToken, 
    mapTokenError, 
    googleMapsKey 
  } = useMapView();
  
  // Get recently viewed facility IDs for highlighting on the map
  const recentlyViewedIds = recentlyViewed.map(facility => facility.id);
  
  // Use analytics hook
  useFacilityAnalytics(allFacilities);
  
  const { 
    highlightedFacility, 
    scrollAreaRef, 
    handleFacilityClick 
  } = useFacilitySelection({ 
    addToRecentlyViewed 
  });
  
  // Use window facility viewer hook
  useWindowFacilityViewer(highlightedFacility, allFacilities, handleFacilityClick);
  
  // Feature a location when selected
  const handleFeatureLocation = useCallback((facilityId: string) => {
    if (allFacilities && onSelectFeaturedLocation) {
      const facility = allFacilities.find(f => f.id === facilityId);
      if (facility) {
        onSelectFeaturedLocation(facility);
      }
    }
  }, [allFacilities, onSelectFeaturedLocation]);
  
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    console.log('Filter changed:', newFilters);
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
  }, []);
  
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
                renderFacilityAction={(facilityId) => (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 bg-[#131a2a] text-[#5B9BD5] hover:bg-[#1d2739] border-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFeatureLocation(facilityId);
                    }}
                    title="Set as featured location"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                )}
              />
            )}
          </Card>
        </div>
      </div>
      
      <div className="lg:col-span-8 flex flex-col space-y-4">
        {/* Navigation hint and map toggle button */}
        <div className="flex justify-between items-center">
          <NavigationHint />
          <MapToggleButton 
            useGoogleMaps={useGoogleMaps} 
            toggleMapView={toggleMapView} 
          />
        </div>
        
        {/* Map view container */}
        <MapViewContainer 
          useGoogleMaps={useGoogleMaps}
          facilities={allFacilities || []}
          recentlyViewedIds={recentlyViewedIds}
          onMarkerClick={onMarkerClick}
          highlightedFacility={highlightedFacility}
          googleMapsKey={googleMapsKey}
          mapToken={mapToken}
          mapTokenError={mapTokenError}
          selectedState={filters.selectedState}
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
