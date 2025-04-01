
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface SmartLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Enhanced Link component that prevents page reloads
 * Use this instead of regular <a> tags for internal navigation
 */
const SmartLink: React.FC<SmartLinkProps> = ({ 
  to, 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <Link 
      to={to} 
      className={className}
      onClick={(e) => {
        // Don't intercept if special keys are pressed
        if (e.ctrlKey || e.metaKey || e.shiftKey) {
          return;
        }
        
        // Make sure we're only handling internal links
        if (typeof to === 'string' && (to.startsWith('http') || to.startsWith('//'))) {
          return;
        }
        
        // Mark the event as handled to prevent double handling
        e.currentTarget.dataset.handled = 'true';
        
        // Everything else handled by React Router
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SmartLink;
