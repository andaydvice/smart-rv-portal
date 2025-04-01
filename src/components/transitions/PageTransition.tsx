
import React, { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  useEffect(() => {
    // Ensure content is visible
    console.log("PageTransition mounted - ensuring content is visible");
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Force background color on the body and html elements
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    
    // Ensure all content is visible
    const mainContent = document.querySelector('[data-main-content="true"]');
    if (mainContent instanceof HTMLElement) {
      mainContent.style.visibility = 'visible';
      mainContent.style.opacity = '1';
      mainContent.style.backgroundColor = '#080F1F';
    }
    
    // Fix for any map elements that might be present
    const fixMapElements = () => {
      document.querySelectorAll('.mapboxgl-map, .google-map').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.visibility = 'visible';
          el.style.opacity = '1';
        }
      });
    };
    
    // Run immediately and after a short delay
    fixMapElements();
    setTimeout(fixMapElements, 300);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-[#080F1F]"
      data-main-content="true"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
