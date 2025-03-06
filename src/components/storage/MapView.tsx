
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { StorageFacility } from './types';
import MapControls from './map/MapControls';
import ClusterLayer from './map/ClusterLayer';
import FacilityMarkers from './map/FacilityMarkers';
import MapLoadingState from './map/MapLoadingState';
import { 
  initializeMapboxGL, 
  createMapInstance, 
  waitForMapStyleLoad,
  fitMapToBounds
} from './map/utils/mapboxInit';
import { toast } from "sonner";

// Initialize Mapbox
initializeMapboxGL();

// Add global CSS to ensure popups appear above other elements
const addGlobalStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .mapboxgl-popup {
      z-index: 9999 !important;
    }
    .mapboxgl-popup-content {
      z-index: 9999 !important;
      pointer-events: auto !important;
    }
    .custom-marker {
      cursor: pointer !important;
      z-index: 999 !important;
    }
    
    /* Ensure popup stays visible by overriding any conflicting CSS */
    .mapboxgl-popup-close-button {
      color: white !important;
      font-size: 18px !important;
      margin: 5px !important;
    }
    
    /* Make popup content clickable */
    .popup-content {
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(styleElement);
};

// Add global styles once
if (typeof window !== 'undefined') {
  addGlobalStyles();
}

interface MapViewProps {
  mapToken: string;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapView = ({
  mapToken,
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const activePopupRef = useRef<mapboxgl.Popup | null>(null);
  
  // Debug output - log facilities count whenever it changes
  useEffect(() => {
    console.log(`MapView received ${facilities.length} facilities to display`);
    if (facilities.length > 0) {
      console.log('Sample facilities:', facilities.slice(0, 3));
    }
  }, [facilities]);

  // Add a global listener to handle popup clicks correctly
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Check if clicked element is part of a popup
      const isPopupClick = (e.target as HTMLElement)?.closest('.mapboxgl-popup');
      const isMarkerClick = (e.target as HTMLElement)?.closest('.custom-marker');
      
      if (isPopupClick || isMarkerClick) {
        // Stop event from reaching map and closing popup
        e.stopPropagation();
        console.log('Global click handler: prevented click from closing popup');
      }
    };

    // Use capture phase to intercept events before they reach map
    document.addEventListener('click', handleGlobalClick, true);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const initializeMap = async () => {
      try {
        if (map.current) {
          console.log('Removing existing map instance');
          map.current.remove();
          map.current = null;
        }

        if (mapToken.includes('Error')) {
          throw new Error('Invalid Mapbox token received');
        }

        console.log('Creating new map instance');
        
        // Create new map instance with the existing ref
        const mapContainerElement = mapContainer.current;
        const newMap = createMapInstance(mapContainerElement, mapToken);

        // Wait for style to load
        console.log('Waiting for map style to load');
        await waitForMapStyleLoad(newMap);
        
        if (!isMounted) return;

        console.log('Map style loaded successfully');
        
        // Enable essential interactions
        newMap.dragPan.enable();
        newMap.scrollZoom.enable();
        newMap.doubleClickZoom.enable();

        // Force a resize to ensure proper rendering
        setTimeout(() => newMap.resize(), 100);

        // Set up error handling
        newMap.on('error', (e) => {
          console.error('Map error:', e);
          if (isMounted) {
            setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
            setIsInitializing(false);
            toast.error(`Map error: ${e.error?.message || 'Unknown error'}`);
          }
        });
        
        // Add click handler to map container to prevent closing popups
        const mapContainerDiv = newMap.getContainer();
        mapContainerDiv.addEventListener('click', (e) => {
          // Only prevent default behavior if NOT clicking a marker (so marker clicks work)
          if (!(e.target as HTMLElement)?.closest('.custom-marker')) {
            console.log('Map container click - keeping popups open');
          }
        }, true);

        // Complete initialization
        if (isMounted) {
          map.current = newMap;
          setMapError(null);
          setIsInitializing(false);
          setMapLoaded(true);
          toast.success('Map loaded successfully');
          
          // If we have a selected state, adjust the map view
          if (selectedState && facilities.length > 0) {
            fitMapToBounds(newMap, facilities);
          }
        }

      } catch (err) {
        console.error('Map initialization error:', err);
        if (isMounted && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying map initialization (attempt ${retryCount}/${maxRetries})...`);
          setTimeout(initializeMap, 1000 * retryCount);
        } else if (isMounted) {
          setMapError(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setIsInitializing(false);
          toast.error(`Failed to initialize map: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (map.current) {
        console.log('Cleaning up map instance');
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapToken, selectedState, facilities]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map.current && mapLoaded && facilities.length > 0) {
      console.log('Updating map bounds for new facilities');
      fitMapToBounds(map.current, facilities);
    }
  }, [facilities, mapLoaded]);
  
  // Handle facility highlighting specially
  useEffect(() => {
    if (map.current && highlightedFacility) {
      console.log(`Highlighting facility: ${highlightedFacility}`);
      
      // Find the highlighted marker element
      const markerEl = document.querySelector(`[data-facility-id="${highlightedFacility}"]`);
      if (markerEl) {
        // Scroll to bring it into view if needed
        markerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [highlightedFacility]);

  return (
    <div className="relative w-full h-full">
      <MapLoadingState 
        isInitializing={isInitializing}
        mapError={mapError}
        mapLoaded={mapLoaded}
        facilitiesCount={facilities.length}
      />
      
      <div 
        ref={mapContainer} 
        className="w-full h-full" 
        style={{ 
          minHeight: '600px',
          opacity: mapLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {map.current && mapLoaded && (
        <>
          <MapControls map={map.current} />
          <ClusterLayer
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          />
          <FacilityMarkers
            map={map.current}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
            onMarkerClick={onMarkerClick}
          />
        </>
      )}
    </div>
  );
};

export default MapView;
