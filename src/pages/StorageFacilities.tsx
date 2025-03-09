
import { Container } from "@/components/ui/container";
import StorageFacilitiesMap from "@/components/storage/StorageFacilitiesMap";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Warehouse } from "lucide-react";
import { useEffect, useState } from 'react';
import { applyAllEmergencyFixes } from "@/utils/emergency-styles/combined";
import { forceMapMarkersVisible, testMarkersVisibility, ensureMarkersExist, ensureMapVisible } from "@/utils/markers";
import "../styles/marker-fix.css";
import "../styles/emergency-marker-fix.css";
import "../styles/map-optimizations.css";

export default function StorageFacilities() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log("StorageFacilities: Component mounted, applying fixes");
    
    // Signal that we're on the storage facilities page
    (window as any).isStorageFacilitiesPage = true;
    
    // Apply all marker visibility fixes
    const cleanup = applyAllEmergencyFixes();
    
    // Force markers to be visible - run multiple times with different delays
    forceMapMarkersVisible();
    
    // Add class to document for CSS targeting
    document.body.classList.add('storage-facilities-page');
    document.body.classList.add('map-page-active');
    
    // Add event listener for map creation to ensure markers are visible
    const handleMapCreated = (e: any) => {
      console.log('Map created - ensuring markers are visible');
      const map = e.detail.map;
      
      // Wait for facilities to be loaded, then ensure markers exist
      setTimeout(() => {
        if ((window as any).mapFacilities && (window as any).mapFacilities.length > 0) {
          ensureMarkersExist(map, (window as any).mapFacilities);
        }
        
        // Set loading to false when map is created
        setIsLoading(false);
      }, 1000);
    };
    
    document.addEventListener('mapboxgl.map.created', handleMapCreated);
    
    // Create multiple timeouts to ensure markers stay visible during page load
    const forceIntervals = [300, 1000, 2000].map(delay => 
      setTimeout(() => {
        console.log(`Running marker visibility check at ${delay}ms`);
        forceMapMarkersVisible();
        ensureMapVisible();
      }, delay)
    );
    
    // Run marker visibility test after the page has loaded
    const testTimeout = setTimeout(() => {
      testMarkersVisibility(true);
      setIsLoading(false); // Ensure loading is set to false even if map creation event never fires
    }, 3000);
    
    // Clean up
    return () => {
      (window as any).isStorageFacilitiesPage = false;
      cleanup();
      forceIntervals.forEach(timeout => clearTimeout(timeout));
      clearTimeout(testTimeout);
      document.removeEventListener('mapboxgl.map.created', handleMapCreated);
      document.body.classList.remove('storage-facilities-page');
      document.body.classList.remove('map-page-active');
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
                  {/* Enhanced orange marker indicator that won't interfere with map markers */}
                  <div className="relative flex items-center">
                    <div className="hero-marker w-8 h-8 bg-[#F97316] rounded-full border-2 border-white shadow-lg animate-pulse"></div>
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
        
        <Container fullWidth className="px-2 md:px-4">
          <div className="py-8">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[600px] bg-[#151A22] rounded-lg">
                <div className="w-16 h-16 border-4 border-t-[#5B9BD5] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-white">Loading map and facilities...</p>
              </div>
            ) : (
              <StorageFacilitiesMap />
            )}
          </div>
        </Container>
      </div>
    </Layout>
  );
}
