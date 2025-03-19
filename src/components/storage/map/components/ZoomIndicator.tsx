
import React from 'react';

interface ZoomIndicatorProps {
  zoom: number;
}

const ZoomIndicator: React.FC<ZoomIndicatorProps> = ({ zoom }) => {
  return (
    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
      Zoom: {zoom.toFixed(1)}
    </div>
  );
};

export default ZoomIndicator;
