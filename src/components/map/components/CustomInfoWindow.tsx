
import React, { useRef, useEffect } from 'react';

interface CustomInfoWindowProps {
  isVisible: boolean;
  onClose: () => void;
  position: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
  title: string;
}

const CustomInfoWindow: React.FC<CustomInfoWindowProps> = ({
  isVisible,
  onClose,
  position,
  children,
  title
}) => {
  const infoWindowRef = useRef<HTMLDivElement>(null);
  
  // Apply styles on mount
  useEffect(() => {
    if (!infoWindowRef.current || !isVisible) return;
    
    // Position the info window
    infoWindowRef.current.style.left = `${position.x}px`;
    infoWindowRef.current.style.top = `${position.y - 15}px`;
    
    // Add entrance animation
    infoWindowRef.current.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -90%)' },
        { opacity: 1, transform: 'translate(-50%, -100%)' }
      ],
      { duration: 200, fill: 'forwards' }
    );
    
    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (infoWindowRef.current && !infoWindowRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, position, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={infoWindowRef}
      className="custom-info-window"
    >
      <button 
        className="close-btn"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <h3>{title}</h3>
      <div className="info-content">
        {children}
      </div>
    </div>
  );
};

export default CustomInfoWindow;
