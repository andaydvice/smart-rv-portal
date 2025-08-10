
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
import { Star, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { STATE_NAME_MAP } from '@/utils/stateNameUtils';
import { forceMapMarkersVisible } from '@/utils/forceMapMarkers';

interface StorageFacilitiesMapProps {
  onSelectFeaturedLocation?: (facility: StorageFacility | null) => void;
}

const StorageFacilitiesMap: React.FC<StorageFacilitiesMapProps> = ({ onSelectFeaturedLocation }) => {
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
  const { 
    useGoogleMaps, 
    toggleMapView, 
    mapToken, 
    mapTokenError, 
    googleMapsKey 
  } = useMapView();
  
  // Debug states for marker issues
  const [noMarkersForState, setNoMarkersForState] = useState<string | null>(null);
  const [markersCount, setMarkersCount] = useState<number>(0);
  const [markerCheckCompleted, setMarkerCheckCompleted] = useState<boolean>(false);
  
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
    
    // Log the selected state in various formats for debugging
    if (newFilters.selectedState) {
      const normalizedState = newFilters.selectedState;
      let stateAbbr = STATE_NAME_MAP[normalizedState] || "";
      
      if (stateAbbr.length === 2) {
        // We got an abbreviation, swap it
        stateAbbr = normalizedState;
        const fullState = STATE_NAME_MAP[normalizedState];
        console.log(`Selected state: Full name = ${fullState}, Abbreviation = ${stateAbbr}`);
      } else {
        console.log(`Selected state: Full name = ${normalizedState}, Abbreviation = ${stateAbbr}`);
      }
    }
    
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      // Reset marker check state when filters change
      setNoMarkersForState(null);
      setMarkerCheckCompleted(false);
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
  
  // Check for marker count and update the no-markers warning
  useEffect(() => {
    if (filters.selectedState && allFacilities && allFacilities.length > 0) {
      // Reset state first
      setMarkerCheckCompleted(false);
      
      // Force markers visible first
      forceMapMarkersVisible();
      
      // Give more time for markers to be created (increased from 1000ms to 2500ms)
      const timer = setTimeout(() => {
        // Check for ALL possible marker classes
        const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .direct-marker, .emergency-marker');
        setMarkersCount(markers.length);
        
        if (markers.length === 0) {
          setNoMarkersForState(filters.selectedState);
          console.warn(`No markers created for state: ${filters.selectedState}`);
          
          // Add additional logging for debugging
          console.log('States in allFacilities:', [...new Set(allFacilities.map(f => f.state))]);
        } else {
          setNoMarkersForState(null);
          console.log(`Found ${markers.length} markers on the map`);
        }
        
        // Set check as completed regardless of result
        setMarkerCheckCompleted(true);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      setNoMarkersForState(null);
      setMarkerCheckCompleted(true);
    }
  }, [filters.selectedState, allFacilities]);
  
  const onMarkerClick = useCallback((facilityId: string) => {
    console.log(`Marker clicked: ${facilityId}`);
    handleFacilityClick(facilityId, allFacilities || []);
  }, [handleFacilityClick, allFacilities]);

  // Get the state abbreviation and full name for display in warning
  const getStateDisplayInfo = (state: string | null) => {
    if (!state) return { display: '', abbr: '' };
    
    let fullName = state;
    let abbreviation = STATE_NAME_MAP[state] || '';
    
    // If we got an abbreviation as the key, swap them
    if (abbreviation.length === 2) {
      abbreviation = state;
      fullName = STATE_NAME_MAP[abbreviation] || state;
    }
    
    return {
      display: fullName,
      abbr: abbreviation !== fullName ? ` (${abbreviation})` : ''
    };
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
        
        {/* Warning message when no markers are visible - only show when check is completed */}
        {noMarkersForState && markerCheckCompleted && markersCount === 0 && (
          <Alert variant="default" className="bg-amber-900/30 border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200">
              No markers visible for {getStateDisplayInfo(noMarkersForState).display}
              {getStateDisplayInfo(noMarkersForState).abbr}. The data is loaded but markers may not be displaying correctly.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Dev-only diagnostics */}
        {import.meta.env.DEV && (
          <Alert variant="default" className="bg-[#091020] border-gray-700">
            <AlertDescription className="text-gray-300 text-xs">
              Provider: {useGoogleMaps ? 'Google Maps' : 'Mapbox'} | {useGoogleMaps ? 'Mapbox token: not required' : `Mapbox token: ${mapToken ? 'ok' : 'missing'}${mapTokenError ? ` | Error: ${mapTokenError}` : ''}`}
            </AlertDescription>
          </Alert>
        )}
        
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
