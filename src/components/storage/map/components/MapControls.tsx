
import React from 'react';

interface MapControlsProps {
  currentZoom: number;
  selectedFacility: { name: string; } | null;
  isZoomedIn: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  currentZoom,
  selectedFacility,
  isZoomedIn
}) => {
  return (
    <>
      {/* Zoom level indicator */}
      <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
        Zoom: {currentZoom.toFixed(1)}
      </div>

      {/* Selected facility indicator */}
      {selectedFacility && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-10">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isZoomedIn ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-white text-sm">{selectedFacility.name}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MapControls;
