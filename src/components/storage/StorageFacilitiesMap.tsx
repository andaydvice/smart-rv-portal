
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
import FilteredLocationMapDemo from './map/components/FilteredLocationMapDemo';
import '../styles/location-filter.css';

// Create a helper hook to get Google Maps API key
const useGoogleMapsKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get API key from environment variables
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (key) {
      setApiKey(key);
    } else {
      setError('Google Maps API key not found in environment variables');
      console.error('Missing VITE_GOOGLE_MAPS_API_KEY environment variable');
    }
  }, []);

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
    if (showFilteredLocations) {
      setShowFilteredLocations(false);
      return;
    }
    
    setUseGoogleMaps(prev => !prev);
    toast.info(`Switched to ${!useGoogleMaps ? 'Google Maps' : 'Mapbox'} view`);
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
          <div className="text-white bg-[#F97316] px-3 py-2 rounded-md text-sm shadow-md border-2 border-white/20 animate-pulse font-medium flex items-center gap-2 max-w-[280px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move shrink-0">
              <polyline points="5 9 2 12 5 15" />
              <polyline points="9 5 12 2 15 5" />
              <polyline points="15 19 12 22 9 19" />
              <polyline points="19 9 22 12 19 15" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="12" y1="2" x2="12" y2="22" />
            </svg>
            <span className="leading-snug">
              If the location details are cut off,<br/>
              move the map with your browser
            </span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleFilteredLocations} 
              className="bg-[#151A22] hover:bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors"
            >
              <span>{showFilteredLocations ? 'Standard View' : 'Filtered Locations Demo'}</span>
            </button>
            {!showFilteredLocations && (
              <button 
                onClick={toggleMapView} 
                className="bg-[#151A22] hover:bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors"
              >
                <span>{useGoogleMaps ? 'Switch to Mapbox' : 'Switch to Google Maps'}</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Map view based on toggle state */}
        {showFilteredLocations ? (
          <FilteredLocationMapDemo />
        ) : useGoogleMaps ? (
          <GoogleMapFacilitiesView
            facilities={allFacilities || []}
            recentlyViewedFacilityIds={recentlyViewedIds}
            onMarkerClick={onMarkerClick}
            apiKey={googleMapsKey}
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
