
import React from 'react';
import { toast } from "sonner";

interface MapToggleButtonProps {
  useGoogleMaps: boolean;
  toggleMapView: () => void;
}

const MapToggleButton: React.FC<MapToggleButtonProps> = ({
  useGoogleMaps,
  toggleMapView
}) => {
  return (
    <button 
      onClick={toggleMapView} 
      className="bg-[#151A22] hover:bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-colors"
    >
      <span>{useGoogleMaps ? 'Switch to Mapbox' : 'Switch to Google Maps'}</span>
    </button>
  );
};

export default MapToggleButton;
