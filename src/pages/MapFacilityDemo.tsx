
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import FacilityMapExample from '@/components/map/FacilityMapExample';
import '../styles/google-maps.css';

const MapFacilityDemo: React.FC = () => {
  // Apply critical map fixes when component loads
  useEffect(() => {
    // Force Google Maps styles for proper text display
    const style = document.createElement('style');
    style.id = 'map-demo-critical-fixes';
    style.innerHTML = `
      /* Essential info window fixes */
      body .gm-style .gm-style-iw-c,
      body .gm-style-iw.gm-style-iw-c {
        max-height: none !important;
        overflow: visible !important;
        transform: none !important;
        padding: 0 !important;
        max-width: none !important;
      }
      
      body .gm-style .gm-style-iw-d,
      body .gm-style-iw.gm-style-iw-c .gm-style-iw-d {
        overflow: visible !important;
        max-height: none !important;
      }
      
      body .gm-style .gm-style-iw-c h3,
      body .gm-style .gm-style-iw-c p,
      body .gm-style .gm-style-iw-c div {
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        max-width: 100% !important;
        white-space: normal !important;
        overflow: visible !important;
      }

      /* Ensure text is always visible */
      .facility-name-heading, 
      .gm-style-iw h3,
      .gm-style-iw.gm-style-iw-c h3 {
        display: block !important;
        white-space: normal !important;
        overflow: visible !important;
        text-overflow: clip !important;
        max-width: 100% !important;
      }

      /* Remove max-height restrictions */
      .gm-style-iw.gm-style-iw-c > div,
      .gm-style-iw.gm-style-iw-c > div > div {
        max-height: none !important;
        overflow: visible !important;
      }
    `;
    document.head.appendChild(style);
    
    // Force any existing info windows to comply
    const forceInfoWindowVisibility = () => {
      document.querySelectorAll('.gm-style-iw, .gm-style-iw-c, .gm-style-iw-d').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.maxHeight = 'none';
          el.style.overflow = 'visible';
          el.style.maxWidth = 'none';
          
          const headings = el.querySelectorAll('h3');
          headings.forEach(heading => {
            heading.style.wordWrap = 'break-word';
            heading.style.wordBreak = 'break-word';
            heading.style.whiteSpace = 'normal';
            heading.style.overflow = 'visible';
            heading.style.display = 'block';
            heading.style.maxWidth = '100%';
          });
        }
      });
    };
    
    // Run once on mount
    forceInfoWindowVisibility();
    
    // Set up mutation observer to run when new elements are added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          forceInfoWindowVisibility();
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    
    return () => {
      if (document.getElementById('map-demo-emergency-fixes')) {
        document.getElementById('map-demo-emergency-fixes')?.remove();
      }
      observer.disconnect();
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
