
import { StorageFacility } from '../../../types';
import { applyPopupStyling } from './styling';

/**
 * Creates a popup element for a facility
 */
export function createPopupElement(
  facility: StorageFacility,
  point: { x: number, y: number },
  options?: {
    backgroundColor?: string;
    textColor?: string;
    minWidth?: number;
    maxWidth?: number;
  }
): HTMLElement {
  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'direct-popup';
  popup.id = `direct-popup-${facility.id}`;
  
  // Position popup
  popup.style.left = `${point.x}px`;
  popup.style.top = `${point.y - 15}px`;
  
  // Apply styling
  applyPopupStyling(popup, options);
  
  // Set popup content
  popup.innerHTML = createPopupContent(facility);
  
  return popup;
}

/**
 * Creates the HTML content for a facility popup
 */
export function createPopupContent(facility: StorageFacility): string {
  return `
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
}

/**
 * Adds a close button to a popup
 */
export function addCloseButton(popup: HTMLElement, onClose?: () => void): HTMLElement {
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.className = 'absolute top-1 right-1 text-lg font-bold text-gray-400 hover:text-white';
  
  // Style the close button
  closeButton.style.position = 'absolute';
  closeButton.style.top = '4px';
  closeButton.style.right = '8px';
  closeButton.style.fontSize = '20px';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.color = '#aaa';
  closeButton.style.cursor = 'pointer';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  
  // Add click handler
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Hide popup
    if (popup instanceof HTMLElement) {
      popup.style.display = 'none';
      popup.style.visibility = 'hidden';
      popup.classList.remove('visible');
      popup.classList.remove('clicked');
    }
    
    // Call optional onClose callback
    if (onClose) onClose();
  });
  
  // Add button to popup
  popup.appendChild(closeButton);
  
  return closeButton;
}

/**
 * Removes existing direct popups from the DOM
 */
export function removeExistingDirectPopups(): void {
  document.querySelectorAll('.direct-popup').forEach(popup => {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  });
}

/**
 * Closes all popups except for the specified one
 */
export function closeAllPopupsExcept(exceptPopupId: string): void {
  document.querySelectorAll('.direct-popup').forEach(popup => {
    if (popup.id !== exceptPopupId && popup instanceof HTMLElement) {
      popup.style.display = 'none';
      popup.style.visibility = 'hidden';
      popup.classList.remove('visible');
      popup.classList.remove('clicked');
    }
  });
}
