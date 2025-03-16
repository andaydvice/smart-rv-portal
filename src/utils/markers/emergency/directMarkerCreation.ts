
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../types';
import { createEdgeAwareClickHandler } from '../forcing/preventEdgeCutoff';

/**
 * Create emergency-style markers for facilities (direct DOM creation)
 */
export function createEmergencyMarkers(
  map: mapboxgl.Map,
  facilities: StorageFacility[]
): number {
  console.log(`Creating ${facilities.length} emergency markers`);
  
  // Remove existing emergency markers to avoid duplicates
  document.querySelectorAll('.emergency-marker').forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
  
  // Add styles for emergency markers
  injectEmergencyMarkerStyles();
  
  let count = 0;
  
  // Create markers for each facility
  facilities.forEach(facility => {
    if (!facility.latitude || !facility.longitude) return;
    
    const lat = parseFloat(String(facility.latitude));
    const lng = parseFloat(String(facility.longitude));
    
    if (isNaN(lat) || isNaN(lng)) return;
    
    try {
      // Convert geo coordinates to pixel coordinates
      const point = map.project(new mapboxgl.LngLat(lng, lat));
      
      // Create marker element
      const marker = document.createElement('div');
      marker.id = `direct-marker-${facility.id}`;
      marker.className = 'emergency-marker direct-marker';
      marker.setAttribute('data-facility-id', facility.id);
      marker.setAttribute('data-lat', String(lat));
      marker.setAttribute('data-lng', String(lng));
      
      // Position marker
      marker.style.position = 'absolute';
      marker.style.left = `${point.x}px`;
      marker.style.top = `${point.y}px`;
      marker.style.transform = 'translate(-50%, -50%)';
      
      // Create popup content
      const popup = document.createElement('div');
      popup.id = `direct-popup-${facility.id}`;
      popup.className = 'direct-popup';
      popup.setAttribute('data-facility-id', facility.id);
      
      // Style popup initially hidden
      popup.style.position = 'absolute';
      popup.style.left = `${point.x}px`;
      popup.style.top = `${point.y - 140}px`;
      popup.style.transform = 'translate(-50%, -100%)';
      popup.style.backgroundColor = '#151A22';
      popup.style.color = 'white';
      popup.style.padding = '15px';
      popup.style.borderRadius = '8px';
      popup.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
      popup.style.zIndex = '-9999';
      popup.style.visibility = 'hidden';
      popup.style.display = 'none';
      popup.style.width = '300px';
      popup.style.maxWidth = '300px';
      popup.style.pointerEvents = 'auto';
      popup.style.border = '1px solid rgb(55 65 81)';
      
      // Create popup content
      popup.innerHTML = `
        <div class="popup-content p-4">
          <button class="popup-close" style="position: absolute; right: 10px; top: 10px; color: white; font-size: 16px; background: none; border: none; cursor: pointer;">×</button>
          <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #60A5FA;">${facility.name}</h3>
          <div style="margin-bottom: 8px;">
            <p style="margin: 0;">${facility.address}</p>
            <p style="margin: 0;">${facility.city}, ${facility.state}</p>
            <p style="margin: 8px 0 0; font-weight: 600; color: #F97316;">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>
            ${facility.contact_phone ? `<p style="margin: 4px 0 0;">Phone: ${facility.contact_phone}</p>` : ''}
          </div>
          
          ${Object.values(facility.features).some(v => v) ? `
            <div style="margin-top: 12px; border-top: 1px solid rgb(75 85 99); padding-top: 12px;">
              <p style="font-size: 12px; color: rgb(156 163 175); margin: 0 0 6px;">Features:</p>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${facility.features.indoor ? '<span style="font-size: 12px; background-color: rgb(31 41 55); color: #60A5FA; padding: 2px 8px; border-radius: 4px;">Indoor</span>' : ''}
                ${facility.features.climate_controlled ? '<span style="font-size: 12px; background-color: rgb(31 41 55); color: #60A5FA; padding: 2px 8px; border-radius: 4px;">Climate Controlled</span>' : ''}
                ${facility.features["24h_access"] ? '<span style="font-size: 12px; background-color: rgb(31 41 55); color: #60A5FA; padding: 2px 8px; border-radius: 4px;">24/7 Access</span>' : ''}
                ${facility.features.security_system ? '<span style="font-size: 12px; background-color: rgb(31 41 55); color: #60A5FA; padding: 2px 8px; border-radius: 4px;">Security</span>' : ''}
                ${facility.features.vehicle_washing ? '<span style="font-size: 12px; background-color: rgb(31 41 55); color: #60A5FA; padding: 2px 8px; border-radius: 4px;">Vehicle Washing</span>' : ''}
              </div>
            </div>
          ` : ''}
        </div>
      `;
      
      // Add marker and popup to map
      map.getContainer().appendChild(marker);
      map.getContainer().appendChild(popup);
      
      // Create edge-aware click handler for the marker
      const edgeAwareHandler = createEdgeAwareClickHandler(
        map,
        [lng, lat],
        () => {
          // Close all other popups
          document.querySelectorAll('.direct-popup').forEach(p => {
            if (p.id !== popup.id) {
              p.style.display = 'none';
              p.style.visibility = 'hidden';
              p.style.opacity = '0';
              p.style.zIndex = '-9999';
              p.classList.remove('visible');
              p.classList.remove('clicked');
            }
          });
          
          // Toggle this popup
          if (popup.style.display === 'none' || popup.style.visibility === 'hidden') {
            popup.style.display = 'block';
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            popup.style.zIndex = '10000';
            popup.classList.add('visible');
            popup.classList.add('clicked');
            
            // Highlight the marker
            marker.style.backgroundColor = '#10B981';
            marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
            marker.style.zIndex = '10000';
            marker.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';
          } else {
            popup.style.display = 'none';
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
            popup.style.zIndex = '-9999';
            popup.classList.remove('visible');
            popup.classList.remove('clicked');
            
            // Reset marker
            marker.style.backgroundColor = '#F97316';
            marker.style.transform = 'translate(-50%, -50%) scale(1)';
            marker.style.zIndex = '9999';
            marker.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
          }
        }
      );
      
      // Add edge-aware click handler to marker
      marker.addEventListener('click', edgeAwareHandler);
      
      // Store handler reference
      const handlerName = `emergency_marker_${facility.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
      (window as any)[handlerName] = edgeAwareHandler;
      marker.setAttribute('data-click-handler', handlerName);
      marker.setAttribute('data-edge-aware', 'true');
      
      // Add close button handler
      const closeButton = popup.querySelector('.popup-close');
      if (closeButton) {
        closeButton.addEventListener('click', (e) => {
          e.stopPropagation();
          popup.style.display = 'none';
          popup.style.visibility = 'hidden';
          popup.style.opacity = '0';
          popup.style.zIndex = '-9999';
          popup.classList.remove('visible');
          popup.classList.remove('clicked');
          
          // Reset marker
          marker.style.backgroundColor = '#F97316';
          marker.style.transform = 'translate(-50%, -50%) scale(1)';
          marker.style.zIndex = '9999';
          marker.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        });
      }
      
      count++;
    } catch (error) {
      console.error(`Error creating emergency marker for ${facility.name}:`, error);
    }
  });
  
  console.log(`Successfully created ${count} emergency markers`);
  
  // Update marker positions when map moves
  map.on('move', () => {
    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;
      
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (isNaN(lat) || isNaN(lng)) return;
      
      try {
        // Convert geo coordinates to pixel coordinates
        const point = map.project(new mapboxgl.LngLat(lng, lat));
        
        // Update marker position
        const marker = document.getElementById(`direct-marker-${facility.id}`);
        if (marker) {
          marker.style.left = `${point.x}px`;
          marker.style.top = `${point.y}px`;
        }
        
        // Update popup position
        const popup = document.getElementById(`direct-popup-${facility.id}`);
        if (popup) {
          popup.style.left = `${point.x}px`;
          popup.style.top = `${point.y - 140}px`;
        }
      } catch (error) {
        console.error(`Error updating emergency marker position for ${facility.name}:`, error);
      }
    });
  });
  
  return count;
}

/**
 * Set up event listeners for emergency markers
 */
export function setupEmergencyMarkerListeners(
  onMarkerClick: (facilityId: string) => void
): () => void {
  // Add click handlers for all direct markers
  document.querySelectorAll('.direct-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      const facilityId = marker.getAttribute('data-facility-id');
      if (facilityId) {
        // Add click handler to call the onMarkerClick callback
        const handleClick = (e: MouseEvent) => {
          e.stopPropagation();
          console.log(`Direct marker clicked: ${facilityId}`);
          onMarkerClick(facilityId);
        };
        
        // Store reference to handler
        const handlerName = `direct_marker_${facilityId.replace(/[^a-zA-Z0-9]/g, '_')}`;
        (window as any)[handlerName] = handleClick;
        
        // Add handler
        marker.addEventListener('click', handleClick);
        marker.setAttribute('data-click-handler', handlerName);
      }
    }
  });
  
  // Return cleanup function
  return () => {
    document.querySelectorAll('.direct-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        const handlerName = marker.getAttribute('data-click-handler');
        if (handlerName && (window as any)[handlerName]) {
          marker.removeEventListener('click', (window as any)[handlerName]);
          delete (window as any)[handlerName];
        }
      }
    });
  };
}

/**
 * Inject emergency marker styles into the document
 */
export function injectEmergencyMarkerStyles(): void {
  if (document.getElementById('emergency-marker-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'emergency-marker-styles';
  style.textContent = `
    .emergency-marker,
    .direct-marker {
      width: 24px !important;
      height: 24px !important;
      border-radius: 50% !important;
      background-color: #F97316 !important;
      border: 2px solid white !important;
      box-shadow: 0 0 10px rgba(0,0,0,0.5) !important;
      transform: translate(-50%, -50%) !important;
      cursor: pointer !important;
      position: absolute !important;
      z-index: 9999 !important;
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    .direct-popup {
      z-index: -9999 !important;
      position: absolute !important;
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: opacity 0.2s !important;
    }
    
    .direct-popup.visible,
    .direct-popup.clicked {
      z-index: 10000 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    .popup-close {
      cursor: pointer !important;
      font-size: 20px !important;
      padding: 0 !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 50% !important;
      background: rgba(0, 0, 0, 0.2) !important;
      transition: background 0.2s !important;
    }
    
    .popup-close:hover {
      background: rgba(0, 0, 0, 0.4) !important;
    }
  `;
  
  document.head.appendChild(style);
}
