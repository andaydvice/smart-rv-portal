
import mapboxgl from 'mapbox-gl';
import { createEdgeAwareClickHandler } from '@/utils/markers/forcing/preventEdgeCutoff';
import { useState, useCallback, useRef } from 'react';

export const useMarkerClickHandlers = () => {
  // Track failed attempts for retries
  const failedAttemptsRef = useRef<Record<string, number>>({});
  const MAX_RETRY_ATTEMPTS = 10;

  /**
   * Creates a robust click handler for markers that won't be garbage collected
   */
  const createMarkerClickHandler = (
    marker: mapboxgl.Marker,
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void,
    map: mapboxgl.Map
  ): ((e: MouseEvent) => void) => {
    // Define a more robust click handler that won't be garbage collected
    const handleMarkerClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      
      
      // Call the click handler first (this navigates or shows details)
      onMarkerClick(facilityId);
      
      // Apply edge-aware positioning to ensure marker and popup are fully visible
      const markerElement = marker.getElement();
      const coordinates = marker.getLngLat().toArray() as [number, number];
      
      // Use edge-aware handler to adjust map position
      createEdgeAwareClickHandler(
        map,
        coordinates,
        () => {
          // Then handle the popup toggle after map position is adjusted
          if (!marker.getPopup().isOpen()) {
            try {
              marker.togglePopup();
              // Reset failed attempts on success
              failedAttemptsRef.current[facilityId] = 0;
            } catch (error) {
              console.error('Failed to toggle popup:', error);
              // Increment failed attempts
              failedAttemptsRef.current[facilityId] = (failedAttemptsRef.current[facilityId] || 0) + 1;
              
              // Retry if within the max attempts
              if ((failedAttemptsRef.current[facilityId] || 0) <= MAX_RETRY_ATTEMPTS) {
                
                setTimeout(() => {
                  try {
                    marker.togglePopup();
                  } catch (retryError) {
                    console.error('Retry attempt failed:', retryError);
                  }
                }, 300); // Small delay before retry
              }
            }
          }
        }
      )(e);
      
      // Ensure popup is visible and clickable with improved edge detection
      setTimeout(() => {
        const popupElement = document.querySelector(`.mapboxgl-popup[data-facility-id="${facilityId}"]`);
        if (popupElement instanceof HTMLElement) {
          // Apply styles to ensure visibility
          popupElement.style.zIndex = '10000';
          popupElement.style.visibility = 'visible';
          popupElement.style.display = 'block';
          popupElement.style.pointerEvents = 'all';
          
          // Ensure the popup is within viewport bounds
          const rect = popupElement.getBoundingClientRect();
          const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
          };
          
          // Check if popup is cut off by viewport edges
          if (rect.right > viewport.width || rect.bottom > viewport.height ||
              rect.left < 0 || rect.top < 0) {
            
            // Adjust map center to ensure popup is fully visible
            const currentCenter = map.getCenter();
            const adjustedCenter = marker.getLngLat();
            map.easeTo({
              center: adjustedCenter,
              duration: 300
            });
          }
          
          // Ensure the close button works
          const closeButton = popupElement.querySelector('.mapboxgl-popup-close-button');
          if (closeButton instanceof HTMLElement) {
            closeButton.style.pointerEvents = 'all';
            closeButton.style.cursor = 'pointer';
            
            // Replace with new button to clear existing handlers
            const newButton = closeButton.cloneNode(true);
            closeButton.parentNode?.replaceChild(newButton, closeButton);
            
            // Enhance close button with clear event handler
            newButton.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              
              // Remove the popup
              marker.getPopup().remove();
              
              // Trigger custom event to ensure map visibility
              document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
              
              // Ensure map is visible
              setTimeout(() => {
                const canvas = document.querySelector('.mapboxgl-canvas');
                if (canvas instanceof HTMLElement) {
                  canvas.style.visibility = 'visible';
                  canvas.style.display = 'block';
                  canvas.style.opacity = '1';
                }
              }, 50);
            });
          }
          
          // Update any links to open in the same tab
          const links = popupElement.querySelectorAll('a');
          links.forEach(link => {
            if (link instanceof HTMLAnchorElement) {
              link.target = ''; // Remove any target attributes
              link.setAttribute('data-same-tab', 'true');
              
              // Ensure clicks work properly
              link.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
              });
            }
          });
          
          // Remove any View Details buttons
          const viewDetailsBtn = popupElement.querySelector('.view-facility-btn, button.view-details');
          if (viewDetailsBtn instanceof HTMLElement) {
            viewDetailsBtn.style.display = 'none';
            viewDetailsBtn.style.visibility = 'hidden';
            viewDetailsBtn.style.opacity = '0';
          }
        }
      }, 50);
    };
    
    return handleMarkerClick;
  };

  /**
   * Applies a click handler to a marker element
   */
  const applyClickHandlerToMarker = (
    markerElement: HTMLElement,
    marker: mapboxgl.Marker,
    facilityId: string,
    facilityName: string,
    onMarkerClick: (facilityId: string) => void,
    map: mapboxgl.Map
  ): void => {
    // Create the click handler
    const handleMarkerClick = createMarkerClickHandler(
      marker,
      facilityId,
      facilityName,
      onMarkerClick,
      map
    );
    
    // Remove any existing click listeners to prevent duplicates
    const oldHandler = markerElement.getAttribute('data-click-handler');
    if (oldHandler) {
      markerElement.removeEventListener('click', (window as any)[oldHandler] as EventListener);
    }
    
    // Add new click event handler
    markerElement.addEventListener('click', handleMarkerClick);
    
    // Store handler reference for later cleanup - using window object instead of globalThis
    const handlerName = `marker_handler_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    (window as any)[handlerName] = handleMarkerClick;
    markerElement.setAttribute('data-click-handler', handlerName);
  };

  /**
   * Get the current count of failed attempts for a specific facility
   */
  const getFailedAttempts = (facilityId: string): number => {
    return failedAttemptsRef.current[facilityId] || 0;
  };

  /**
   * Get the total count of failed attempts across all facilities
   */
  const getTotalFailedAttempts = (): number => {
    return Object.values(failedAttemptsRef.current).reduce((sum, count) => sum + count, 0);
  };

  return {
    createMarkerClickHandler,
    applyClickHandlerToMarker,
    getFailedAttempts,
    getTotalFailedAttempts,
    MAX_RETRY_ATTEMPTS
  };
};
