
import React, { useEffect } from 'react';
import { StorageFacility } from '../../types';
import { removeViewDetailsButtons } from '@/utils/markers';
import StarRating from '@/components/ui/star-rating';

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
          
          // Update star ratings in all popups with our new component
          document.querySelectorAll('.facility-popup-content').forEach(content => {
            // Find the facility for this popup
            const facilityId = content.getAttribute('data-facility-id');
            if (!facilityId) return;
            
            const facility = facilities.find(f => f.id === facilityId);
            if (!facility || !facility.avg_rating) return;
            
            // Find the star rating container or create one
            let ratingContainer = content.querySelector('.star-rating-container');
            if (!ratingContainer) {
              // Try to find where to insert the rating (after the title)
              const title = content.querySelector('h3');
              if (!title || !title.parentNode) return;
              
              // Create a container for the star rating
              ratingContainer = document.createElement('div');
              ratingContainer.className = 'star-rating-container mb-3';
              title.parentNode.insertBefore(ratingContainer, title.nextSibling);
            }
            
            // Replace with stars rendered directly in the DOM
            const stars = Array.from({ length: 5 }, (_, i) => {
              const filled = i < Math.round(facility.avg_rating || 0);
              return `
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="${filled ? '#FBBF24' : 'none'}" 
                  stroke="${filled ? '#FBBF24' : '#6B7280'}" 
                  stroke-width="1.5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  class="star-icon"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              `;
            }).join('');
            
            ratingContainer.innerHTML = stars;
            ratingContainer.style.display = 'flex';
            ratingContainer.style.gap = '4px';
            ratingContainer.style.marginBottom = '12px';
            ratingContainer.style.opacity = '1';
            ratingContainer.style.visibility = 'visible';
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
