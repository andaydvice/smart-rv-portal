
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarLinksProps {
  className?: string;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ className = "" }) => {
  return (
    <div className={`flex space-x-6 ${className}`}>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/models" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Models
      </NavLink>
      <NavLink 
        to="/features" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Features
      </NavLink>
      <NavLink 
        to="/technology" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Technology
      </NavLink>
      <NavLink 
        to="/calculators" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Calculators
      </NavLink>
      <NavLink 
        to="/advanced-search" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Search
      </NavLink>
      <NavLink 
        to="/storage-facilities" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Storage
      </NavLink>
      <NavLink 
        to="/blog" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Blog
      </NavLink>
      <NavLink 
        to="/rv-apps-hub" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Apps & Tools
      </NavLink>
      <NavLink 
        to="/solar-power-guide" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Solar Guide
      </NavLink>
      <NavLink 
        to="/rv-emergency-center" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Emergency
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        About
      </NavLink>
      <NavLink 
        to="/pricing" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Pricing
      </NavLink>
      <NavLink 
        to="/contact" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Contact
      </NavLink>
    </div>
  );
};

export default NavbarLinks;
