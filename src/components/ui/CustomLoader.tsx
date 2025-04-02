
import React from 'react';
import { Loader2 } from "lucide-react";

interface CustomLoaderProps {
  message?: string;
  isFullScreen?: boolean;
  showRefreshButton?: boolean;
  className?: string;
  onRefresh?: () => void;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({
  message = "Loading content...",
  isFullScreen = false,
  showRefreshButton = false,
  className = "",
  onRefresh = () => window.location.reload()
}) => {
  return (
    <div className={`flex items-center justify-center ${isFullScreen ? 'h-screen w-full' : 'h-full w-full'} bg-[#080F1F] text-white ${className}`}>
      <div className="text-center">
        <div className="w-12 h-12 border-t-4 border-[#5B9BD5] border-solid rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium">{message}</p>
        
        {showRefreshButton && (
          <button 
            onClick={onRefresh}
            className="mt-4 bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-4 py-2 rounded transition-colors"
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomLoader;
