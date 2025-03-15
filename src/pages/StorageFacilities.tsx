
import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import { useEffect } from 'react';
import "../styles/map-fixes.css";
import "../styles/map-optimizations.css";
import "../styles/marker-fix.css"; 
import "../styles/emergency-marker-fix.css";

export default function StorageFacilities() {
  useEffect(() => {
    console.log("StorageFacilities: Component mounted");
    
    // Apply emergency marker and popup fixes immediately
    const applyMarkerFixes = () => {
      console.log("Applying marker and popup visibility fixes");
      const style = document.createElement('style');
      style.innerHTML = `
        .mapboxgl-marker, .custom-marker {
          visibility: visible !important;
          display: block !important;
          opacity: 1 !important;
          z-index: 999 !important;
          position: absolute !important;
          transform: translate(-50%, -50%) !important;
        }
        .mapboxgl-popup {
          z-index: 1000 !important;
          max-width: 300px !important;
          width: auto !important;
        }
        .mapboxgl-popup-content {
          min-width: 220px !important;
          width: auto !important;
          max-width: 300px !important;
          overflow: visible !important;
        }
        .facility-popup-content {
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
        .view-facility-btn, .view-details {
          display: none !important;
        }
        .mapboxgl-canvas-container, .mapboxgl-canvas {
          height: 100% !important;
          width: 100% !important;
        }
        .h-[600px] {
          min-height: 600px !important;
          overflow: visible !important;
        }
        .mapboxgl-map {
          overflow: visible !important;
        }
      `;
      document.head.appendChild(style);
      
      // Force visibility of any existing markers
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
          marker.style.zIndex = '999';
          marker.style.position = 'absolute';
        }
      });
    };
    
    // Apply fixes immediately
    applyMarkerFixes();
    
    // And repeatedly to ensure they stick
    const fixInterval = setInterval(() => {
      const markers = document.querySelectorAll('.mapboxgl-marker, .custom-marker');
      console.log(`Found ${markers.length} markers - applying visibility fixes`);
      applyMarkerFixes();
      
      // Patch marker transform if needed
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement && !marker.style.transform.includes('translate')) {
          marker.style.transform = 'translate(-50%, -50%)';
        }
      });
    }, 2000);
    
    // Flag for emergency script
    window.isStorageFacilitiesPage = true;
    
    // Load emergency marker script
    const script = document.createElement('script');
    script.src = '/markerFix.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      window.isStorageFacilitiesPage = false;
      clearInterval(fixInterval);
    };
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen w-full bg-[#080F1F] text-white">
        {/* Hero Header with Image */}
        <div className="relative w-full h-[400px]">
          <img 
            src="/lovable-uploads/e9503bf4-354a-4790-8a83-fefea32abc5b.png" 
            alt="Indoor RV Storage Facility" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent">
            <Container className="h-full flex flex-col justify-center items-center" fullWidth>
              <div className="text-center max-w-3xl bg-black/40 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#F97316] rounded-full border-2 border-white shadow-lg animate-pulse fixed-orange-marker hero-marker"></div>
                  <Warehouse className="h-7 w-7 text-[#F97316]" />
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
        
        <Container fullWidth className="px-2 md:px-4">
          <div className="py-8">
            <StorageFacilitiesMap />
          </div>
        </Container>
      </div>
    </Layout>
  );
}
