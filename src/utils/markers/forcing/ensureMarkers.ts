import mapboxgl from 'mapbox-gl';

/**
 * Ensures markers exist on the map for all facilities
 * @param map The Mapbox GL map instance
 * @param facilities Array of facilities to create markers for
 * @returns Number of markers created
 */
export function ensureMarkersOnMap(map: mapboxgl.Map, facilities: any[]): number {
  if (!map || !facilities || facilities.length === 0) {
    console.warn('Cannot create markers: missing map or facilities');
    return 0;
  }
  
  console.log(`Ensuring markers exist for ${facilities.length} facilities`);
  
  let markersCreated = 0;
  let markersSkipped = 0;
  
  // Keep track of which facility IDs we've already processed
  const processedIds = new Set<string>();
  document.querySelectorAll('.mapboxgl-marker[data-facility-id], .custom-marker[data-facility-id]').forEach(marker => {
    const facilityId = marker.getAttribute('data-facility-id');
    if (facilityId) {
      processedIds.add(facilityId);
    }
  });
  
  // Create markers for facilities that don't already have them
  facilities.forEach(facility => {
    if (!facility.id || processedIds.has(facility.id)) {
      markersSkipped++;
      return;
    }
    
    // Validate coordinates
    const lat = parseFloat(String(facility.latitude));
    const lng = parseFloat(String(facility.longitude));
    
    if (isNaN(lat) || isNaN(lng)) {
      console.warn(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
      markersSkipped++;
      return;
    }
    
    // Create marker element
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.setAttribute('data-facility-id', facility.id);
    markerElement.style.cssText = `
      width: 20px;
      height: 20px;
      background-color: #F97316;
      border-radius: 50%;
      border: 2px solid white;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      z-index: 9999 !important;
    `;
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
      <h3 style="font-weight: bold; margin-bottom: 5px;">${facility.name || 'Storage Facility'}</h3>
      <p style="margin: 0 0 5px 0;">${facility.city || ''}, ${facility.state || ''}</p>
    `;
    
    // Create popup
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      offset: 15,
      className: 'storage-facility-popup'
    }).setDOMContent(popupContent);
    
    // Create and add the marker
    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);
      
    // Add to processed set
    processedIds.add(facility.id);
    markersCreated++;
    
    // Add click handler to marker element
    markerElement.addEventListener('click', () => {
      // Dispatch event for facility selection
      const event = new CustomEvent('marker.clicked', { 
        detail: { facilityId: facility.id }
      });
      document.dispatchEvent(event);
    });
  });
  
  console.log(`Created ${markersCreated} new markers, skipped ${markersSkipped} existing markers`);
  return markersCreated;
}
