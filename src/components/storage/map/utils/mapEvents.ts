
/**
 * Sets up map event listeners for essential map functionality
 */
export const setupMapEventListeners = (map: mapboxgl.Map): void => {
  if (!map) return;
  
  // Prevent map interaction events from bubbling up
  map.getCanvas().addEventListener('click', (e) => {
    // Allow click events on popups to work
    if ((e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
      return;
    }
    
    e.stopPropagation();
  });
  
  // Log render performance statistics
  let lastRenderTime = Date.now();
  
  map.on('render', () => {
    // Calculate frame time manually
    const currentTime = Date.now();
    const frameTime = currentTime - lastRenderTime;
    lastRenderTime = currentTime;
    
    // Only log slow frames (>100ms)
    if (frameTime > 100) {
      console.warn(`Slow map render detected: ${frameTime.toFixed(1)}ms`);
    }
  });
  
  // Handle popup close events to ensure map visibility
  map.on('popupclose', () => {
    console.log('Mapbox popupclose event detected');
    // Ensure map canvas is visible
    const canvas = map.getCanvas();
    if (canvas) {
      canvas.style.visibility = 'visible';
      canvas.style.display = 'block';
      canvas.style.opacity = '1';
    }
    
    // Ensure all markers are visible
    document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
      }
    });
    
    // Trigger custom event
    document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
  });
  
  // Handle popup close button clicks
  const handleCloseButtonClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement)?.closest('.mapboxgl-popup-close-button')) {
      e.preventDefault();
      e.stopPropagation();
      
      const popup = (e.target as HTMLElement).closest('.mapboxgl-popup');
      if (popup) {
        popup.remove();
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
        
        // Ensure map is visible
        setTimeout(() => {
          const canvas = map.getCanvas();
          if (canvas) {
            canvas.style.visibility = 'visible';
            canvas.style.display = 'block';
            canvas.style.opacity = '1';
          }
        }, 50);
      }
    }
  };
  
  // Add global listener for popup close button clicks
  document.addEventListener('click', handleCloseButtonClick, true);
  
  // Add scroll handler for ensuring popup visibility
  const scrollHandler = () => {
    const popups = document.querySelectorAll('.mapboxgl-popup');
    if (popups.length === 0) return;
    
    document.body.classList.add('scrolling-map-view');
    
    popups.forEach(popup => {
      if (popup instanceof HTMLElement) {
        const rect = popup.getBoundingClientRect();
        
        // Check if popup is partially off-screen
        const isTopCutOff = rect.top < 0;
        const isBottomCutOff = rect.bottom > window.innerHeight;
        
        if (isTopCutOff || isBottomCutOff) {
          popup.classList.add('popup-auto-adjusting');
          
          if (isTopCutOff && window.scrollY > 0) {
            // Scroll up to show the top of the popup
            window.scrollBy({
              top: rect.top - 20,
              behavior: 'smooth'
            });
          } else if (isBottomCutOff) {
            // Scroll down to show the bottom of the popup
            window.scrollBy({
              top: rect.bottom - window.innerHeight + 20,
              behavior: 'smooth'
            });
          }
          
          // Remove the adjustment class after a delay
          setTimeout(() => {
            popup.classList.remove('popup-auto-adjusting');
          }, 300);
        }
      }
    });
    
    // Remove the scrolling class after a delay
    setTimeout(() => {
      document.body.classList.remove('scrolling-map-view');
    }, 300);
  };
  
  // Add the scroll handler
  window.addEventListener('scroll', scrollHandler, { passive: true });
  
  // Enhance marker visibility and interactivity after style load
  map.once('style.load', () => {
    // Apply any additional style-dependent configurations
    document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.zIndex = '9999';
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.pointerEvents = 'auto';
      }
    });
    
    // Fix for popup z-index issues
    document.querySelectorAll('.mapboxgl-popup').forEach(popup => {
      if (popup instanceof HTMLElement) {
        popup.style.zIndex = '10000';
        popup.style.pointerEvents = 'auto';
        
        // Ensure close button is clickable
        const closeButton = popup.querySelector('.mapboxgl-popup-close-button');
        if (closeButton instanceof HTMLElement) {
          closeButton.style.pointerEvents = 'all';
          closeButton.style.cursor = 'pointer';
          
          // Add enhanced click handling
          closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            // Remove popup
            popup.remove();
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('mapbox.popup.closed'));
            
            // Ensure map is visible
            setTimeout(() => {
              const canvas = map.getCanvas();
              if (canvas) {
                canvas.style.visibility = 'visible';
                canvas.style.display = 'block';
                canvas.style.opacity = '1';
              }
            }, 50);
          });
        }
        
        // Remove any View Details buttons
        const viewDetailsBtn = popup.querySelector('.view-facility-btn, button.view-details');
        if (viewDetailsBtn instanceof HTMLElement) {
          viewDetailsBtn.style.display = 'none';
          viewDetailsBtn.style.visibility = 'hidden';
          viewDetailsBtn.style.opacity = '0';
        }
      }
    });
  });
  
  // Listen for popup open event
  document.addEventListener('mapbox.popup.opened', () => {
    // Find all popups
    const popups = document.querySelectorAll('.mapboxgl-popup');
    
    popups.forEach(popup => {
      if (popup instanceof HTMLElement) {
        // Check if popup is visible
        const isVisible = window.getComputedStyle(popup).display !== 'none';
        
        if (isVisible) {
          const rect = popup.getBoundingClientRect();
          
          // Check if popup is partially off-screen
          const isTopCutOff = rect.top < 0;
          const isBottomCutOff = rect.bottom > window.innerHeight;
          
          if (isTopCutOff || isBottomCutOff) {
            popup.classList.add('popup-auto-adjusting');
            
            if (isTopCutOff && window.scrollY > 0) {
              // Scroll up to show the top of the popup
              window.scrollBy({
                top: rect.top - 20,
                behavior: 'smooth'
              });
            } else if (isBottomCutOff) {
              // Scroll down to show the bottom of the popup
              window.scrollBy({
                top: rect.bottom - window.innerHeight + 20,
                behavior: 'smooth'
              });
            }
            
            // Remove the adjustment class after a delay
            setTimeout(() => {
              popup.classList.remove('popup-auto-adjusting');
            }, 300);
          }
        }
      }
    });
  });
  
  // Add an event listener to handle window resize
  window.addEventListener('resize', () => {
    const popups = document.querySelectorAll('.mapboxgl-popup');
    if (popups.length === 0) return;
    
    popups.forEach(popup => {
      if (popup instanceof HTMLElement) {
        const rect = popup.getBoundingClientRect();
        
        // Check if popup is outside viewport after resize
        if (rect.top < 0 || rect.left < 0 || rect.bottom > window.innerHeight || rect.right > window.innerWidth) {
          // Add the adjustment class
          popup.classList.add('popup-auto-adjusting');
          
          // Dispatch event to handle positioning
          document.dispatchEvent(new CustomEvent('mapbox.popup.check-position', {
            detail: { popupElement: popup }
          }));
          
          // Remove the adjustment class after a delay
          setTimeout(() => {
            popup.classList.remove('popup-auto-adjusting');
          }, 300);
        }
      }
    });
  });
};

/**
 * Creates a click handler for the map container to prevent closing popups
 */
export const createMapClickHandler = (container: HTMLElement): void => {
  if (!container) return;
  
  // Global handler to ensure markers and popups stay visible and interactive
  container.addEventListener('click', (e) => {
    // Don't interfere with popup interactions
    if ((e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
      return;
    }
    
    // Don't interfere with marker interactions
    if ((e.target as HTMLElement)?.closest('.mapboxgl-marker, .custom-marker, .emergency-marker')) {
      return;
    }
    
    // Prevent clicks on the map from bubbling up to parent elements
    e.stopPropagation();
    
    // Log click for debugging
    console.log('Click on map container detected');
    
    // Force markers to remain visible after clicks
    setTimeout(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.opacity = '1';
          marker.style.zIndex = '9999';
          marker.style.pointerEvents = 'auto';
        }
      });
      
      // Ensure map canvas is visible
      const canvas = document.querySelector('.mapboxgl-canvas');
      if (canvas instanceof HTMLElement) {
        canvas.style.visibility = 'visible';
        canvas.style.display = 'block';
        canvas.style.opacity = '1';
      }
    }, 100);
  });
};
