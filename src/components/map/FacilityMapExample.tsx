
import React, { useEffect, useState } from 'react';
import ResponsiveFacilityMap from './ResponsiveFacilityMap';
import '../styles/google-maps.css';

const FacilityMapExample: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const facilityName = "Premium Indoor Storage Facility with Climate Control and 24/7 Security";
  const facilityLocation = {
    lat: 36.1699,
    lng: -115.1398
  };
  
  const facilityFeatures = [
    { name: "Indoor Storage", available: true },
    { name: "Climate Controlled", available: true },
    { name: "Security System", available: true },
    { name: "24/7 Access", available: true },
    { name: "Vehicle Washing", available: false }
  ];
  
  // Force style application for map popups
  useEffect(() => {
    // Add emergency fix for Google Maps popup text truncation
    const style = document.createElement('style');
    style.id = 'emergency-map-fixes';
    style.innerHTML = `
      .gm-style-iw.gm-style-iw-c {
        max-height: none !important;
        overflow: visible !important;
        transform: none !important;
        padding: 0 !important;
      }
      
      .gm-style-iw.gm-style-iw-c * {
        max-height: none !important;
        overflow: visible !important;
      }
      
      .gm-style-iw.gm-style-iw-c h3,
      .facility-name-heading,
      .facility-info h3 {
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        max-width: 100% !important;
        white-space: normal !important;
        overflow: visible !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.getElementById('emergency-map-fixes')) {
        document.getElementById('emergency-map-fixes')?.remove();
      }
    };
  }, []);

  // Additional handler for dealing with loaded maps
  const handleMapLoad = () => {
    setMapLoaded(true);
    console.log("Map loaded successfully");
    
    // Apply force visibility to map markers
    setTimeout(() => {
      document.querySelectorAll('.gm-style img[src*="marker"]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          el.style.display = 'block';
        }
      });
    }, 300);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Featured Storage Location
      </h2>
      
      {/* Add extra wrapper to ensure map loads with correct dimensions */}
      <div className="w-full max-w-5xl mx-auto">
        <ResponsiveFacilityMap
          name={facilityName}
          location={facilityLocation}
          address="789 Shelter Lane, Dallas, Texas"
          phoneNumber="(214) 555-0123"
          features={facilityFeatures}
          description="Explore our premium indoor RV storage facility with climate control and 24/7 security."
          apiKey="AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o"
        />
      </div>
    </div>
  );
};

export default FacilityMapExample;
