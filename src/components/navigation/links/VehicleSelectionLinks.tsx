
import React from 'react';
import { NavLink } from 'react-router-dom';

interface VehicleSelectionLinksProps {
  onClick?: () => void;
}

const VehicleSelectionLinks = ({ onClick }: VehicleSelectionLinksProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <NavLink 
        to="/models/luxury" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Luxury Models
      </NavLink>
      <NavLink 
        to="/models/compact" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Compact Models
      </NavLink>
      <NavLink 
        to="/models/adventure" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Adventure Models
      </NavLink>
      <NavLink 
        to="/models/compare" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Compare Models
      </NavLink>
    </div>
  );
};

export default VehicleSelectionLinks;
