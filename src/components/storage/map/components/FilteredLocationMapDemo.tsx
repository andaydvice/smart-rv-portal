
import React from 'react';
import GoogleMapWithFilteredLocations from './GoogleMapWithFilteredLocations';

// Sample location data
const demoLocations = [
  {
    id: 1,
    name: "Orange Point A",
    latitude: 37.7749,
    longitude: -122.4194,
    icon: { url: "orange-marker.png" }
  },
  {
    id: 2,
    name: "Red Point B",
    latitude: 40.7128,
    longitude: -74.0060,
    icon: { url: "red-pin.svg" }
  },
  {
    id: 3,
    name: "Blue Point C",
    latitude: 34.0522,
    longitude: -118.2437,
    icon: { url: "blue-marker.png" }
  },
  {
    id: 4,
    name: "Orange Point D",
    latitude: 29.7604,
    longitude: -95.3698,
    icon: { url: "something-orange.svg" }
  },
  {
    id: 5,
    name: "Standard Point E",
    latitude: 41.8781,
    longitude: -87.6298,
    icon: { url: "standard-marker.png" }
  }
];

const FilteredLocationMapDemo: React.FC = () => {
  const handleLocationSelect = (locationId: number) => {
    console.log(`Selected location ID: ${locationId}`);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#151A22] p-4 rounded-md">
        <h2 className="text-xl font-semibold text-white mb-2">Filtered Location Map</h2>
        <p className="text-gray-300 mb-4">
          Demonstrates Google Maps with orange icons for locations where icon.url contains 'orange' or 'red'
        </p>
        
        <div className="h-[500px]">
          <GoogleMapWithFilteredLocations 
            locations={demoLocations}
            onLocationSelect={handleLocationSelect}
            className="h-full"
          />
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#131a2a] p-3 rounded-md">
            <h3 className="text-lg font-medium text-white mb-2">Orange/Red Icons</h3>
            <ul className="space-y-2">
              {demoLocations
                .filter(loc => loc.icon.url.toLowerCase().includes('orange') || 
                              loc.icon.url.toLowerCase().includes('red'))
                .map(loc => (
                  <li key={loc.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                    <span className="text-gray-200">{loc.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{loc.icon.url}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          
          <div className="bg-[#131a2a] p-3 rounded-md">
            <h3 className="text-lg font-medium text-white mb-2">Standard Icons</h3>
            <ul className="space-y-2">
              {demoLocations
                .filter(loc => !loc.icon.url.toLowerCase().includes('orange') && 
                              !loc.icon.url.toLowerCase().includes('red'))
                .map(loc => (
                  <li key={loc.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#3B82F6]"></div>
                    <span className="text-gray-200">{loc.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{loc.icon.url}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredLocationMapDemo;
