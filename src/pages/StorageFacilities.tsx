
import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import { useEffect } from 'react';
import { toast } from "sonner";
import "../styles/marker-fix.css";
import "../styles/emergency-marker-fix.css";
import "../styles/map-optimizations.css";

export default function StorageFacilities() {
  useEffect(() => {
    console.log("StorageFacilities: Component mounted");
    
    // Signal that we're on the storage facilities page
    window.isStorageFacilitiesPage = true;
    
    // Add specific CSS to force markers to be visible
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-marker, 
      .static-marker,
      [data-facility-id] {
        visibility: visible !important;
        display: block !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        cursor: pointer !important;
        transform: none !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Set up global click listener for any element with data-facility-id
    const handleGlobalMarkerClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const markerEl = target.closest('[data-facility-id]');
      
      if (markerEl) {
        const facilityId = markerEl.getAttribute('data-facility-id');
        if (facilityId) {
          console.log('Global marker click handler:', facilityId);
          // The click will be handled by the specific marker handlers
        }
      }
    };
    
    document.addEventListener('click', handleGlobalMarkerClick);
    
    // Show a notification to users
    setTimeout(() => {
      toast.info("Click on orange markers to view storage facilities");
    }, 2000);
    
    // Close popups when clicking on the map outside markers
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // If clicking on the map canvas (not a marker or popup)
      if (target.classList.contains('mapboxgl-canvas')) {
        // Close all popups
        document.querySelectorAll('.mapboxgl-popup').forEach(popup => {
          if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
          }
        });
      }
    });
    
    // Clean up
    return () => {
      window.isStorageFacilitiesPage = false;
      document.removeEventListener('click', handleGlobalMarkerClick);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
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
                    <div className="hero-marker w-8 h-8 bg-[#F97316] rounded-full border-2 border-white shadow-lg"></div>
                    <Warehouse className="h-7 w-7 text-[#F97316]" />
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
