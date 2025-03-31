
/**
 * Utility functions for handling Google Maps info windows
 */

import { toast } from "sonner";

/**
 * Applies fixes to make info windows visible and properly styled
 * Call this after Google Maps has loaded
 */
export function fixInfoWindowVisibility() {
  try {
    // Wait for Google Maps to be ready
    if (typeof google === 'undefined' || !google.maps) {
      console.log('Google Maps not yet loaded, will retry');
      setTimeout(fixInfoWindowVisibility, 500);
      return;
    }
    
    // Find all Google Maps info windows on the page
    const infoWindows = document.querySelectorAll('.gm-style-iw-c, .gm-style-iw-d');
    
    if (infoWindows.length === 0) {
      console.log('No info windows found yet');
      return;
    }
    
    console.log(`Found ${infoWindows.length} info windows to fix`);
    
    // Apply style fixes to each info window
    infoWindows.forEach((infoWindow, index) => {
      if (infoWindow instanceof HTMLElement) {
        // Set background color directly in style
        infoWindow.style.backgroundColor = '#131a2a';
        infoWindow.style.color = 'white';
        infoWindow.style.visibility = 'visible';
        infoWindow.style.display = 'block';
        infoWindow.style.opacity = '1';
        
        // Also fix all child elements
        const children = infoWindow.querySelectorAll('*');
        children.forEach(child => {
          if (child instanceof HTMLElement) {
            child.style.backgroundColor = '#131a2a';
            if (child.tagName.toLowerCase() !== 'h3') {
              child.style.color = 'white';
            }
          }
        });
        
        console.log(`Fixed info window ${index + 1}`);
      }
    });
    
    // Fix the tip/arrow element
    const arrows = document.querySelectorAll('.gm-style-iw-t::after, .gm-style-iw-tc::after');
    arrows.forEach(arrow => {
      if (arrow instanceof HTMLElement) {
        arrow.style.backgroundColor = '#131a2a';
      }
    });
    
    // Add a mutation observer to fix dynamically added info windows
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (node.classList.contains('gm-style-iw-c') || 
                  node.classList.contains('gm-style-iw-d')) {
                node.style.backgroundColor = '#131a2a';
                node.style.color = 'white';
              }
              
              // Check for info window elements within added node
              const newInfoWindows = node.querySelectorAll('.gm-style-iw-c, .gm-style-iw-d');
              if (newInfoWindows.length > 0) {
                fixInfoWindowVisibility();
              }
            }
          });
        }
      });
    });
    
    // Start observing the body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
  } catch (error) {
    console.error('Error fixing info window visibility:', error);
  }
}

/**
 * Handle errors when a facility fails to load
 */
export function handleFacilityLoadError(facilityId: string) {
  console.error(`Failed to load facility ${facilityId}`);
  toast.error("Failed to load facility details");
  return {
    id: facilityId,
    name: "Unknown Facility",
    address: "Information unavailable",
    city: "",
    state: "",
    latitude: 0,
    longitude: 0
  };
}
