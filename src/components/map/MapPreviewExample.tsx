
import React from 'react';
import MapPreview from './MapPreview';
import { toast } from 'sonner';

interface MapPreviewExampleProps {
  mapToken: string;
}

const MapPreviewExample: React.FC<MapPreviewExampleProps> = ({ mapToken }) => {
  // Example location data
  const exampleLocation = {
    lat: 37.7749,
    lng: -122.4194,
    details: "San Francisco Indoor RV Storage Facility. Features include climate control, 24/7 access, and comprehensive security systems. Monthly rates start at $350 for standard RVs."
  };

  const handleMapLoad = () => {
    toast.success('Map preview loaded successfully');
  };

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-white">RV Storage Location Preview</h2>
      <p className="text-gray-300 mb-6">Click on the orange marker to view location details.</p>
      
      <MapPreview
        location={exampleLocation}
        mapToken={mapToken}
        title="San Francisco RV Storage"
      />
      
      <div className="mt-6 text-sm text-gray-400">
        <p>This map shows a preview of an RV storage location. The marker is positioned using precise coordinates and includes detailed information about the facility.</p>
      </div>
    </div>
  );
};

export default MapPreviewExample;
