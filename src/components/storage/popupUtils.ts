
import { StorageFacility } from './types';

export const createPopupHTML = (facility: StorageFacility) => {
  const featureLabels = {
    indoor: 'Indoor Storage',
    climate_controlled: 'Climate Controlled',
    "24h_access": '24/7 Access',
    security_system: 'Security System',
    vehicle_washing: 'Vehicle Washing'
  };

  const activeFeatures = Object.entries(facility.features)
    .filter(([_, value]) => value)
    .map(([key, _]) => featureLabels[key as keyof typeof featureLabels]);

  return `
    <div class="p-6 bg-[#131a2a] text-white rounded-lg max-w-md">
      <h3 class="font-bold text-xl mb-3 text-[#60A5FA]">${facility.name}</h3>
      
      <div class="space-y-2 mb-4">
        <div class="flex items-start gap-2 text-gray-300">
          <svg class="w-5 h-5 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span class="text-sm">${facility.address}, ${facility.city}, ${facility.state}</span>
        </div>
        
        ${facility.contact_phone ? `
          <div class="flex items-center gap-2 text-gray-300">
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span class="text-sm">${facility.contact_phone}</span>
          </div>
        ` : ''}
        
        ${facility.contact_email ? `
          <div class="flex items-center gap-2 text-gray-300">
            <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span class="text-sm">${facility.contact_email}</span>
          </div>
        ` : ''}
      </div>

      <div class="flex justify-between items-center py-3 border-y border-gray-700 bg-gradient-to-r from-[#131a2a] to-[#1a2235] rounded-sm px-2">
        <div>
          <span class="text-sm text-gray-400">Price Range</span>
          <div class="font-semibold text-[#F97316]">
            $${facility.price_range.min} - $${facility.price_range.max}
          </div>
        </div>
      </div>

      ${activeFeatures.length > 0 ? `
        <div class="mt-4">
          <span class="text-sm text-gray-400 block mb-2">Features</span>
          <div class="flex flex-wrap gap-2">
            ${activeFeatures.map(feature => `
              <span class="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#1a2235] text-[#60A5FA]">
                ${feature}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <style>
        /* Custom styles to ensure popup stays visible */
        .mapboxgl-popup-content {
          z-index: 9999 !important;
        }
        .mapboxgl-popup {
          z-index: 9999 !important;
        }
      </style>
    </div>
  `;
};
