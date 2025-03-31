
import React, { useEffect, useState, useRef } from 'react';
import ResponsiveFacilityMap from './ResponsiveFacilityMap';
import '../styles/google-maps.css';

const FacilityMapExample: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
    // Add critical fixes for Google Maps popup text truncation
    const style = document.createElement('style');
    style.id = 'critical-map-fixes';
    style.innerHTML = `
      /* Critical popup fixes with increased specificity */
      body .gm-style .gm-style-iw-c,
      body .gm-style-iw.gm-style-iw-c {
        max-height: none !important;
        max-width: none !important;
        overflow: visible !important;
        transform: none !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
      
      body .gm-style .gm-style-iw-d,
      body .gm-style-iw.gm-style-iw-c .gm-style-iw-d {
        max-height: none !important;
        overflow: visible !important;
        box-sizing: border-box !important;
      }
      
      body .gm-style .gm-style-iw-c h3,
      body .gm-style-iw.gm-style-iw-c h3,
      body .facility-name-heading,
      body .facility-info h3 {
        overflow-wrap: break-word !important;
        word-wrap: break-word !important;
        word-break: break-word !important;
        max-width: 100% !important;
        white-space: normal !important;
        overflow: visible !important;
        display: block !important;
        text-align: left !important;
      }

      /* Fix info window content div */
      body .gm-style-iw.gm-style-iw-c > div,
      body .gm-style-iw.gm-style-iw-c > div > div {
        max-height: none !important;
        max-width: none !important;
        overflow: visible !important;
        box-sizing: border-box !important;
      }

      /* Ensure every element in the popup is visible */
      body .gm-style-iw.gm-style-iw-c * {
        overflow: visible !important;
        max-height: none !important;
        white-space: normal !important;
      }
    `;
    document.head.appendChild(style);
    
    // Create a mutation observer to immediately apply fixes to any InfoWindows that are added
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            // Find and fix InfoWindows
            const infoWindows = node.querySelectorAll('.gm-style-iw');
            infoWindows.forEach(infoWindow => {
              if (infoWindow instanceof HTMLElement) {
                infoWindow.style.maxHeight = 'none';
                infoWindow.style.overflow = 'visible';
                
                // Fix InfoWindow content
                const content = infoWindow.querySelector('.gm-style-iw-d');
                if (content instanceof HTMLElement) {
                  content.style.maxHeight = 'none';
                  content.style.overflow = 'visible';
                  
                  // Fix headings
                  const headings = content.querySelectorAll('h3');
                  headings.forEach(heading => {
                    heading.style.wordWrap = 'break-word';
                    heading.style.wordBreak = 'break-word';
                    heading.style.whiteSpace = 'normal';
                    heading.style.overflow = 'visible';
                    heading.style.maxWidth = '100%';
                  });
                }
              }
            });
          }
        });
      });
    });
    
    // Start observing the body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      if (document.getElementById('critical-map-fixes')) {
        document.getElementById('critical-map-fixes')?.remove();
      }
      observer.disconnect();
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
      
      // Fix InfoWindows directly
      document.querySelectorAll('.gm-style-iw, .gm-style-iw-c').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.maxHeight = 'none';
          el.style.overflow = 'visible';
          el.style.maxWidth = 'none';
        }
      });
      
      // Fix InfoWindow content
      document.querySelectorAll('.gm-style-iw-d').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.maxHeight = 'none';
          el.style.overflow = 'visible';
        }
      });
      
      // Fix titles
      document.querySelectorAll('.gm-style-iw h3, .facility-name-heading, .facility-info h3').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.wordWrap = 'break-word';
          el.style.wordBreak = 'break-word';
          el.style.whiteSpace = 'normal';
          el.style.overflow = 'visible';
          el.style.maxWidth = '100%';
        }
      });
    }, 300);
  };

  return (
    <div className="py-8" ref={mapContainerRef}>
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
          onMapLoad={handleMapLoad}
        />
      </div>
    </div>
  );
};

export default FacilityMapExample;
