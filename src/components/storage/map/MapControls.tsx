import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapControlsProps {
  map: mapboxgl.Map;
  onFilterClick?: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ map, onFilterClick }) => {
  const [showHint, setShowHint] = useState(false);
  const mapContainerRef = useRef<HTMLElement | null>(null);

  // Add map navigation controls
  useEffect(() => {
    // Only try to add controls if map is properly initialized
    if (map && map.loaded()) {
      try {
        map.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );
        console.log('Navigation controls added successfully');
      } catch (error) {
        console.error('Failed to add map controls:', error);
      }
    } else {
      // If map isn't loaded yet, wait for it to load
      const handleMapLoad = () => {
        try {
          map.addControl(
            new mapboxgl.NavigationControl({
              visualizePitch: true,
            }),
            'top-right'
          );
          console.log('Navigation controls added after map load');
          // Clean up the event listener
          map.off('load', handleMapLoad);
        } catch (error) {
          console.error('Failed to add map controls after load:', error);
        }
      };
      
      // Add event listener for map load
      if (map) {
        map.on('load', handleMapLoad);
      }
    }
    
    // Add click listener to show hint when popup opens
    if (map) {
      map.on('click', () => {
        // Show navigation hint when a marker is clicked
        const popups = document.querySelectorAll('.mapboxgl-popup');
        if (popups.length > 0) {
          setShowHint(true);
          // Hide hint after 5 seconds
          setTimeout(() => {
            setShowHint(false);
          }, 5000);
        }
      });
      
      // Show hint when any marker is clicked directly
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target && (target.classList.contains('custom-marker') || 
            target.closest('.custom-marker') || 
            target.classList.contains('mapboxgl-marker') || 
            target.closest('.mapboxgl-marker'))) {
          setShowHint(true);
          setTimeout(() => {
            setShowHint(false);
          }, 5000);
        }
      });
    }
    
    // Find and store map container reference
    if (map) {
      const container = map.getContainer();
      mapContainerRef.current = container;
    }

    // Handle scroll events to keep map visible
    const handleScroll = () => {
      if (!mapContainerRef.current) return;
      
      const container = mapContainerRef.current;
      const rect = container.getBoundingClientRect();
      const popups = document.querySelectorAll('.mapboxgl-popup');
      
      // Only adjust if there are popups and they might be cut off
      if (popups.length > 0) {
        popups.forEach((popup) => {
          const popupRect = popup.getBoundingClientRect();
          
          // Check if popup is partially off-screen
          const isTopCutOff = popupRect.top < 0;
          const isBottomCutOff = popupRect.bottom > window.innerHeight;
          const isLeftCutOff = popupRect.left < 0;
          const isRightCutOff = popupRect.right > window.innerWidth;
          
          if (isTopCutOff || isBottomCutOff || isLeftCutOff || isRightCutOff) {
            // Calculate scroll adjustment if needed
            if (isTopCutOff && window.scrollY > 0) {
              // Scroll up to show the top of the popup
              window.scrollBy(0, popupRect.top - 20);
            } else if (isBottomCutOff) {
              // Scroll down to show the bottom of the popup
              window.scrollBy(0, popupRect.bottom - window.innerHeight + 20);
            }
            
            // For horizontal adjustments, pan the map instead of scrolling
            if (map && (isLeftCutOff || isRightCutOff)) {
              const center = map.getCenter();
              if (isLeftCutOff) {
                center.lng -= 0.02; // Adjust as needed
                map.panTo(center);
              } else if (isRightCutOff) {
                center.lng += 0.02; // Adjust as needed
                map.panTo(center);
              }
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Additional event listener for popup creation
    document.addEventListener('mapbox.popup.opened', handleScroll);
    
    // Cleanup function
    return () => {
      if (map) {
        map.off('load', () => {});
        map.off('click', () => {});
      }
      document.removeEventListener('click', () => {});
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mapbox.popup.opened', handleScroll);
    };
  }, [map]);

  return (
    <>
      {/* Filter button */}
      {onFilterClick && (
        <div className="absolute top-2 left-2 z-10">
          <button 
            onClick={onFilterClick}
            className="bg-connectivity-darkBg text-white px-3 py-1 rounded-md text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
      )}
      
      {/* Removed the always visible hint, as it's now in the main component */}
      
      {/* Additional hint when clicking markers - temporarily visible with improved styling */}
      <div className={`map-navigation-hint ${showHint ? 'visible' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move mr-2 shrink-0">
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
    </>
  );
};

export default MapControls;
