
import React, { useEffect } from 'react';
import { StorageFacility } from '../../types';
import { STATE_NAME_MAP, getAllStateRepresentations } from '@/utils/stateNameUtils';
import mapboxgl from 'mapbox-gl';

interface EmergencyMarkerRendererProps {
  map: mapboxgl.Map | null;
  facilities: StorageFacility[];
  selectedState: string | null;
}

/**
 * Component that renders emergency markers as a fallback
 * when regular markers aren't visible
 */
const EmergencyMarkerRenderer: React.FC<EmergencyMarkerRendererProps> = ({ 
  map, 
  facilities, 
  selectedState 
}) => {
  useEffect(() => {
    if (!map || !selectedState) return;
    
    // Wait a bit to see if regular markers appear
    const timeout = setTimeout(() => {
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker, .custom-marker, .emergency-marker');
      
      if (existingMarkers.length === 0) {
        // No markers visible, create emergency markers for the selected state
        createEmergencyMarkersForState(map, facilities, selectedState);
      }
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [map, facilities, selectedState]);
  
  return null; // This is a utility component with no UI
};

/**
 * Create emergency markers for a specific state
 */
const createEmergencyMarkersForState = (
  map: mapboxgl.Map, 
  facilities: StorageFacility[], 
  selectedState: string
) => {
  console.log(`Creating emergency markers for state: ${selectedState}`);
  
  // Get all possible representations of the selected state
  const stateRepresentations = getAllStateRepresentations(selectedState);
  
  // Filter facilities for this state
  const stateFacilities = facilities.filter(f => 
    stateRepresentations.some(stateRep => f.state === stateRep)
  );
  
  if (stateFacilities.length === 0) {
    console.warn(`No facilities found for state: ${selectedState}`);
    
    // Create a hard-coded marker for this state as absolute fallback
    createHardcodedStateMarker(map, selectedState);
    return;
  }
  
  // Create markers for each facility in this state
  stateFacilities.forEach(facility => {
    try {
      if (!facility.latitude || !facility.longitude) return;
      
      const lat = parseFloat(String(facility.latitude));
      const lng = parseFloat(String(facility.longitude));
      
      if (isNaN(lat) || isNaN(lng)) return;
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'emergency-marker';
      el.id = `emergency-marker-${facility.id}`;
      el.style.backgroundColor = '#F97316';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      el.style.cursor = 'pointer';
      el.style.zIndex = '10000';
      
      // Set data attributes for debugging
      el.setAttribute('data-facility-id', facility.id);
      el.setAttribute('data-state', facility.state);
      
      // Create and add the marker
      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map);
      
      console.log(`Created emergency marker for facility: ${facility.name}`);
    } catch (err) {
      console.error(`Error creating emergency marker for ${facility.id}:`, err);
    }
  });
};

/**
 * Create a hardcoded marker for a state as absolute fallback
 */
const createHardcodedStateMarker = (map: mapboxgl.Map, state: string) => {
  // Default coordinates for states
  const stateCoordinates: { [key: string]: [number, number] } = {
    'AZ': [-111.6513, 34.2744],
    'Arizona': [-111.6513, 34.2744],
    'CA': [-119.4179, 36.7783],
    'California': [-119.4179, 36.7783],
    'CO': [-105.7821, 39.5501],
    'Colorado': [-105.7821, 39.5501],
    'TX': [-99.9018, 31.9686],
    'Texas': [-99.9018, 31.9686],
    'FL': [-81.5158, 27.6648],
    'Florida': [-81.5158, 27.6648],
    'NV': [-117.1219, 38.8026],
    'Nevada': [-117.1219, 38.8026],
    'GA': [-83.6431, 33.2487],
    'Georgia': [-83.6431, 33.2487],
    'IA': [-93.0977, 42.0329],
    'Iowa': [-93.0977, 42.0329],
    'MN': [-94.6859, 46.4419],
    'Minnesota': [-94.6859, 46.4419],
    'WI': [-89.6385, 44.2563],
    'Wisconsin': [-89.6385, 44.2563],
    'OR': [-120.5542, 44.1419],
    'Oregon': [-120.5542, 44.1419],
    'PA': [-77.1945, 40.8168],
    'Pennsylvania': [-77.1945, 40.8168],
    'NY': [-74.2179, 43.2994],
    'New York': [-74.2179, 43.2994],
    'OH': [-82.7755, 40.4173],
    'Ohio': [-82.7755, 40.4173],
    'IN': [-86.2816, 39.8647],
    'Indiana': [-86.2816, 39.8647]
  };
  
  // Get coordinates for this state
  const coordinates = stateCoordinates[state] || [-98.5795, 39.8283]; // Default to center of US
  
  // Create marker element
  const el = document.createElement('div');
  el.className = 'emergency-marker fallback-state-marker';
  el.id = `emergency-marker-${state}`;
  el.style.backgroundColor = '#F97316';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.borderRadius = '50%';
  el.style.border = '3px solid white';
  el.style.boxShadow = '0 0 15px rgba(249,115,22,0.8)';
  el.style.cursor = 'pointer';
  el.style.zIndex = '10001';
  
  // Set data attributes
  el.setAttribute('data-state', state);
  el.setAttribute('data-emergency', 'true');
  
  // Create and add the marker
  new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .addTo(map);
  
  // Create a popup with state information
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
  })
  .setLngLat(coordinates)
  .setHTML(`
    <div class="text-center p-2">
      <h3 class="text-lg font-bold">${state}</h3>
      <p>Emergency fallback marker</p>
      <p>No facility data available</p>
    </div>
  `);
  
  // Show popup when marker is clicked
  el.addEventListener('click', () => {
    popup.addTo(map);
  });
  
  console.log(`Created fallback marker for state: ${state}`);
};

export default EmergencyMarkerRenderer;
