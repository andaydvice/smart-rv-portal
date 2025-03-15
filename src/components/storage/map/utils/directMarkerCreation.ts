
import { StorageFacility } from '../../types';
import mapboxgl from 'mapbox-gl';

// Create direct markers that aren't managed by Mapbox
export const createDirectMarkers = (facilities: StorageFacility[], map: mapboxgl.Map) => {
  // Start by removing existing markers to prevent duplicates
  document.querySelectorAll('.direct-marker').forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
  
  document.querySelectorAll('.direct-popup').forEach(popup => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  });
  
  console.log(`Creating ${facilities.length} direct markers`);
  
  // Create a marker for each facility
  facilities.forEach(facility => {
    // Skip invalid coordinates
    if (!facility.latitude || !facility.longitude) {
      console.warn(`Missing coordinates for facility ${facility.id}`);
      return;
    }
    
    const lat = parseFloat(String(facility.latitude));
    const lng = parseFloat(String(facility.longitude));
    
    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      console.warn(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
      return;
    }
    
    try {
      // Convert lat/lng to pixel coordinates
      const { x, y } = map.project([lng, lat]);
      
      // Create marker element
      const marker = document.createElement('div');
      marker.className = 'direct-marker';
      marker.id = `direct-marker-${facility.id}`;
      
      // Set data attributes for debugging and filtering
      marker.setAttribute('data-facility-id', facility.id);
      marker.setAttribute('data-state', facility.state);
      marker.setAttribute('data-lat', lat.toString());
      marker.setAttribute('data-lng', lng.toString());
      
      // Cast to HTMLElement to fix TypeScript errors for style property
      const markerElement = marker as HTMLElement;
      
      // Set styling to ensure visibility
      markerElement.style.position = 'absolute';
      markerElement.style.left = `${x}px`;
      markerElement.style.top = `${y}px`;
      markerElement.style.backgroundColor = '#F97316';
      markerElement.style.width = '24px';
      markerElement.style.height = '24px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '2px solid white';
      markerElement.style.cursor = 'pointer';
      markerElement.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      markerElement.style.zIndex = '9999';
      markerElement.style.transform = 'translate(-50%, -50%)';
      markerElement.style.visibility = 'visible';
      markerElement.style.display = 'block';
      markerElement.style.opacity = '1';
      markerElement.style.pointerEvents = 'auto';
      
      // Create popup element
      const popup = document.createElement('div');
      popup.className = 'direct-popup';
      popup.id = `direct-popup-${facility.id}`;
      
      // Cast to HTMLElement for TypeScript
      const popupElement = popup as HTMLElement;
      
      // Style the popup
      popupElement.style.position = 'absolute';
      popupElement.style.left = `${x}px`;
      popupElement.style.top = `${y - 15}px`;
      popupElement.style.transform = 'translate(-50%, -100%)';
      popupElement.style.backgroundColor = '#131a2a';
      popupElement.style.color = 'white';
      popupElement.style.padding = '12px';
      popupElement.style.borderRadius = '4px';
      popupElement.style.minWidth = '220px';
      popupElement.style.maxWidth = '300px';
      popupElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      popupElement.style.zIndex = '10000';
      popupElement.style.display = 'none';
      popupElement.style.visibility = 'hidden';
      popupElement.style.pointerEvents = 'auto';
      
      // Set popup content
      popup.innerHTML = `
        <div class="p-2">
          <h3 class="text-lg font-semibold mb-1 text-[#60A5FA]">${facility.name}</h3>
          <div class="space-y-1 text-sm">
            <p>${facility.address}</p>
            <p>${facility.city}, ${facility.state}</p>
            ${facility.price_range ? 
              `<p class="mt-2 font-semibold text-[#F97316]">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>` : ''}
            ${facility.contact_phone ? `<p class="mt-1">Phone: ${facility.contact_phone}</p>` : ''}
          </div>
          
          ${Object.values(facility.features).some(v => v) ? `
            <div class="mt-2 border-t border-gray-700 pt-2">
              <p class="text-xs text-gray-400 mb-1">Features:</p>
              <div class="flex flex-wrap gap-1">
                ${facility.features.indoor ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Indoor</span>' : ''}
                ${facility.features.climate_controlled ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Climate Controlled</span>' : ''}
                ${facility.features["24h_access"] ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">24/7 Access</span>' : ''}
                ${facility.features.security_system ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Security</span>' : ''}
                ${facility.features.vehicle_washing ? '<span class="text-xs bg-[#1a2235] text-[#60A5FA] px-2 py-0.5 rounded">Vehicle Washing</span>' : ''}
              </div>
            </div>
          ` : ''}
        </div>
      `;
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '×';
      closeButton.className = 'absolute top-1 right-1 text-lg font-bold text-gray-400 hover:text-white';
      
      // Cast to HTMLElement
      const closeButtonElement = closeButton as HTMLElement;
      closeButtonElement.style.position = 'absolute';
      closeButtonElement.style.top = '4px';
      closeButtonElement.style.right = '8px';
      closeButtonElement.style.fontSize = '20px';
      closeButtonElement.style.fontWeight = 'bold';
      closeButtonElement.style.color = '#aaa';
      closeButtonElement.style.cursor = 'pointer';
      closeButtonElement.style.background = 'none';
      closeButtonElement.style.border = 'none';
      
      // Add click handler to close button
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        popupElement.style.display = 'none';
        popupElement.style.visibility = 'hidden';
        popup.classList.remove('visible');
        popup.classList.remove('clicked');
      });
      
      popup.appendChild(closeButton);
      
      // Add to map container
      const mapContainer = map.getContainer();
      mapContainer.appendChild(marker);
      mapContainer.appendChild(popup);
      
      // Add marker click event
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Toggle popup
        const isVisible = popup.classList.contains('visible');
        
        // Hide all other popups first
        document.querySelectorAll('.direct-popup').forEach(p => {
          if (p.id !== popup.id) {
            p.classList.remove('visible');
            p.classList.remove('clicked');
            (p as HTMLElement).style.display = 'none';
            (p as HTMLElement).style.visibility = 'hidden';
          }
        });
        
        if (isVisible) {
          // Hide this popup
          popupElement.style.display = 'none';
          popupElement.style.visibility = 'hidden';
          popup.classList.remove('visible');
          popup.classList.remove('clicked');
        } else {
          // Show this popup
          popupElement.style.display = 'block';
          popupElement.style.visibility = 'visible';
          popup.classList.add('visible');
          popup.classList.add('clicked');
        }
      });
      
      // Update marker position on map move
      map.on('move', () => {
        // Recalculate position
        const newPos = map.project([lng, lat]);
        
        // Update marker position
        markerElement.style.left = `${newPos.x}px`;
        markerElement.style.top = `${newPos.y}px`;
        
        // Update popup position
        popupElement.style.left = `${newPos.x}px`;
        popupElement.style.top = `${newPos.y - 15}px`;
      });
      
    } catch (err) {
      console.error(`Error creating marker for facility ${facility.id}:`, err);
    }
  });
  
  console.log(`Created ${facilities.length} direct markers`);
};
