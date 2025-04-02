
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
  showSpinner?: boolean;
  timeout?: number; // Add timeout prop to auto-hide after certain period
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  message = "Loading data...",
  showSpinner = true,
  timeout = 15000, // Default 15 second timeout
}) => {
  const [forceHide, setForceHide] = useState(false);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  
  useEffect(() => {
    // Reset states when loading state changes
    if (isLoading) {
      setForceHide(false);
      setShowRefreshButton(false);
      
      // Show refresh button after 8 seconds of loading
      const refreshTimer = setTimeout(() => {
        if (isLoading) {
          setShowRefreshButton(true);
        }
      }, 8000);
      
      // Force-hide the loading screen after timeout to prevent infinite loading
      const timeoutTimer = setTimeout(() => {
        console.log("Loading timeout reached, forcing hide");
        setForceHide(true);
      }, timeout);
      
      // Clean up timers
      return () => {
        clearTimeout(refreshTimer);
        clearTimeout(timeoutTimer);
      };
    }
  }, [isLoading, timeout]);

  // Don't render if not loading or force hidden
  if (!isLoading || forceHide) return null;

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
          
          {/* Show refresh button if loading takes too long */}
          {showRefreshButton && (
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded bg-connectivity-accent px-4 py-2 font-medium text-white hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          )}
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
