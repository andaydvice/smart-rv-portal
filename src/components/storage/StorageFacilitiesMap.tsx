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
import { 
  forceMapMarkersVisible, 
  applyForcedStyles, 
  testMarkersVisibility, 
  ensureMarkersExist, 
  ensureMapVisible,
  removeViewDetailsButtons 
} from '@/utils/markers';

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

  const { facilities: filteredFacilities, isLoading, error, maxPrice } = useStorageFacilities(filters);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { mapToken, mapTokenError } = useMapToken();
  
  const displayFacilities = useMemo(() => filteredFacilities || [], [filteredFacilities]);
  
  useEffect(() => {
    if (displayFacilities.length > 0) {
      (window as any).mapFacilities = displayFacilities;
    }
  }, [displayFacilities]);
  
  const { 
    highlightedFacility, 
    scrollAreaRef, 
    handleFacilityClick 
  } = useFacilitySelection({ 
    addToRecentlyViewed 
  });
  
  useEffect(() => {
    if (highlightedFacility) {
      (window as any).highlightedFacilityId = highlightedFacility;
    } else {
      (window as any).highlightedFacilityId = null;
    }
  }, [highlightedFacility]);
  
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(prevFilters => {
      if (JSON.stringify(prevFilters) === JSON.stringify(newFilters)) {
        return prevFilters;
      }
      return newFilters;
    });
  }, []);
  
  useEffect(() => {
    console.log("StorageFacilitiesMap: EMERGENCY FIX - Running visibility enforcement");
    
    document.body.setAttribute('data-markers-loading', 'true');
    
    forceMapMarkersVisible();
    
    removeViewDetailsButtons();
    
    const forceInterval = setInterval(() => {
      ensureMapVisible();
      
      const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
      console.log(`Found ${markers.length} markers - forcing visible`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.cssText += `
            visibility: visible !important;
            display: block !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            pointer-events: auto !important;
            position: absolute !important;
          `;
          
          marker.setAttribute('data-forced-visible', 'true');
        }
      });
      
      removeViewDetailsButtons();
      
      if ((window as any).mapInstance && (window as any).mapFacilities && 
          markers.length < ((window as any).mapFacilities.length * 0.8)) {
        ensureMarkersExist((window as any).mapInstance, (window as any).mapFacilities);
      }
    }, 1000);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (node.classList.contains('mapboxgl-marker') || 
                  node.classList.contains('custom-marker') ||
                  node.classList.contains('emergency-marker')) {
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
              
              if (node.classList.contains('mapboxgl-popup')) {
                const closeButton = node.querySelector('.mapboxgl-popup-close-button');
                if (closeButton instanceof HTMLElement) {
                  closeButton.style.pointerEvents = 'all';
                  closeButton.style.cursor = 'pointer';
                  closeButton.style.zIndex = '10001';
                  
                  const viewDetailsBtn = node.querySelector('.view-facility-btn, button.view-details');
                  if (viewDetailsBtn instanceof HTMLElement) {
                    viewDetailsBtn.style.display = 'none';
                    viewDetailsBtn.style.visibility = 'hidden';
                    viewDetailsBtn.style.opacity = '0';
                    viewDetailsBtn.style.pointerEvents = 'none';
                  }
                }
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
    
    const handlePopupClosed = () => {
      console.log('Popup closed event detected');
      
      ensureMapVisible();
      
      forceMapMarkersVisible();
      
      removeViewDetailsButtons();
    };
    
    document.addEventListener('mapbox.popup.closed', handlePopupClosed);
    
    setTimeout(() => {
      testMarkersVisibility(true);
      document.body.removeAttribute('data-markers-loading');
      document.body.classList.add('map-loaded');
    }, 3000);
    
    return () => {
      clearInterval(forceInterval);
      observer.disconnect();
      document.removeEventListener('mapbox.popup.closed', handlePopupClosed);
      document.body.removeAttribute('data-markers-loading');
      document.body.classList.remove('map-loaded');
    };
  }, []);
  
  useEffect(() => {
    if (filteredFacilities?.length > 10 && !isLoading) {
      toast.success(`Loaded ${filteredFacilities.length} storage facilities`);
    } else if (filteredFacilities && filteredFacilities.length === 0 && !isLoading) {
      toast.info('No facilities found for the current filters');
    }
  }, [filteredFacilities, isLoading]);

  useEffect(() => {
    if (error) {
      console.error('Error loading facilities:', error);
      toast.error(`Error loading facilities: ${error.message}`);
    }
  }, [error]);

  const onMarkerClick = useCallback((facilityId: string) => {
    console.log(`Marker clicked: ${facilityId}`);
    handleFacilityClick(facilityId, displayFacilities);
    
    setTimeout(() => {
      ensureMapVisible();
    }, 100);
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
