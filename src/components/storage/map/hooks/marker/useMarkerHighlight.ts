
import { useEffect } from 'react';
import { UseMarkerHighlightProps } from './types';

export const useMarkerHighlight = ({ 
  map, 
  facilities, 
  highlightedFacility
}: UseMarkerHighlightProps) => {
  // Effect to update markers when highlighted facility changes
  useEffect(() => {
    if (!map || !highlightedFacility) return;

    if (window._persistentMarkers) {
      // Get specific marker for the highlighted facility
      const highlightedMarker = window._persistentMarkers[highlightedFacility];
      
      if (highlightedMarker) {
        // Update marker appearance based on highlight state
        const el = highlightedMarker.getElement();
        if (el) {
          el.style.backgroundColor = '#10B981';
          el.style.zIndex = '1100';
          el.style.transform = 'translate(-50%, -50%) scale(1.2)';
          el.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
          
          // Set highlighted attribute for CSS targeting
          el.setAttribute('data-highlighted', 'true');
          
          // Force visibility and interactivity
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.display = 'block';
          el.style.pointerEvents = 'all';
        }
        
        console.log(`Highlighted marker for facility ID: ${highlightedFacility}`);
        // Open popup for highlighted facility and ensure it stays open
        if (!highlightedMarker.getPopup().isOpen()) {
          highlightedMarker.togglePopup();
          
          // Enhance popup visibility after opening
          setTimeout(() => {
            const popupEl = highlightedMarker.getPopup().getElement();
            if (popupEl) {
              popupEl.style.zIndex = '1100';
              popupEl.style.visibility = 'visible';
              popupEl.style.pointerEvents = 'all';
              
              // Add attributes to prevent automatic removal
              popupEl.setAttribute('data-persistent', 'true');
              popupEl.setAttribute('data-facility-id', highlightedFacility);
            }
          }, 50);
        }

        // Reset all other markers
        Object.entries(window._persistentMarkers).forEach(([facilityId, marker]) => {
          if (facilityId !== highlightedFacility) {
            const markerEl = marker.getElement();
            if (markerEl) {
              markerEl.style.backgroundColor = '#F97316';
              markerEl.style.zIndex = '1000';
              markerEl.style.transform = 'translate(-50%, -50%) scale(1)';
              markerEl.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)';
              markerEl.removeAttribute('data-highlighted');
            }
          }
        });
      }
    }
  }, [highlightedFacility, map]);

  return {};
};
