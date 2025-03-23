
import { StorageFacility } from './types';

export const createPopupHTML = (facility: StorageFacility) => {
  // Safely access features with optional chaining
  const features = facility.features || {};
  
  const featureLabels = {
    indoor: 'Indoor Storage',
    climate_controlled: 'Climate Controlled',
    "24h_access": '24/7 Access',
    security_system: 'Security System',
    vehicle_washing: 'Vehicle Washing'
  };

  const activeFeatures = Object.entries(features)
    .filter(([_, value]) => value)
    .map(([key, _]) => featureLabels[key as keyof typeof featureLabels]);

  // Create rating stars display
  const renderRatingStars = () => {
    if (!facility.avg_rating) return '';
    
    const rating = Number(facility.avg_rating);
    let starsHtml = '<div class="flex items-center gap-1 mt-1 mb-2">';
    
    // Add filled or empty stars
    for (let i = 1; i <= 5; i++) {
      const starColor = i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-500';
      starsHtml += `<span class="${starColor}">★</span>`;
    }
    
    // Add numeric rating and review count
    starsHtml += `<span class="text-xs ml-1 text-gray-300">(${rating.toFixed(1)})</span>`;
    
    if (facility.review_count && facility.review_count > 0) {
      starsHtml += `<span class="text-xs text-gray-400 ml-2">${facility.review_count} ${facility.review_count === 1 ? 'review' : 'reviews'}</span>`;
    }
    
    starsHtml += '</div>';
    return starsHtml;
  };

  return `
    <div class="p-4 bg-[#131a2a] text-white rounded-lg w-full facility-popup-content" data-facility-id="${facility.id}">
      <h3 class="font-bold text-lg mb-1 text-[#60A5FA] truncate">${facility.name}</h3>
      
      ${renderRatingStars()}
      
      <div class="space-y-2 mb-3">
        <div class="flex items-start gap-2 text-gray-300">
          <svg class="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span class="text-xs">${facility.address}, ${facility.city}, ${facility.state}</span>
        </div>
        
        ${facility.contact_phone ? `
          <div class="flex items-center gap-2 text-gray-300">
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span class="text-xs">${facility.contact_phone}</span>
          </div>
        ` : ''}
      </div>

      <div class="flex justify-between items-center py-2 border-y border-gray-700 bg-gradient-to-r from-[#131a2a] to-[#1a2235] rounded-sm px-2 mb-2">
        <div>
          <span class="text-xs text-gray-400">Price Range</span>
          <div class="font-semibold text-[#F97316] text-sm">
            $${facility.price_range?.min || 0} - $${facility.price_range?.max || 0}
          </div>
        </div>
      </div>

      ${activeFeatures.length > 0 ? `
        <div class="mt-2">
          <span class="text-xs text-gray-400 block mb-1">Features</span>
          <div class="flex flex-wrap gap-1">
            ${activeFeatures.map(feature => `
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#1a2235] text-[#60A5FA]">
                ${feature}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <style>
        /* Critical styles to fix popup visibility and interaction issues */
        .mapboxgl-popup {
          z-index: 1500 !important; 
          pointer-events: all !important;
          visibility: visible !important;
          display: block !important;
          max-width: none !important;
          width: auto !important;
          position: absolute !important;
          overflow: visible !important;
          transition: transform 0.3s ease-out !important;
        }
        .mapboxgl-popup-content {
          z-index: 1500 !important;
          padding: 0 !important;
          overflow: visible !important;
          pointer-events: all !important;
          visibility: visible !important;
          min-width: 220px !important;
          width: auto !important;
          max-width: 320px !important;
          border-radius: 8px !important;
          box-shadow: 0 0 20px rgba(0,0,0,0.5) !important;
          position: relative !important;
          transform: none !important;
        }
        .mapboxgl-popup-close-button {
          z-index: 1510 !important;
          color: white !important;
          font-size: 20px !important;
          padding: 5px 10px !important;
          right: 2px !important;
          top: 2px !important;
          pointer-events: all !important;
          cursor: pointer !important;
        }
        .facility-popup-content {
          pointer-events: all !important;
          word-break: break-word !important;
          max-height: none !important;
          overflow: visible !important;
        }
        .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
        .mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
        .mapboxgl-popup-anchor-left .mapboxgl-popup-tip,
        .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
          display: none !important;
        }
        @media (max-width: 640px) {
          .mapboxgl-popup-content {
            max-width: 260px !important;
          }
        }
        
        /* Add styles for auto-scrolling adjustments */
        .popup-needs-adjustment {
          outline: 2px solid rgba(255, 165, 0, 0.5) !important;
        }
        
        /* Custom event dispatch for popup opened */
        document.dispatchEvent(new CustomEvent('mapbox.popup.opened'));
      </style>
    </div>
  `;
};

/**
 * Utility function to check if a popup is partially off-screen
 */
export const isPopupOffScreen = (popup: HTMLElement): boolean => {
  if (!popup) return false;
  
  const rect = popup.getBoundingClientRect();
  
  return (
    rect.top < 0 ||
    rect.left < 0 ||
    rect.bottom > window.innerHeight ||
    rect.right > window.innerWidth
  );
};

/**
 * Utility function to ensure a popup is visible by scrolling the page if needed
 */
export const ensurePopupVisible = (popup: HTMLElement, map?: mapboxgl.Map): void => {
  if (!popup) return;
  
  const rect = popup.getBoundingClientRect();
  
  // Check if popup is partially off-screen
  const isTopCutOff = rect.top < 0;
  const isBottomCutOff = rect.bottom > window.innerHeight;
  const isLeftCutOff = rect.left < 0;
  const isRightCutOff = rect.right > window.innerWidth;
  
  if (isTopCutOff || isBottomCutOff || isLeftCutOff || isRightCutOff) {
    // Add a class to highlight that this popup needs adjustment
    popup.classList.add('popup-needs-adjustment');
    
    // For vertical offscreen, scroll the window
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
    
    // For horizontal offscreen, pan the map if available
    if (map && (isLeftCutOff || isRightCutOff)) {
      const center = map.getCenter();
      if (isLeftCutOff) {
        center.lng -= 0.01; // Small adjustment
        map.panTo(center);
      } else if (isRightCutOff) {
        center.lng += 0.01; // Small adjustment
        map.panTo(center);
      }
    }
    
    // Remove the highlight class after adjustment
    setTimeout(() => {
      popup.classList.remove('popup-needs-adjustment');
    }, 500);
  }
};
