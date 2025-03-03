
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import NavbarLinks from './NavbarLinks';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-[#080F1F]/95' : 'bg-[#080F1F]/70'} backdrop-blur-sm border-b border-white/10 transition-all duration-300`}>
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
            <Button className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white">
              Sign In
            </Button>
          </Link>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080F1F] border-t border-white/10 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <NavbarLinks />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
