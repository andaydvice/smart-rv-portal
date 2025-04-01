
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SupportLinksProps {
  onClick?: () => void;
}

const SupportLinks = ({ onClick }: SupportLinksProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <NavLink 
        to="/troubleshooting" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Troubleshooting
      </NavLink>
      <NavLink 
        to="/documentation" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Documentation
      </NavLink>
      <NavLink 
        to="/contact" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Contact Us
      </NavLink>
      <NavLink 
        to="/schedule-demo" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Schedule Demo
      </NavLink>
    </div>
  );
};

export default SupportLinks;
