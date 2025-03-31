
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
  
  // Apply styles on mount and position update
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
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        backgroundColor: '#131a2a',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 10000,
        maxWidth: '350px', // Increased from 300px for more space
        minWidth: '250px', // Increased from 220px
        width: 'auto',
        overflow: 'visible' // Ensure content doesn't get cut off
      }}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'visible' // Ensure content doesn't get cut off
        }}
      >
        <button 
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            right: '8px',
            top: '8px',
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: 'white',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10001
          }}
        >
          ×
        </button>
        
        <div 
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            margin: 0,
            padding: '12px',
            backgroundColor: '#091020',
            color: '#5B9BD5',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            paddingRight: '36px', // Make room for the close button
            wordBreak: 'break-word',  // Critical for long text
            wordWrap: 'break-word',   // Additional word wrapping
            whiteSpace: 'normal',     // Allow text to wrap
            overflowWrap: 'break-word', // Modern word wrapping
            hyphens: 'auto',           // Allow hyphenation
            textAlign: 'left',
            overflow: 'visible',       // Prevent clipping
            maxWidth: '100%',
            width: '100%'
          }}
        >
          {/* Render title with additional safeguards */}
          <h3 style={{
            margin: 0,
            padding: 0,
            fontSize: '1.1rem',
            fontWeight: 600,
            wordBreak: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            textAlign: 'left',
            width: '100%',
            maxWidth: '100%',
            overflow: 'visible',
            display: 'inline-block'
          }}>
            {title}
          </h3>
        </div>
        
        <div 
          className="info-content"
          style={{
            padding: '12px',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            width: '100%',
            maxWidth: '100%',
            overflow: 'visible',
            boxSizing: 'border-box'
          }}
        >
          {children}
        </div>
      </div>
      
      {/* Arrow pointer at bottom */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-10px',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #131a2a',
          zIndex: 10000
        }}
      />
    </div>
  );
};

export default CustomInfoWindow;
