
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';

// Helper function to normalize state names consistently
const normalizeStateName = (stateAbbr: string): string => {
  return stateAbbr === 'AZ' ? 'Arizona' : 
         stateAbbr === 'CA' ? 'California' : 
         stateAbbr === 'CO' ? 'Colorado' :
         stateAbbr === 'TX' ? 'Texas' :
         stateAbbr === 'FL' ? 'Florida' :
         stateAbbr === 'NV' ? 'Nevada' :
         stateAbbr === 'GA' ? 'Georgia' :
         stateAbbr === 'IA' ? 'Iowa' :
         stateAbbr === 'MN' ? 'Minnesota' :
         stateAbbr === 'WI' ? 'Wisconsin' :
         stateAbbr === 'OR' ? 'Oregon' :
         stateAbbr === 'PA' ? 'Pennsylvania' :
         stateAbbr === 'NY' ? 'New York' :
         stateAbbr === 'OH' ? 'Ohio' :
         stateAbbr === 'IN' ? 'Indiana' :
         stateAbbr;
};

// Helper function to get state abbreviation
const getStateAbbreviation = (fullStateName: string): string => {
  if (fullStateName === 'Arizona') return 'AZ';
  if (fullStateName === 'California') return 'CA';
  if (fullStateName === 'Colorado') return 'CO';
  if (fullStateName === 'Texas') return 'TX';
  if (fullStateName === 'Florida') return 'FL';
  if (fullStateName === 'Nevada') return 'NV';
  if (fullStateName === 'Georgia') return 'GA';
  if (fullStateName === 'Iowa') return 'IA';
  if (fullStateName === 'Minnesota') return 'MN';
  if (fullStateName === 'Wisconsin') return 'WI';
  if (fullStateName === 'Oregon') return 'OR';
  if (fullStateName === 'Pennsylvania') return 'PA';
  if (fullStateName === 'New York') return 'NY';
  if (fullStateName === 'Ohio') return 'OH';
  if (fullStateName === 'Indiana') return 'IN';
  return fullStateName;
};

/**
 * Creates a facility marker with proper visibility and positioning
 */
export const createFacilityMarker = (
  facility: StorageFacility,
  map: mapboxgl.Map,
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void
): mapboxgl.Marker | null => {
  if (!map || !map.loaded() || !facility.latitude || !facility.longitude) {
    console.warn(`Cannot create marker for facility ${facility.id}: Map not loaded or missing coordinates`);
    return null;
  }
  
  // Validate coordinates
  const lat = Number(facility.latitude);
  const lng = Number(facility.longitude);
  
  if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    console.warn(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
    return null;
  }
  
  console.log(`Creating marker for facility ${facility.id} - ${facility.name} (${facility.state}) at [${lng}, ${lat}]`);
  
  // Check if zoom level is close enough to show green markers
  const isZoomedIn = map.getZoom() > 10;
  
  // Choose color based on highlighted state and zoom level
  const markerColor = isHighlighted ? '#10B981' : (isZoomedIn ? '#10B981' : '#5B9BD5');
  
  // Create marker element
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.id = `marker-${facility.id}`;
  
  // Set data attributes for debugging and state filtering
  el.setAttribute('data-facility-id', facility.id);
  el.setAttribute('data-state', facility.state);
  el.setAttribute('data-state-abbr', getStateAbbreviation(facility.state));
  el.setAttribute('data-highlighted', isHighlighted ? 'true' : 'false');
  el.setAttribute('data-zoomed', isZoomedIn ? 'true' : 'false');
  
  // Set proper styling
  el.style.cssText = `
    background-color: ${markerColor} !important;
    width: ${isHighlighted ? '28px' : '24px'};
    height: ${isHighlighted ? '28px' : '24px'};
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    box-shadow: ${isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.3)'};
    z-index: ${isHighlighted ? '999' : '99'};
    transform: translate(-50%, -50%) ${isHighlighted ? 'scale(1.2)' : ''};
    visibility: visible !important;
    display: block !important;
    opacity: 1 !important;
  `;
  
  // Create properly positioned popup
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    className: 'facility-popup',
    offset: 15,
    focusAfterOpen: false
  });
  
  // Set popup content without "View Details" button
  popup.setHTML(`
    <div class="facility-popup-content" data-facility-id="${facility.id}">
      <h3 class="text-lg font-semibold mb-1">${facility.name}</h3>
      <p class="text-sm mb-1">${facility.city}, ${facility.state}</p>
      <p class="text-sm mb-2">${facility.address}</p>
      ${facility.price_range ? 
        `<p class="text-sm text-gray-300">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>` : ''}
    </div>
  `);
  
  // Create marker
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center'
  })
  .setLngLat([lng, lat])
  .setPopup(popup);
  
  // Add to map
  marker.addTo(map);
  console.log(`Marker added to map for facility ${facility.id}`);
  
  // Add click handler
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    // Call the onClick callback
    onMarkerClick(facility.id);
    console.log(`Marker clicked for facility ${facility.id}`);
  });
  
  // Add zoom change handler to update marker colors
  map.on('zoom', () => {
    const zoomedIn = map.getZoom() > 10;
    
    // Only update if zoom state changed
    if (zoomedIn && el.getAttribute('data-zoomed') !== 'true') {
      el.style.backgroundColor = isHighlighted ? '#10B981' : '#10B981';
      el.setAttribute('data-zoomed', 'true');
    } else if (!zoomedIn && el.getAttribute('data-zoomed') === 'true') {
      el.style.backgroundColor = isHighlighted ? '#10B981' : '#5B9BD5';
      el.setAttribute('data-zoomed', 'false');
    }
  });
  
  return marker;
};

/**
 * Efficiently creates markers for a set of facilities
 */
export const createMarkersForState = (
  facilities: StorageFacility[],
  map: mapboxgl.Map,
  highlightedFacility: string | null,
  onMarkerClick: (facilityId: string) => void,
  state: string | null = null
): mapboxgl.Marker[] => {
  // Clear existing markers for this state first
  document.querySelectorAll(`.mapboxgl-marker[data-state="${state}"], .custom-marker[data-state="${state}"]`)
    .forEach(marker => {
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    });
  
  // If a state is specified, also check for its abbreviation
  if (state) {
    const stateAbbr = getStateAbbreviation(state);
    document.querySelectorAll(`.mapboxgl-marker[data-state-abbr="${stateAbbr}"], .custom-marker[data-state-abbr="${stateAbbr}"]`)
      .forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
  }
  
  // Filter facilities by state if specified
  let stateFacilities = facilities;
  
  if (state) {
    const stateAbbr = getStateAbbreviation(state);
    const normalizedState = normalizeStateName(state);
    
    // Match by full name or abbreviation
    stateFacilities = facilities.filter(f => 
      f.state === state || 
      f.state === normalizedState || 
      getStateAbbreviation(f.state) === state || 
      f.state === stateAbbr
    );
  }
  
  console.log(`Creating ${stateFacilities.length} markers for ${state || 'all states'}`);
  console.log(`States in filtered facilities: ${[...new Set(stateFacilities.map(f => f.state))].join(', ')}`);
  
  // Create markers
  const markers: mapboxgl.Marker[] = [];
  stateFacilities.forEach(facility => {
    const marker = createFacilityMarker(
      facility,
      map,
      facility.id === highlightedFacility,
      onMarkerClick
    );
    
    if (marker) {
      markers.push(marker);
    }
  });
  
  console.log(`Successfully created ${markers.length} markers out of ${stateFacilities.length} facilities`);
  
  return markers;
};

/**
 * Removes all markers from the map
 */
export const clearAllMarkers = () => {
  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
};

// Add debugging function to count markers on the map
export const countMarkersOnMap = () => {
  const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
  console.log(`Total markers on map: ${markers.length}`);
  return markers.length;
};

// Add function to force markers to be visible
export const forceMarkersVisible = () => {
  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
    if (marker instanceof HTMLElement) {
      marker.style.visibility = 'visible';
      marker.style.display = 'block';
      marker.style.opacity = '1';
      marker.style.zIndex = '999';
    }
  });
};
