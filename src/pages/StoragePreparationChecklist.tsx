
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
      // Update ARIA attributes for screen readers
      elem.setAttribute('aria-valuenow', elem.getAttribute('aria-valuenow') || '0');
      
      // Add a class to force reflow/repaint
      elem.classList.add('force-repaint');
      // Remove it after a brief delay to trigger the browser to update
      setTimeout(() => {
        if (elem) elem.classList.remove('force-repaint');
      }, 50);
    });

    // Force progress elements to consistently reflect current value
    const syncProgressBars = () => {
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const value = bar.getAttribute('data-value') || '0';
        const indicator = bar.querySelector('.progress-indicator');
        if (indicator && indicator instanceof HTMLElement) {
          indicator.style.transform = `translateX(-${100 - parseInt(value, 10)}%)`;
        }
      });
    };

    // Run once on load and again after a short delay
    syncProgressBars();
    setTimeout(syncProgressBars, 200);
    
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
          <div id="checklist-container" className="progress-critical">
            <StoragePreparationChecklist />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoragePreparationChecklistPage;
