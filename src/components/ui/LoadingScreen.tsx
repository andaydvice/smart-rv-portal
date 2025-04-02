
import React from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
  showSpinner?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  message = "Loading data...",
  showSpinner = true,
}) => {
  // Don't render if not loading
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080F1F]"
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
        {showSpinner && (
          <div className="relative">
            {/* Outer ring animation */}
            <div className="h-16 w-16 rounded-full border-4 border-[#131a2a] opacity-25"></div>
            
            {/* Inner spinner animation */}
            <Loader2 
              className="absolute left-0 top-0 h-16 w-16 animate-spin text-connectivity-accent" 
              strokeWidth={3} 
            />
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-xl font-medium text-white">{message}</h2>
          <p className="text-sm text-gray-300">
            Please wait while we load your content
          </p>
        </div>
      </div>

      {/* Bottom accent bar with animation */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-0 h-1 bg-connectivity-accent"
      />
    </motion.div>
  );
};

export default LoadingScreen;
