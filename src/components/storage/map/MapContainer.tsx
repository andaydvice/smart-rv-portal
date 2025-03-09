
import React, { useEffect, useCallback, useMemo } from 'react';
import { useMap } from './MapContext';
import MapControls from './MapControls';
import ClusterLayer from './ClusterLayer';
import FacilityMarkers from './FacilityMarkers';
import MapLoadingState from './MapLoadingState';
import { StorageFacility } from '../types';
import { fitMapToBounds } from './utils/mapBounds';
import { 
  ensureMarkersExist, 
  createEmergencyMarkers, 
  setupEmergencyMarkerListeners,
  injectEmergencyMarkerStyles 
} from '@/utils/markers';

interface MapContainerProps {
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  selectedState: string | null;
}

const MapContainer: React.FC<MapContainerProps> = ({
  facilities,
  highlightedFacility,
  onMarkerClick,
  selectedState
}) => {
  const { mapContainer, isInitializing, mapError, mapLoaded, map } = useMap();
  
  // Add global map instance access
  useEffect(() => {
    if (map) {
      (window as any).mapInstance = map;
      document.dispatchEvent(new CustomEvent('mapboxgl.map.created', { detail: { map } }));
      
      // Explicitly set map container to visible
      const container = map.getContainer();
      if (container) {
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        container.style.display = 'block';
      }
      
      // Add event listener for popup close events
      map.on('popupclose', () => {
        // Ensure map canvas is visible after popup closes
        const canvas = map.getCanvas();
        if (canvas) {
          canvas.style.visibility = 'visible';
          canvas.style.display = 'block';
          canvas.style.opacity = '1';
        }
        
        // Make sure all markers are visible
        document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
          if (marker instanceof HTMLElement) {
            marker.style.visibility = 'visible';
            marker.style.display = 'block';
            marker.style.opacity = '1';
          }
        });
      });
    }
    
    return () => {
      (window as any).mapInstance = null;
      if (map) {
        map.off('popupclose');
      }
    };
  }, [map]);

  // Validate facilities data
  const validFacilities = useMemo(() => {
    return facilities.filter(facility => {
      const lat = Number(facility.latitude);
      const lng = Number(facility.longitude);
      return !isNaN(lat) && !isNaN(lng) && 
             Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
    });
  }, [facilities]);

  // Emergency marker creation approach
  useEffect(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return;
    
    // Inject emergency styles
    injectEmergencyMarkerStyles();
    
    // Set map container to be explicitly visible
    const container = map.getContainer();
    if (container) {
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.display = 'block';
    }
    
    console.log('Creating markers for facilities...');
    
    // Create emergency markers and set up listeners
    const markerCount = createEmergencyMarkers(map, validFacilities);
    console.log(`Created ${markerCount} emergency markers`);
    
    // Set up event listeners
    const cleanup = setupEmergencyMarkerListeners(onMarkerClick);
    
    // Set up a MutationObserver to watch for popup close buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Look for newly added popups
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.classList.contains('mapboxgl-popup')) {
              // Find close button
              const closeButton = node.querySelector('.mapboxgl-popup-close-button');
              if (closeButton instanceof HTMLElement) {
                // Replace with new button to clear old event listeners
                const newButton = closeButton.cloneNode(true);
                closeButton.parentNode?.replaceChild(newButton, closeButton);
                
                // Add clean event listener to the close button
                newButton.addEventListener('click', (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  
                  // Remove the popup
                  node.remove();
                  
                  // Make sure map is visible
                  setTimeout(() => {
                    if (map) {
                      // Ensure map canvas is visible
                      const canvas = map.getCanvas();
                      if (canvas) {
                        canvas.style.visibility = 'visible';
                        canvas.style.display = 'block';
                      }
                      
                      // Force all markers to be visible
                      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(m => {
                        if (m instanceof HTMLElement) {
                          m.style.visibility = 'visible';
                          m.style.display = 'block';
                          m.style.opacity = '1';
                        }
                      });
                    }
                  }, 50);
                });
              }
            }
          });
        }
      });
    });
    
    // Start observing the document for popup additions
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      cleanup();
      observer.disconnect();
      // Remove emergency markers
      document.querySelectorAll('.emergency-marker').forEach(marker => {
        if (marker.parentNode) marker.parentNode.removeChild(marker);
      });
    };
  }, [map, mapLoaded, validFacilities, onMarkerClick]);

  // Update map bounds when facilities change
  useEffect(() => {
    if (map && mapLoaded && validFacilities.length > 0) {
      console.log(`Fitting map to bounds with ${validFacilities.length} valid coordinates`);
      fitMapToBounds(map, validFacilities);
    }
  }, [validFacilities, mapLoaded, map, selectedState]);

  // Listen for facility selection to update the map view
  useEffect(() => {
    if (map && mapLoaded && highlightedFacility) {
      const facility = validFacilities.find(f => f.id === highlightedFacility);
      if (facility) {
        const lat = Number(facility.latitude);
        const lng = Number(facility.longitude);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          console.log(`Flying to facility: ${facility.name}`);
          map.flyTo({
            center: [lng, lat],
            zoom: 12,
            padding: {top: 50, bottom: 50, left: 50, right: 50}, // Add padding to ensure marker is visible
            essential: true
          });
          
          // Highlight the emergency marker
          document.querySelectorAll('.emergency-marker, .custom-marker, .mapboxgl-marker').forEach(marker => {
            if (marker instanceof HTMLElement) {
              const markerFacilityId = marker.getAttribute('data-facility-id');
              if (markerFacilityId === highlightedFacility) {
                marker.style.backgroundColor = '#10B981';
                marker.style.width = '28px';
                marker.style.height = '28px';
                marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
                marker.style.zIndex = '10002';
                marker.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.8)';
                marker.style.display = 'block';
                marker.style.visibility = 'visible';
                marker.style.opacity = '1';
              } else if (markerFacilityId) {
                marker.style.backgroundColor = '#F97316';
                marker.style.width = '24px';
                marker.style.height = '24px';
                marker.style.transform = 'translate(-50%, -50%) scale(1)';
                marker.style.zIndex = '10000';
                marker.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                marker.style.display = 'block';
                marker.style.visibility = 'visible';
                marker.style.opacity = '1';
              }
            }
          });
        }
      }
    }
  }, [highlightedFacility, map, mapLoaded, validFacilities]);

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
          transition: 'opacity 0.3s ease-in-out',
          visibility: 'visible'
        }}
      />
      
      {map && mapLoaded && (
        <>
          <MapControls map={map} />
          <ClusterLayer
            map={map}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
          />
          {/* Keep the original markers but they'll likely be invisible */}
          <FacilityMarkers
            map={map}
            facilities={facilities}
            highlightedFacility={highlightedFacility}
            onMarkerClick={onMarkerClick}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(MapContainer);
