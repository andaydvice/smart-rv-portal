
import { StorageFacility } from '../../types';

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

/**
 * Calculates map bounds based on facilities and optional selected state
 */
export const calculateMapBounds = (
  facilities: StorageFacility[],
  selectedState: string | null
): MapBounds | null => {
  // Filter facilities by the selected state if provided
  const facilitiesToUse = selectedState 
    ? facilities.filter(f => f.state === selectedState)
    : facilities;
  
  if (facilitiesToUse.length === 0) {
    return null;
  }
  
  // Initialize bounds with the first facility
  let north = facilitiesToUse[0].latitude;
  let south = facilitiesToUse[0].latitude;
  let east = facilitiesToUse[0].longitude;
  let west = facilitiesToUse[0].longitude;
  
  // Expand bounds to include all facilities
  for (const facility of facilitiesToUse) {
    if (facility.latitude > north) north = facility.latitude;
    if (facility.latitude < south) south = facility.latitude;
    if (facility.longitude > east) east = facility.longitude;
    if (facility.longitude < west) west = facility.longitude;
  }
  
  // Add padding to the bounds
  const latPadding = (north - south) * 0.1;
  const lngPadding = (east - west) * 0.1;
  
  return {
    north: north + latPadding,
    south: south - latPadding,
    east: east + lngPadding,
    west: west - lngPadding
  };
};
