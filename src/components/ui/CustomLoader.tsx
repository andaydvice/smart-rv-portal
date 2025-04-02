
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomLoaderProps {
  message?: string;
  isFullScreen?: boolean;
  className?: string;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A reliable loading component that includes a fail-safe timeout
 */
const CustomLoader: React.FC<CustomLoaderProps> = ({
  message = "Loading...",
  isFullScreen = false,
  className,
  showRefreshButton = false,
  onRefresh = () => window.location.reload(),
  size = 'md'
}) => {
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  
  useEffect(() => {
    // Show timeout message after 10 seconds
    const timeoutId = setTimeout(() => {
      setShowTimeoutMessage(true);
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Spinner sizes
  const spinnerSize = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center bg-[#080F1F] text-white',
      isFullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[200px]',
      className
    )}>
      <div className={cn(
        'relative',
        spinnerSize[size]
      )}>
        {/* Outer ring */}
        <div className={cn(
          'rounded-full border-4 border-[#131a2a] opacity-25',
          spinnerSize[size]
        )}></div>
        
        {/* Inner spinner */}
        <Loader2 
          className={cn(
            'absolute left-0 top-0 animate-spin text-connectivity-accent',
            spinnerSize[size]
          )}
          strokeWidth={3}
          data-testid="loading-spinner"
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">{message}</p>
        
        {showTimeoutMessage && (
          <p className="mt-2 text-sm text-gray-400">
            This is taking longer than expected...
          </p>
        )}
        
        {(showRefreshButton || showTimeoutMessage) && (
          <button
            onClick={onRefresh}
            className="mt-4 rounded bg-connectivity-accent px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
          >
            Reload Page
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomLoader;
