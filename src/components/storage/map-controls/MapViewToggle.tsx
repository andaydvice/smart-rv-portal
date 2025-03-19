
import React from 'react';

interface MapViewToggleProps {
  showFilteredLocations: boolean;
  useGoogleMaps: boolean;
  onToggleFilteredLocations: () => void;
  onToggleMapView: () => void;
}

const MapViewToggle: React.FC<MapViewToggleProps> = ({
  showFilteredLocations,
  useGoogleMaps,
  onToggleFilteredLocations,
  onToggleMapView
}) => {
  return (
    <div className="flex space-x-2">
      <button 
        onClick={onToggleFilteredLocations} 
        className="bg-[#151A22] hover:bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors"
      >
        <span>{showFilteredLocations ? 'Standard View' : 'Filtered Locations Demo'}</span>
      </button>
      {!showFilteredLocations && (
        <button 
          onClick={onToggleMapView} 
          className="bg-[#151A22] hover:bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors"
        >
          <span>{useGoogleMaps ? 'Switch to Mapbox' : 'Switch to Google Maps'}</span>
        </button>
      )}
    </div>
  );
};

export default MapViewToggle;
