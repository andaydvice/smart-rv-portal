
import { StorageFacility } from '../types';
import mapboxgl from 'mapbox-gl';

/**
 * Create a popup element for a facility
 */
export function createFacilityPopup(
  facility: StorageFacility,
  point: mapboxgl.Point,
  facilityId: string
): HTMLElement {
  // Create popup element
  const popup = document.createElement('div');
  popup.id = `direct-popup-${facilityId}`;
  popup.className = 'direct-popup';
  popup.setAttribute('data-facility-id', facilityId);
  
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
  popup.innerHTML = getFacilityPopupHTML(facility);
  
  return popup;
}

/**
 * Create an HTML string for the facility popup content
 */
export function getFacilityPopupHTML(facility: StorageFacility): string {
  return `
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
}

/**
 * Add close button functionality to a popup
 */
export function setupPopupCloseButton(
  popup: HTMLElement, 
  marker: HTMLElement
): void {
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
}

/**
 * Toggle popup visibility
 */
export function togglePopupVisibility(
  popup: HTMLElement,
  marker: HTMLElement,
  show: boolean
): void {
  if (show) {
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

/**
 * Close all popups except the one with the given ID
 */
export function closeAllPopupsExcept(exceptPopupId: string): void {
  document.querySelectorAll('.direct-popup').forEach(p => {
    if (p.id !== exceptPopupId && p instanceof HTMLElement) {
      p.style.display = 'none';
      p.style.visibility = 'hidden';
      p.style.opacity = '0';
      p.style.zIndex = '-9999';
      p.classList.remove('visible');
      p.classList.remove('clicked');
    }
  });
}
