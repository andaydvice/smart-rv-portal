
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
    
    // Log the attempt to load
    console.log("Attempting to load Spline scene...");
    
    // Try to load the Spline scene with better error handling
    try {
      app.load('https://prod.spline.design/cLkW6ksd-j9PiXzR/scene.splinecode')
        .then(() => {
          console.log("Spline scene loaded successfully!");
        })
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
  
  // Animation variants for the animated elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Create a backup animation if Spline fails to load
  const renderFallbackAnimation = () => (
    <div className="absolute inset-0 w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        {/* Animated floating circles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-[#5B9BD5] opacity-30"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="w-full h-[280px] md:h-[320px] overflow-hidden rounded-lg bg-gradient-to-r from-[#080F1F] to-[#151A22] relative">
      {/* 3D Animation Canvas - Hidden if there's an error */}
      {!loadingError && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Fallback animation if Spline fails */}
      {loadingError && renderFallbackAnimation()}
      
      {/* Content overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl font-bold text-[#0EA5E9] mb-4"
          variants={itemVariants}
        >
          Smart RV Blog
        </motion.h1>
        <motion.p 
          className="text-[#E2E8FF] text-lg max-w-3xl mx-auto text-center"
          variants={itemVariants}
        >
          Discover the latest insights, tips, and innovations for your connected RV lifestyle
        </motion.p>
      </motion.div>
    </div>
  );
};
