
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative z-50 bg-transparent">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            Smart RV Portal
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-connectivity-accent transition-colors">
              Home
            </a>
            <a href="#calculators" className="text-white hover:text-connectivity-accent transition-colors">
              Calculators
            </a>
            <a href="#about" className="text-white hover:text-connectivity-accent transition-colors">
              About
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
