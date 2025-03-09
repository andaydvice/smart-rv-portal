
import { useCallback, useMemo, useRef } from 'react';
import { UseMarkerVisibilityProps } from './types';

export const useMarkerVisibility = ({ map }: UseMarkerVisibilityProps) => {
  // Track when we last forced visibility to avoid redundant operations
  const lastVisibilityUpdate = useRef<number>(0);
  // Track which markers we've already processed
  const processedMarkers = useRef<Set<string>>(new Set());
  
  // Create a style element for common styles
  useMemo(() => {
    // Create the style once for all markers
    if (!document.getElementById('marker-visibility-styles')) {
      const style = document.createElement('style');
      style.id = 'marker-visibility-styles';
      style.textContent = `
        /* Optimized marker visibility styles */
        body.show-map-markers .mapboxgl-marker,
        body.show-map-markers .custom-marker {
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
        }
        
        /* Enhanced marker visibility */
        .mapboxgl-marker[data-visible="true"],
        .custom-marker[data-visible="true"] {
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
          z-index: 99 !important;
        }
        
        /* Optimized popup handling */
        .mapboxgl-popup[data-optimized="true"] {
          z-index: 100 !important;
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Add global class to enable marker visibility
    document.body.classList.add('show-map-markers');
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('show-map-markers');
      const style = document.getElementById('marker-visibility-styles');
      if (style) style.remove();
    };
  }, []);

  // Optimized marker visibility function
  const forceMarkerVisibility = useCallback(() => {
    // Throttle calls for better performance
    const now = Date.now();
    if (now - lastVisibilityUpdate.current < 500) {
      return; // Skip if called too frequently
    }
    
    // Get markers efficiently with a single query
    const markerElements = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
    
    // Skip if no markers found
    if (markerElements.length === 0) return;
    
    // Track how many markers we actually modify
    let markersUpdated = 0;
    
    // Process markers in batches for better performance
    const processMarkers = (startIdx: number, batchSize: number) => {
      const endIdx = Math.min(startIdx + batchSize, markerElements.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        const marker = markerElements[i];
        if (!(marker instanceof HTMLElement)) continue;
        
        // Create a unique ID for the marker if none exists
        const markerId = marker.getAttribute('data-facility-id') || 
                          marker.id || 
                          `marker-${i}`;
        
        // Skip already processed markers for better performance
        if (processedMarkers.current.has(markerId)) continue;
        
        // Add to processed set
        processedMarkers.current.add(markerId);
        
        // Apply minimal but critical styles and use the data attribute
        // to trigger the CSS rules from our style element
        marker.setAttribute('data-visible', 'true');
        markersUpdated++;
      }
      
      // Process next batch if needed
      if (endIdx < markerElements.length) {
        setTimeout(() => processMarkers(endIdx, batchSize), 0);
      } else {
        // Log only if we actually did something
        if (markersUpdated > 0 && process.env.NODE_ENV === 'development') {
          console.log(`Enhanced visibility for ${markersUpdated} markers`);
        }
      }
    };
    
    // Start batch processing with small batches
    processMarkers(0, 10);
    
    // Optimize popups separately
    document.querySelectorAll('.mapboxgl-popup:not([data-optimized])').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.setAttribute('data-optimized', 'true');
      }
    });
    
    // Update timestamp
    lastVisibilityUpdate.current = now;
  }, []);

  return {
    forceMarkerVisibility
  };
};
