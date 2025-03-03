
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
    
    // Ensure all UI elements are fully visible
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Force any progress indicators to update immediately
    const progressElements = document.querySelectorAll('[role="progressbar"]');
    progressElements.forEach(elem => {
      elem.setAttribute('aria-valuenow', elem.getAttribute('aria-valuenow') || '0');
    });
    
    // Add event logging
    console.log("Page fully initialized");
    
    return () => {
      console.log("StoragePreparationChecklistPage unmounting");
    };
  }, []);

  return (
    <Layout>
      <div className="storage-preparation-checklist bg-[#080F1F] min-h-screen">
        <Navbar />
        <div className="pt-20">
          <div id="hero-container">
            <ChecklistHeroImage />
          </div>
          <div id="checklist-container">
            <StoragePreparationChecklist />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
