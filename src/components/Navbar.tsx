
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import NavbarLinks from './NavbarLinks';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080F1F]/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
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
