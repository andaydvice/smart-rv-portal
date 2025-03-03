
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import NavbarLinks from './NavbarLinks';

const Navbar = () => {
  return (
    <header className="navbar" style={{ visibility: 'visible', display: 'block' }}>
      <div className="navbar-container">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-white text-xl">Smart Road Portal</span>
          </Link>
        </div>
        
        <nav className="navbar-links hidden md:flex">
          <NavbarLinks />
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/contact">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              Contact
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-white text-black hover:bg-white/90">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
