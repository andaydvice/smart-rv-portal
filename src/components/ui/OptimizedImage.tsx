
import React from 'react';

interface OptimizedImageProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

/**
 * Optimized image component with lazy loading and proper alt text
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  imageSrc, 
  alt,
  className = ''
}) => {
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        console.error(`Failed to load image: ${imageSrc}`);
        e.currentTarget.src = "/placeholder.svg";
        e.currentTarget.alt = "Image could not be loaded";
      }}
    />
  );
};

export default OptimizedImage;
