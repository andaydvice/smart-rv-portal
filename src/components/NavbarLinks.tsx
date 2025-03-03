
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLinks = () => {
  return (
    <>
      <Link to="/rv-intelligence" className="text-white hover:text-[#5B9BD5] transition-colors">
        RV Intelligence
      </Link>
      <Link to="/rv-systems" className="text-white hover:text-[#5B9BD5] transition-colors">
        RV Systems
      </Link>
      <Link to="/models" className="text-white hover:text-[#5B9BD5] transition-colors">
        Models
      </Link>
      <Link to="/calculators" className="text-white hover:text-[#5B9BD5] transition-colors">
        RV Tools
      </Link>
      <Link to="/blog" className="text-white hover:text-[#5B9BD5] transition-colors">
        Blog
      </Link>
      <Link to="/support" className="text-white hover:text-[#5B9BD5] transition-colors">
        Support
      </Link>
    </>
  );
};

export default NavbarLinks;
