
import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = "md", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10"
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`animate-spin rounded-full border-2 border-t-[#5B9BD5] border-r-[#5B9BD5] border-b-gray-200 border-l-gray-200 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};
