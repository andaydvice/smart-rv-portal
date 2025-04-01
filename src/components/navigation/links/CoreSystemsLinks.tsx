
import React from 'react';
import { NavLink } from 'react-router-dom';

interface CoreSystemsLinksProps {
  onClick?: () => void;
}

const CoreSystemsLinks = ({ onClick }: CoreSystemsLinksProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <NavLink 
        to="/features/power-management" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Power Management
      </NavLink>
      <NavLink 
        to="/features/water-systems" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Water Systems
      </NavLink>
      <NavLink 
        to="/features/entertainment" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Entertainment
      </NavLink>
      <NavLink 
        to="/features/climate-control" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Climate Control
      </NavLink>
    </div>
  );
};

export default CoreSystemsLinks;
