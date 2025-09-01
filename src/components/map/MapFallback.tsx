import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

interface MapFallbackProps {
  location?: { lat: number; lng: number };
  error?: Error;
  height?: string;
}

const MapFallback: React.FC<MapFallbackProps> = ({ 
  location, 
  error, 
  height = "350px" 
}) => {
  return (
    <div 
      className="rounded-lg border border-[#1a202c] bg-[#091020]/60 flex flex-col items-center justify-center text-gray-400 p-6"
      style={{ height }}
    >
      {error ? (
        <>
          <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
          <p className="text-center text-red-400 font-semibold mb-2">Map Loading Error</p>
          <p className="text-center text-sm text-gray-500">
            Unable to load the interactive map. Please try refreshing the page.
          </p>
        </>
      ) : (
        <>
          <MapPin className="w-12 h-12 text-[#5B9BD5] mb-4" />
          <p className="text-center font-semibold mb-2">Interactive Map</p>
          {location && (
            <p className="text-center text-sm">
              Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
          <p className="text-center text-sm text-gray-500 mt-2">
            Loading map functionality...
          </p>
        </>
      )}
    </div>
  );
};

export default MapFallback;