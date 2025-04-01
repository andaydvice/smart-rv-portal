
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SmartFeaturesLinksProps {
  onClick?: () => void;
}

const SmartFeaturesLinks = ({ onClick }: SmartFeaturesLinksProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <NavLink 
        to="/voice-control" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Voice Control
      </NavLink>
      <NavLink 
        to="/features/smart-automation" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Smart Automation
      </NavLink>
      <NavLink 
        to="/features/security-system" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Security System
      </NavLink>
      <NavLink 
        to="/features/navigation-system" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Navigation System
      </NavLink>
    </div>
  );
};

export default SmartFeaturesLinks;
