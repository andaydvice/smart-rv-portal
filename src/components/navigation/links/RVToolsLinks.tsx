
import React from 'react';
import { NavLink } from 'react-router-dom';

interface RVToolsLinksProps {
  onClick?: () => void;
}

const RVToolsLinks = ({ onClick }: RVToolsLinksProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <NavLink 
        to="/calculators" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        RV Calculators
      </NavLink>
      <NavLink 
        to="/rv-weather" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        RV Weather
      </NavLink>
      <NavLink 
        to="/storage-facilities" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Storage Facilities
      </NavLink>
      <NavLink 
        to="/storage-preparation-checklist" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Storage Checklist
      </NavLink>
    </div>
  );
};

export default RVToolsLinks;
