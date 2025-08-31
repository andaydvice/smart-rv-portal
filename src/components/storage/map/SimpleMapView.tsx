import React from 'react';
import { StorageFacility } from '../types';

interface SimpleMapViewProps {
  facilities: StorageFacility[];
  onMarkerClick?: (facilityId: string) => void;
}

const SimpleMapView: React.FC<SimpleMapViewProps> = ({
  facilities,
  onMarkerClick
}) => {
  // Create a simple SVG-based map of the USA
  const mapWidth = 800;
  const mapHeight = 500;
  
  // Convert lat/lng to x/y coordinates on our simple map
  const latLngToXY = (lat: number, lng: number) => {
    // USA bounds approximately
    const minLat = 25, maxLat = 50;
    const minLng = -125, maxLng = -65;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    
    return { x, y };
  };

  return (
    <div className="relative w-full h-[650px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
      {/* Map Title */}
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-white text-lg font-semibold">Storage Facilities Map</h3>
        <p className="text-gray-400 text-sm">{facilities.length} locations available</p>
      </div>

      {/* Simple SVG Map */}
      <svg
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* USA Outline (simplified) */}
        <path
          d="M 100 200 L 150 150 L 250 140 L 400 145 L 550 160 L 650 180 L 700 220 L 680 280 L 650 350 L 600 380 L 500 390 L 400 385 L 300 380 L 200 360 L 150 320 L 120 250 Z"
          fill="rgba(59, 130, 246, 0.1)"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
        />
        
        {/* State Labels */}
        <text x="200" y="250" fill="white" opacity="0.5" fontSize="12">CA</text>
        <text x="400" y="200" fill="white" opacity="0.5" fontSize="12">TX</text>
        <text x="650" y="150" fill="white" opacity="0.5" fontSize="12">NY</text>
        <text x="500" y="250" fill="white" opacity="0.5" fontSize="12">FL</text>
        
        {/* Facility Markers */}
        {facilities.map((facility) => {
          const { x, y } = latLngToXY(
            Number(facility.latitude),
            Number(facility.longitude)
          );
          
          return (
            <g key={facility.id}>
              {/* Marker Circle */}
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="url(#markerGradient)"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-10 transition-all"
                onClick={() => onMarkerClick?.(facility.id)}
              />
              
              {/* Facility Name on Hover */}
              <title>{facility.name} - {facility.city}, {facility.state}</title>
            </g>
          );
        })}
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Facility List */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
        <div className="flex gap-4 overflow-x-auto">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="flex-shrink-0 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors min-w-[200px]"
              onClick={() => onMarkerClick?.(facility.id)}
            >
              <h4 className="text-white font-medium text-sm">{facility.name}</h4>
              <p className="text-gray-400 text-xs">{facility.city}, {facility.state}</p>
              {facility.price_range && (
                <p className="text-blue-400 text-xs mt-1">
                  ${facility.price_range.min} - ${facility.price_range.max}/mo
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* No External Dependencies Notice */}
      <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs">
        ✓ No API Required
      </div>
    </div>
  );
};

export default SimpleMapView;