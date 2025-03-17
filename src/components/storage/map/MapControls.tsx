
import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapControlsProps {
  map: mapboxgl.Map;
  onFilterClick?: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ map, onFilterClick }) => {
  const [showHint, setShowHint] = useState(false);

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
    }
    
    // Cleanup function
    return () => {
      if (map) {
        map.off('load', () => {});
        map.off('click', () => {});
      }
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
      
      {/* Navigation hint */}
      <div className={`map-navigation-hint ${showHint ? 'visible' : ''}`}>
        If location details cut off, move the map with your browser
      </div>
    </>
  );
};

export default MapControls;
