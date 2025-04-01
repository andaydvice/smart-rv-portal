
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarLinksProps {
  className?: string;
  onClick?: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ className = "", onClick }) => {
  return (
    <div className={`flex space-x-6 ${className}`}>
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Home
      </NavLink>
      <NavLink 
        to="/models" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Models
      </NavLink>
      <NavLink 
        to="/compare-models" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Compare Models
      </NavLink>
      <NavLink 
        to="/features" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Features
      </NavLink>
      <NavLink 
        to="/technology" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Technology
      </NavLink>
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
        to="/storage-facilities" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Storage
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
        to="/blog" 
        className={({ isActive }) => 
          isActive ? "text-[#5B9BD5] font-medium" : "text-gray-300 hover:text-white transition-colors"
        }
        onClick={onClick}
      >
        Blog
      </NavLink>
    </div>
  );
};

export default NavbarLinks;
