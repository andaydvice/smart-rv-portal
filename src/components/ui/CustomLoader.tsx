
import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomLoaderProps {
  message?: string;
  isFullScreen?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A simple loading component
 */
const CustomLoader: React.FC<CustomLoaderProps> = ({
  message = "Loading...",
  isFullScreen = false,
  className,
  size = 'md'
}) => {
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
      </div>
    </div>
  );
};

export default CustomLoader;
