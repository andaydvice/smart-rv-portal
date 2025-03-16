
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveMapIconProps {
  icon: {
    src: string;
    alt: string;
  };
  marker: {
    src: string;
    alt: string;
  };
  details?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isActive?: boolean;
}

/**
 * A responsive map icon component that displays icon details at all times
 * and animates transitions when clicked
 */
const ResponsiveMapIcon: React.FC<ResponsiveMapIconProps> = ({
  icon,
  marker,
  details = 'Map Location',
  size = 'md',
  onClick,
  isActive = false
}) => {
  // Local state to manage animation and active state
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Size mappings for different screen sizes
  const sizeClasses = {
    sm: 'w-8 h-8 md:w-10 md:h-10',
    md: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-12 h-12 md:w-16 md:h-16',
  };
  
  // Handler for click events
  const handleClick = () => {
    setIsAnimating(true);
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 500);
    
    // Call the provided onClick handler
    if (onClick) onClick();
  };
  
  return (
    <div className="group relative inline-flex flex-col items-center">
      {/* Icon container with animation */}
      <div 
        className={cn(
          "relative cursor-pointer rounded-full overflow-hidden shadow-lg transition-all duration-300",
          sizeClasses[size],
          isActive ? "ring-4 ring-[#10B981] scale-110" : "hover:ring-2 hover:ring-[#F97316]",
          isAnimating ? "animate-pulse" : ""
        )}
        onClick={handleClick}
        role="button"
        aria-label={`Map marker: ${details}`}
      >
        {/* Background marker image */}
        <div className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110">
          <img 
            src={marker.src} 
            alt={marker.alt} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Foreground icon with animation */}
        <div className={cn(
          "absolute inset-0 z-10 flex items-center justify-center transition-all duration-300",
          isAnimating ? "animate-spin" : "group-hover:scale-110"
        )}>
          <img 
            src={icon.src} 
            alt={icon.alt} 
            className="w-2/3 h-2/3 object-contain"
          />
        </div>
      </div>
      
      {/* Always visible details with animation */}
      <div className={cn(
        "mt-1 py-1 px-2 text-xs md:text-sm bg-[#131a2a] text-white rounded-md shadow-md max-w-[150px] text-center transition-all duration-300",
        isActive ? "bg-[#10B981]/80" : "bg-[#131a2a]/80",
        isAnimating ? "animate-bounce" : "group-hover:bg-[#F97316]/80"
      )}>
        <span className="line-clamp-1">
          {details}
        </span>
      </div>
    </div>
  );
};

export default ResponsiveMapIcon;
