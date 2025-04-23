
import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';
import { motion } from 'framer-motion';

export const SplineSceneBasic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create a new Spline application instance
    const app = new Application(canvasRef.current);
    
    // Load the Spline scene with error handling
    try {
      app.load('https://prod.spline.design/cLkW6ksd-j9PiXzR/scene.splinecode')
        .catch(error => {
          console.error('Error loading Spline scene:', error);
          setLoadingError(true);
        });
    } catch (error) {
      console.error('Error initializing Spline scene:', error);
      setLoadingError(true);
    }
    
    return () => {
      // Clean up
      app.dispose();
    };
  }, []);
  
  return (
    <div className="w-full h-[280px] md:h-[320px] overflow-hidden rounded-lg bg-gradient-to-r from-[#080F1F] to-[#151A22] relative">
      {/* 3D Animation Canvas - Hidden if there's an error */}
      {!loadingError && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
        <motion.h1 
          className="text-4xl font-bold text-[#0EA5E9] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Smart RV Blog
        </motion.h1>
        <motion.p 
          className="text-[#E2E8FF] text-lg max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Discover the latest insights, tips, and innovations for your connected RV lifestyle
        </motion.p>
      </div>
    </div>
  );
};
