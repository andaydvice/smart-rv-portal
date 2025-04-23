
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const SplineSceneBasic = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation setup for the blog header
    const container = containerRef.current;
    if (!container) return;
    
    // Create animation effect
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      container.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
    };
    
    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      container.style.transition = 'transform 0.5s ease-out';
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#1A1F2C] to-[#221F26] p-8 text-center transition-transform duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D946EF] mb-4">
          Smart RV Blog
        </h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <p className="text-[#E2E8FF] text-lg max-w-3xl mx-auto">
            Discover the latest insights, tips, and innovations for your connected RV lifestyle
          </p>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Background animation elements */}
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-[#8B5CF6]/30 blur-xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-[#D946EF]/20 blur-xl"></div>
          <div className="absolute top-[40%] right-[25%] w-24 h-24 rounded-full bg-[#F97316]/20 blur-xl"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};
