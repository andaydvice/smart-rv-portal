
import React from 'react';
import Navbar from "@/components/Navbar";
import { Container } from "@/components/ui/container";
import MapIconDemo from "@/components/storage/map/components/MapIconDemo";
import MapWithResponsiveIcons from "@/components/storage/map/components/MapWithResponsiveIcons";
import Layout from "@/components/layout/Layout";


// Sample data for the icons
const demoIcons = [
  {
    id: 'rv-storage',
    icon: {
      src: '/lovable-uploads/5ad3c360-419f-4662-8c19-3d5a3cffe23f.webp',
      alt: 'RV Storage'
    },
    marker: {
      src: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.webp',
      alt: 'Location Pin'
    },
    details: 'RV Storage Facility'
  },
  {
    id: 'campground',
    icon: {
      src: '/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.webp',
      alt: 'Campground'
    },
    marker: {
      src: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.webp',
      alt: 'Location Pin'
    },
    details: 'Campground'
  },
  {
    id: 'service-center',
    icon: {
      src: '/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.webp',
      alt: 'Service Center'
    },
    marker: {
      src: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.webp',
      alt: 'Location Pin'
    },
    details: 'RV Service Center'
  }
];

// Sample map locations - Fixed by explicitly typing coordinates as tuples [number, number]
const mapLocations = [
  {
    id: 'location-1',
    coordinates: [-122.4194, 37.7749] as [number, number], // San Francisco - explicitly typed as tuple
    details: 'San Francisco RV Storage',
    icon: {
      src: '/lovable-uploads/5ad3c360-419f-4662-8c19-3d5a3cffe23f.webp',
      alt: 'RV Storage'
    },
    marker: {
      src: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.webp',
      alt: 'Location Pin'
    }
  },
  {
    id: 'location-2',
    coordinates: [-118.2437, 34.0522] as [number, number], // Los Angeles - explicitly typed as tuple
    details: 'Los Angeles Campground',
    icon: {
      src: '/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.webp',
      alt: 'Campground'
    },
    marker: {
      src: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.webp',
      alt: 'Location Pin'
    }
  },
  {
    id: 'location-3',
    coordinates: [-74.0060, 40.7128] as [number, number], // New York - explicitly typed as tuple
    details: 'NYC Service Center',
    icon: {
      src: '/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.webp',
      alt: 'Service Center'
    },
    marker: {
      src: '/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.webp',
      alt: 'Location Pin'
    }
  }
];

const MapIconDemoPage = () => {
  return (
    <Layout>
      <div className="min-h-screen w-full bg-[#080F1F] text-white flex-grow">
        <Container className="py-10" fullWidth>
          <h1 className="text-3xl font-bold mb-6 text-center">Interactive Map Icons</h1>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
            These responsive map icons display details at all times and animate when clicked.
            They're designed for optimal visibility on maps across all device sizes.
          </p>
          
          <div className="grid grid-cols-1 gap-8 mb-12">
            <div className="bg-[#131a2a] p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Icon Components</h2>
              <MapIconDemo icons={demoIcons} />
            </div>
            
            <div className="bg-[#131a2a] p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Map Implementation</h2>
              <p className="text-sm text-gray-300 mb-4">
                Click on any map icon to see the animation and selection effects. 
                Icons keep their details visible at all times.
              </p>
              <MapWithResponsiveIcons 
                locations={mapLocations}
                mapToken={import.meta.env.VITE_MAPBOX_TOKEN || ""}
                onLocationSelect={(locationId) => console.log(`Selected location: ${locationId}`)}
              />
            </div>
          </div>
          
        </Container>
      </div>
    </Layout>
  );
};

export default MapIconDemoPage;
