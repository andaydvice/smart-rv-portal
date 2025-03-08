
import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import { useEffect } from 'react';
import { injectEmergencyStyles, patchMapboxMarkerPrototype } from "@/utils/injectEmergencyStyles";
import { forceMapMarkersVisible } from "@/utils/forceMapMarkers";
import "../styles/marker-fix.css";

export default function StorageFacilities() {
  useEffect(() => {
    console.log("StorageFacilities: Component mounted");
    
    // Signal that we're on the storage facilities page
    window.isStorageFacilitiesPage = true;
    
    // Apply all marker visibility fixes with higher frequency
    document.body.setAttribute('data-markers-loading', 'true');
    injectEmergencyStyles();
    patchMapboxMarkerPrototype();
    
    // Immediate and repeated visibility enforcement
    forceMapMarkersVisible();
    const forceIntervals = [100, 500, 1000, 2000, 5000].map(delay => 
      setTimeout(forceMapMarkersVisible, delay)
    );
    
    // Add direct DOM manipulation fallback on a faster interval
    const forceInterval = setInterval(() => {
      const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
      console.log(`Found ${markers.length} markers to force visible`);
      
      markers.forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.cssText += `
            visibility: visible !important;
            display: block !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            pointer-events: auto !important;
            position: absolute !important;
            cursor: pointer !important;
          `;
          
          // Add click handler if missing
          if (!marker.getAttribute('data-has-click')) {
            marker.setAttribute('data-has-click', 'true');
            marker.addEventListener('click', (e) => {
              console.log('Marker clicked:', marker.getAttribute('data-facility-id'));
              e.stopPropagation();
              
              // Try to find and click the view button
              const facilityId = marker.getAttribute('data-facility-id');
              if (facilityId) {
                setTimeout(() => {
                  document.querySelectorAll(`.view-facility-btn[data-facility-id="${facilityId}"]`).forEach(btn => {
                    (btn as HTMLElement).click();
                  });
                }, 100);
              }
            });
          }
        }
      });
    }, 300); // Run more frequently for better marker visibility
    
    // Clean up
    return () => {
      window.isStorageFacilitiesPage = false;
      clearInterval(forceInterval);
      forceIntervals.forEach(timeout => clearTimeout(timeout));
      document.body.removeAttribute('data-markers-loading');
    };
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen bg-[#080F1F] text-white">
        {/* Hero Header with Image */}
        <div className="relative w-full h-[400px]">
          <img 
            src="/lovable-uploads/e9503bf4-354a-4790-8a83-fefea32abc5b.png" 
            alt="Indoor RV Storage Facility" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent">
            <Container className="h-full flex flex-col justify-center items-center">
              <div className="text-center max-w-3xl bg-black/40 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="relative flex items-center">
                    <div className="orange-marker-indicator"></div>
                    <Warehouse className="h-7 w-7 text-[#F97316]" />
                    {/* Orange marker indicator in the header - made larger and more visible */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Indoor RV Storage Facilities
                  </h1>
                </div>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Find the perfect indoor storage solution for your RV across the USA including Oregon, Pennsylvania, New York, Minnesota, Iowa, Wisconsin, California, Arizona, Colorado, Texas, Florida, Georgia and Nevada.
                </p>
              </div>
            </Container>
          </div>
        </div>
        
        <Container>
          <div className="py-8">
            <StorageFacilitiesMap />
          </div>
        </Container>
      </div>
    </Layout>
  );
}
