import React from 'react';
import { motion } from 'framer-motion';

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const RouteTransition = ({ children, className = '' }: RouteTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.2,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RouteTransition;