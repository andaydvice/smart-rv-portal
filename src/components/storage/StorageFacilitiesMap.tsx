
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import FilterPanel from './FilterPanel';
import { FilterState } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useStorageFacilities } from './useStorageFacilities';
import { useRecentlyViewed } from './useRecentlyViewed';
import MapView from './MapView';
import GoogleMapFacilitiesView from './GoogleMapFacilitiesView';
import RecentlyViewedFacilities from './RecentlyViewedFacilities';
import LoadingStateDisplay from './map-view/LoadingStateDisplay';
import FacilityList from './map-view/FacilityList';
import { useMapToken } from './map-view/useMapToken';
import { useFacilitySelection } from './map-view/useFacilitySelection';
import { toast } from "sonner";

// Create a helper hook to get Google Maps API key - hardcoded for reliability
const useGoogleMapsKey = () => {
  const [apiKey, setApiKey] = useState<string>('AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o');
  const [error, setError] = useState<string | null>(null);

  return { apiKey, error };
};

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

  const { facilities: allFacilities, isLoading, error, maxPrice } = useStorageFacilities(filters);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { mapToken, mapTokenError } = useMapToken();
  const { apiKey: googleMapsKey, error: googleMapsError } = useGoogleMapsKey();
  
  // Get recently viewed facility IDs for highlighting on the map
  const recentlyViewedIds = recentlyViewed.map(facility => facility.id);
  
  // Ensure window state for integration with map scripts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.isStorageFacilitiesPage = true;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.isStorageFacilitiesPage = false;
      }
    };
  }, []);
  
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

  // Toggle map view
  const toggleMapView = () => {
    setUseGoogleMaps(prev => !prev);
    toast.info(`Switched to ${!useGoogleMaps ? 'Google Maps' : 'Mapbox'} view`);
  };

  // Function to help view a facility when needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.viewFacility = (id: string) => {
        handleFacilityClick(id, allFacilities || []);
      };
      window.highlightedFacilityId = highlightedFacility;
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.viewFacility = undefined;
        window.highlightedFacilityId = null;
      }
    };
  }, [handleFacilityClick, allFacilities, highlightedFacility]);

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
        {/* Map toggle button - removed navigation hint */}
        <div className="flex justify-end items-center">
          <button 
            onClick={toggleMapView} 
            className="bg-[#151A22] hover:bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>{useGoogleMaps ? 'Switch to Mapbox' : 'Switch to Google Maps'}</span>
          </button>
        </div>
        
        {/* Display count badge showing number of facilities displayed */}
        <div className="absolute top-4 right-4 z-10 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          {allFacilities?.length || 0} facilities
        </div>
        
        {/* Map view based on toggle state */}
        {useGoogleMaps ? (
          <GoogleMapFacilitiesView
            facilities={allFacilities || []}
            recentlyViewedFacilityIds={recentlyViewedIds}
            onMarkerClick={onMarkerClick}
            apiKey={googleMapsKey}
            selectedState={filters.selectedState}
          />
        ) : (
          <Card className="h-[650px] bg-[#080F1F] relative overflow-visible border-gray-700 map-container">
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
        )}
        
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
