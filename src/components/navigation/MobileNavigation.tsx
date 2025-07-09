
import React from 'react';
import { Link } from "react-router-dom";
import { 
  Home, Zap, Car, Calculator, HelpCircle, Phone, BookOpen, DollarSign, User,
  Smartphone, AlertTriangle, Sun, CloudSun, Warehouse
} from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-xl">
      <div className="px-4 py-4 space-y-1">
        
        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Home className="h-5 w-5" />
          Home
        </Link>

        {/* Models */}
        <Link
          to="/models"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Car className="h-5 w-5" />
          Models
        </Link>

        {/* Features */}
        <Link
          to="/features"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Zap className="h-5 w-5" />
          Features
        </Link>

        {/* Technology */}
        <Link
          to="/technology"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Zap className="h-5 w-5" />
          Technology
        </Link>

        {/* Calculators */}
        <Link
          to="/calculators"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Calculator className="h-5 w-5" />
          Calculators
        </Link>

        {/* Storage */}
        <Link
          to="/storage-facilities"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Home className="h-5 w-5" />
          Storage
        </Link>

        {/* Blog */}
        <Link
          to="/blog"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <BookOpen className="h-5 w-5" />
          Blog
        </Link>

        {/* Resources Section Header */}
        <div className="pt-4 pb-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
            Resources
          </h3>
        </div>

        {/* RV Apps Hub */}
        <Link
          to="/rv-apps-hub"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Smartphone className="h-5 w-5" />
          RV Apps & Tools
        </Link>

        {/* RV Emergency Center */}
        <Link
          to="/rv-emergency-center"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <AlertTriangle className="h-5 w-5" />
          Emergency Center
        </Link>

        {/* Solar Power Guide */}
        <Link
          to="/solar-power-guide"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Sun className="h-5 w-5" />
          Solar Power Guide
        </Link>

        {/* RV Weather */}
        <Link
          to="/rv-weather"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <CloudSun className="h-5 w-5" />
          RV Weather
        </Link>

        {/* About */}
        <Link
          to="/about"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <User className="h-5 w-5" />
          About
        </Link>

        {/* Pricing */}
        <Link
          to="/pricing"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <DollarSign className="h-5 w-5" />
          Pricing
        </Link>

        {/* Support */}
        <Link
          to="/troubleshooting"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          Support
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Phone className="h-5 w-5" />
          Contact
        </Link>

      </div>
    </div>
  );
};

export default MobileNavigation;
