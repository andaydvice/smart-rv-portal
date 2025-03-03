
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import StoragePreparationChecklist from '@/components/storage/StoragePreparationChecklist';
import ChecklistHeroImage from '@/components/storage/checklist/ChecklistHeroImage';
import Layout from '@/components/layout/Layout';
import '@/styles/pages/storage-checklist/index.css';

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
    
    // Enhanced print preparation that ensures checkboxes are visible
    const prepareForPrinting = () => {
      console.log('Preparing document for printing...');
      
      // 1. Find all checkboxes and ensure they have print-specific attributes
      const checkboxes = document.querySelectorAll('[role="checkbox"]');
      checkboxes.forEach(checkbox => {
        // Get the checked state from data-state or aria-checked
        const isChecked = 
          checkbox.getAttribute('data-state') === 'checked' || 
          checkbox.getAttribute('aria-checked') === 'true';
        
        // Set multiple attributes to ensure visibility in print
        checkbox.setAttribute('data-print-checked', isChecked ? 'true' : 'false');
        checkbox.setAttribute('aria-checked', isChecked ? 'true' : 'false');
        checkbox.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
        
        // Add a bold checkmark character as child for print visibility
        if (isChecked && !checkbox.querySelector('.print-checkmark-fallback')) {
          const checkmark = document.createElement('span');
          checkmark.className = 'print-checkmark-fallback';
          checkmark.style.position = 'absolute';
          checkmark.style.top = '-4px';
          checkmark.style.left = '2px';
          checkmark.style.fontSize = '18px';
          checkmark.style.fontWeight = 'bold';
          checkmark.textContent = '✓';
          checkmark.style.display = 'none'; // Only visible in print
          checkbox.appendChild(checkmark);
        }
        
        // Add print-specific classes
        checkbox.classList.add('print-checkbox');
      });
      
      // 2. Find all labels associated with checkboxes and add print attributes
      const labels = document.querySelectorAll('label');
      labels.forEach(label => {
        // Get the associated checkbox
        const id = label.getAttribute('for');
        if (id) {
          const checkbox = document.getElementById(id);
          if (checkbox) {
            const isChecked = 
              checkbox.getAttribute('data-state') === 'checked' || 
              checkbox.getAttribute('aria-checked') === 'true';
            
            // Set label print attributes
            label.setAttribute('data-checked', isChecked ? 'true' : 'false');
            label.setAttribute('data-print-state', isChecked ? 'checked' : 'unchecked');
            
            // Add print-only text prefix for the label
            if (!label.querySelector('.print-prefix')) {
              const prefix = document.createElement('span');
              prefix.className = 'print-prefix';
              prefix.style.display = 'none'; // Only visible in print
              prefix.textContent = isChecked ? '☑ ' : '☐ ';
              label.insertBefore(prefix, label.firstChild);
            }
          }
        }
      });
      
      // 3. Make sure all tab panels are visible for printing
      const tabPanels = document.querySelectorAll('[role="tabpanel"]');
      tabPanels.forEach(panel => {
        panel.style.display = 'block';
        panel.style.visibility = 'visible';
      });
      
      // 4. Force checkboxes to be visible in print with inline HTML
      document.querySelectorAll('.checklist-item').forEach(item => {
        const checkbox = item.querySelector('[role="checkbox"]');
        const label = item.querySelector('label');
        
        if (checkbox && label) {
          const isChecked = 
            checkbox.getAttribute('data-state') === 'checked' || 
            checkbox.getAttribute('aria-checked') === 'true';
          
          // Create a native HTML checkbox for ultimate fallback
          if (!item.querySelector('.html-checkbox-fallback')) {
            const nativeCheckbox = document.createElement('input');
            nativeCheckbox.type = 'checkbox';
            nativeCheckbox.checked = isChecked;
            nativeCheckbox.className = 'html-checkbox-fallback';
            nativeCheckbox.style.display = 'none'; // Only visible in print
            nativeCheckbox.style.position = 'absolute';
            nativeCheckbox.style.left = '0';
            item.insertBefore(nativeCheckbox, item.firstChild);
          }
        }
      });
      
      console.log(`Print preparation complete: ${checkboxes.length} checkboxes prepared`);
    };
    
    // Run print preparation on load
    prepareForPrinting();
    
    // Run again whenever print is triggered
    window.addEventListener('beforeprint', prepareForPrinting);
    
    // Also add a manual print preparation every few seconds to ensure it's always ready
    const printPrepInterval = setInterval(prepareForPrinting, 5000);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeprint', prepareForPrinting);
      clearInterval(printPrepInterval);
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
