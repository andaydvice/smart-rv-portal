
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLinks = () => {
  return (
    <>
      <Link to="/models" className="text-white hover:text-blue-300 transition-colors">
        Models
      </Link>
      <Link to="/features" className="text-white hover:text-blue-300 transition-colors">
        Features
      </Link>
      <Link to="/technology" className="text-white hover:text-blue-300 transition-colors">
        Technology
      </Link>
      <Link to="/blog" className="text-white hover:text-blue-300 transition-colors">
        Blog
      </Link>
      <Link to="/calculators" className="text-white hover:text-blue-300 transition-colors">
        Tools
      </Link>
    </>
  );
};

export default NavbarLinks;
