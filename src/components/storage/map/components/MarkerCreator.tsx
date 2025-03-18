
import React, { useEffect } from 'react';
import { StorageFacility } from '../../types';
import { removeViewDetailsButtons } from '@/utils/markers';

interface MarkerCreatorProps {
  map: mapboxgl.Map;
  facilities: StorageFacility[];
  highlightedFacility: string | null;
  onMarkerClick: (facilityId: string) => void;
  createMarkers: () => void;
}

const MarkerCreator: React.FC<MarkerCreatorProps> = ({
  map,
  facilities,
  createMarkers,
  onMarkerClick,
}) => {
  // Create log showing marker creation started
  useEffect(() => {
    console.log(`MarkerCreator: Received ${facilities.length} facilities to display as markers`);
  }, [facilities]);

  // Effect to create markers when facilities or map changes
  useEffect(() => {
    // Create markers only when we have both map and facilities
    if (!map || !facilities.length) {
      console.log("MarkerCreator: Missing map or facilities, skipping marker creation");
      return;
    }
    
    console.log(`MarkerCreator: Creating markers for ${facilities.length} facilities`);
    
    // Use multiple creation attempts with increasing delays
    const createWithRetry = (attempt = 1) => {
      console.log(`MarkerCreator: Marker creation attempt ${attempt}`);
      createMarkers();
      
      // Check if markers were actually created after a short delay
      setTimeout(() => {
        const markerCount = document.querySelectorAll('.mapboxgl-marker, .custom-marker').length;
        console.log(`MarkerCreator: Found ${markerCount} markers after creation attempt ${attempt}`);
        
        // If no markers created and we haven't exceeded max attempts, try again
        if (markerCount === 0 && attempt < 3) {
          setTimeout(() => createWithRetry(attempt + 1), 1000 * attempt);
        } else {
          // Set up event listeners for popup close buttons and view details buttons
          document.querySelectorAll('.mapboxgl-popup-close-button').forEach(btn => {
            if (btn instanceof HTMLElement) {
              btn.style.pointerEvents = 'all';
              btn.style.cursor = 'pointer';
            }
          });
          
          document.querySelectorAll('.view-facility-btn').forEach(btn => {
            if (btn instanceof HTMLElement) {
              btn.style.pointerEvents = 'all';
              btn.style.cursor = 'pointer';
              
              // Re-add click handler to ensure it works
              const facilityId = btn.getAttribute('data-facility-id');
              if (facilityId) {
                btn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  onMarkerClick(facilityId);
                });
              }
            }
          });
          
          // Remove any view details buttons
          removeViewDetailsButtons();
          
          // Force star rating visibility in all popups
          document.querySelectorAll('.star-rating-container, .facility-popup-content .flex').forEach(container => {
            if (container instanceof HTMLElement) {
              container.style.display = 'flex';
              container.style.visibility = 'visible';
              container.style.opacity = '1';
              
              // Force each star to be visible
              container.querySelectorAll('svg').forEach(star => {
                if (star instanceof SVGElement) {
                  star.style.display = 'inline-block';
                  star.style.visibility = 'visible';
                  star.style.opacity = '1';
                  star.style.width = '20px';
                  star.style.height = '20px';
                }
              });
            }
          });
        }
      }, 500);
    };
    
    // Start the creation process with a delay to ensure map is fully loaded
    setTimeout(() => createWithRetry(), 800);
  }, [map, facilities, createMarkers, onMarkerClick]);

  // This is a utility component with no visual representation
  return null;
};

export default MarkerCreator;
