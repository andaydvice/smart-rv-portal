
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import ChecklistHeroImage from '@/components/storage/checklist/ChecklistHeroImage';
import Layout from '@/components/layout/Layout';

const StoragePreparationChecklistPage: React.FC = () => {
  // Force scroll to top and ensure components load with direct visibility
  useEffect(() => {
    console.log('Storage checklist page loaded - forcing scroll to top');
    
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Ensure all root elements are visible
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Preload the hero image
    const heroImage = new Image();
    heroImage.src = "/lovable-uploads/8d977391-dd15-4260-8535-839f728126c6.png";
    
    // Add event logging
    console.log("Page fully initialized");
    
    return () => {
      console.log("StoragePreparationChecklistPage unmounting");
    };
  }, []);

  return (
    <Layout>
      <div 
        className="storage-preparation-checklist bg-[#080F1F] min-h-screen"
        style={{ 
          visibility: 'visible', 
          display: 'block',
          opacity: 1
        }}
      >
        <Navbar />
        <div 
          className="pt-20" 
          style={{ 
            visibility: 'visible', 
            display: 'block',
            opacity: 1
          }}
        >
          <div id="hero-container" style={{ visibility: 'visible', display: 'block', opacity: 1 }}>
            <ChecklistHeroImage />
          </div>
          <div id="checklist-container" style={{ visibility: 'visible', display: 'block', opacity: 1 }}>
            <StoragePreparationChecklist />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
