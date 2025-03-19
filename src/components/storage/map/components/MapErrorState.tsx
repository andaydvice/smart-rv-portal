
import React from 'react';

interface MapErrorStateProps {
  error: string;
}

const MapErrorState: React.FC<MapErrorStateProps> = ({ error }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#080F1F] text-white p-4 rounded-lg">
      <p>{error}</p>
    </div>
  );
};

export default MapErrorState;
