
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  description?: string;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Star Rating Component
 * 
 * Displays a star rating with hover functionality and optional interactive selection
 */
const StarRating = ({
  rating,
  description,
  onRatingChange,
  readonly = false,
  size = 'md',
  className
}: StarRatingProps) => {
  // Ensure rating is within bounds
  const validRating = Math.max(0, Math.min(5, rating));
  
  // State for hover rating
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  // Calculate display rating (hover rating or actual rating)
  const displayRating = hoverRating !== null ? hoverRating : validRating;
  
  // Size mapping for star icons
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  // Text description for ratings
  const getRatingDescription = (rating: number): string => {
    if (rating === 0) return "Not Rated";
    if (rating < 1.5) return "Poor";
    if (rating < 2.5) return "Fair";
    if (rating < 3.5) return "Good";
    if (rating < 4.5) return "Very Good";
    return "Excellent";
  };
  
  // Handle star click
  const handleStarClick = (index: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index + 1);
    }
  };
  
  // Handle mouse enter on star
  const handleStarMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverRating(index + 1);
    }
  };
  
  // Handle mouse leave on rating container
  const handleMouseLeave = () => {
    setHoverRating(null);
  };
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          className={cn("flex items-center gap-1", className)}
          onMouseLeave={handleMouseLeave}
        >
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={cn(
                sizeMap[size],
                "transition-all duration-200 cursor-pointer",
                index < displayRating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400",
                !readonly && "hover:scale-110"
              )}
              onMouseEnter={() => handleStarMouseEnter(index)}
              onClick={() => handleStarClick(index)}
              data-rating={index + 1}
            />
          ))}
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent 
        className="bg-[#131a2a] text-white border-gray-700 p-3 shadow-lg"
        align="start"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-[#60A5FA]">
            {description || getRatingDescription(displayRating)}
          </p>
          <p className="text-xs text-gray-400">
            Rating: {displayRating} out of 5
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default StarRating;
