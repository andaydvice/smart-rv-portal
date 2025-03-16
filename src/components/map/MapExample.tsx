
import React from 'react';
import ResponsiveMap from './ResponsiveMap';
import { toast } from 'sonner';

interface MapExampleProps {
  mapToken: string;
}

const MapExample: React.FC<MapExampleProps> = ({ mapToken }) => {
  // Example map data
  const sampleMapData = {
    features: [
      {
        id: '1',
        coordinates: [-122.4194, 37.7749], // San Francisco
        properties: { name: 'San Francisco' }
      },
      {
        id: '2',
        coordinates: [-118.2437, 34.0522], // Los Angeles
        properties: { name: 'Los Angeles' }
      },
      {
        id: '3',
        coordinates: [-117.1611, 32.7157], // San Diego
        properties: { name: 'San Diego' }
      }
    ]
  };

  const handleMarkerClick = (featureId: string) => {
    const feature = sampleMapData.features.find(f => f.id === featureId);
    if (feature) {
      toast.info(`Selected: ${feature.properties.name}`);
    }
  };

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">California Storage Locations</h2>
      <ResponsiveMap
        mapData={sampleMapData}
        centerCoordinates={[-119.4179, 36.7783]} // California
        zoomLevel={5}
        mapToken={mapToken}
        onMarkerClick={handleMarkerClick}
      />
    </div>
  );
};

export default MapExample;
