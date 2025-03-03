
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarLinks = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Link to="/rv-intelligence" className={`text-white hover:text-[#5B9BD5] transition-colors ${isActive('/rv-intelligence') ? 'text-[#5B9BD5]' : ''}`}>
        RV Intelligence
      </Link>
      <Link to="/rv-systems" className={`text-white hover:text-[#5B9BD5] transition-colors ${isActive('/rv-systems') ? 'text-[#5B9BD5]' : ''}`}>
        RV Systems
      </Link>
      <Link to="/models" className={`text-white hover:text-[#5B9BD5] transition-colors ${isActive('/models') ? 'text-[#5B9BD5]' : ''}`}>
        Models
      </Link>
      <Link to="/calculators" className={`text-white hover:text-[#5B9BD5] transition-colors ${isActive('/calculators') ? 'text-[#5B9BD5]' : ''}`}>
        RV Tools
      </Link>
      <Link to="/blog" className={`text-white hover:text-[#5B9BD5] transition-colors ${isActive('/blog') ? 'text-[#5B9BD5]' : ''}`}>
        Blog
      </Link>
      <Link to="/support" className={`text-white hover:text-[#5B9BD5] transition-colors ${isActive('/support') ? 'text-[#5B9BD5]' : ''}`}>
        Support
      </Link>
    </>
  );
};

export default NavbarLinks;
