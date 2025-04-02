
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
        to="/compare-models" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Compare Models
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
        to="/voice-control" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Voice Control
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
        to="/storage-preparation-checklist" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Storage Checklist
      </NavLink>
      <NavLink 
        to="/troubleshooting" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Troubleshooting
      </NavLink>
      <NavLink 
        to="/blog" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
      >
        Blog
      </NavLink>
    </div>
  );
};

export default NavbarLinks;
