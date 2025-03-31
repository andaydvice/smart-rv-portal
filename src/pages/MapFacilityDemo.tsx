
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import FacilityMapExample from '@/components/map/FacilityMapExample';
import '../styles/google-maps.css';

const MapFacilityDemo: React.FC = () => {
  // Apply emergency fixes for Google Maps
  useEffect(() => {
    // Force Google Maps styles for proper text display
    const style = document.createElement('style');
    style.id = 'map-demo-emergency-fixes';
    style.innerHTML = `
      .gm-style .gm-style-iw-c {
        max-height: none !important;
        overflow: visible !important;
        transform: none !important;
        padding: 0 !important;
      }
      
      .gm-style .gm-style-iw-d {
        overflow: visible !important;
        max-height: none !important;
      }
      
      .gm-style .gm-style-iw-c h3,
      .gm-style .gm-style-iw-c p,
      .gm-style .gm-style-iw-c div {
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
      if (document.getElementById('map-demo-emergency-fixes')) {
        document.getElementById('map-demo-emergency-fixes')?.remove();
      }
    };
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <FacilityMapExample />
      </div>
    </Layout>
  );
};

export default MapFacilityDemo;
