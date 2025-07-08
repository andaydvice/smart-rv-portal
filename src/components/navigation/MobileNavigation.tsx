
import React from 'react';
import { Link } from "react-router-dom";
import { 
  Home, Zap, Car, Calculator, HelpCircle, Phone, BookOpen, DollarSign, User,
  Smartphone, AlertTriangle, Sun, CloudSun, Warehouse, LogIn, Settings, Shield,
  Crown, LogOut
} from "lucide-react";
import { useAuth } from '@/components/auth/AuthProvider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import LocationIndicator from '@/components/international/LocationIndicator';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { user, isAdmin, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-gray-900 border-t border-gray-800 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="px-4 py-4 space-y-1">
        
        {/* User Section - Shows when logged in */}
        {user && (
          <>
            <div className="px-3 py-4 bg-[#091020] rounded-lg mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#5B9BD5] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {getInitials(user.email || 'U')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{user.email}</p>
                  {isAdmin && (
                    <div className="flex items-center gap-1 mt-1">
                      <Crown className="h-3 w-3 text-[#5B9BD5]" />
                      <span className="text-xs text-[#5B9BD5]">Administrator</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick User Actions */}
              <div className="space-y-2">
                <Link
                  to="/account-settings"
                  onClick={onClose}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#5B9BD5] text-sm px-2 py-1 rounded transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Link>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={onClose}
                    className="flex items-center gap-2 text-gray-300 hover:text-[#5B9BD5] text-sm px-2 py-1 rounded transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
            <Separator className="bg-gray-700" />
          </>
        )}

        {/* Location Indicator */}
        <div className="px-3 py-2">
          <LocationIndicator />
        </div>
        <Separator className="bg-gray-700" />
        
        {/* Login Option - Shows when NOT logged in */}
        {!user && (
          <>
            <Link
              to="/auth"
              onClick={onClose}
              className="flex items-center gap-3 text-[#5B9BD5] hover:text-[#4B8FE3] px-3 py-3 rounded-md text-base font-medium transition-colors bg-[#5B9BD5]/10 border border-[#5B9BD5]/20"
            >
              <LogIn className="h-5 w-5" />
              Sign In / Sign Up
            </Link>
            <Separator className="bg-gray-700" />
          </>
        )}
        
        {/* Home */}
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Home className="h-5 w-5" />
          Home
        </Link>

        {/* Models */}
        <Link
          to="/models"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Car className="h-5 w-5" />
          Models
        </Link>

        {/* Features */}
        <Link
          to="/features"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Zap className="h-5 w-5" />
          Features
        </Link>

        {/* Technology */}
        <Link
          to="/technology"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Zap className="h-5 w-5" />
          Technology
        </Link>

        {/* Calculators */}
        <Link
          to="/calculators"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Calculator className="h-5 w-5" />
          Calculators
        </Link>

        {/* Storage */}
        <Link
          to="/storage-facilities"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Home className="h-5 w-5" />
          Storage
        </Link>

        {/* Blog */}
        <Link
          to="/blog"
          onClick={onClose}
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
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Smartphone className="h-5 w-5" />
          RV Apps & Tools
        </Link>

        {/* RV Emergency Center */}
        <Link
          to="/rv-emergency-center"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <AlertTriangle className="h-5 w-5" />
          Emergency Center
        </Link>

        {/* Solar Power Guide */}
        <Link
          to="/solar-power-guide"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Sun className="h-5 w-5" />
          Solar Power Guide
        </Link>

        {/* RV Weather */}
        <Link
          to="/rv-weather"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <CloudSun className="h-5 w-5" />
          RV Weather
        </Link>

        {/* About */}
        <Link
          to="/about"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <User className="h-5 w-5" />
          About
        </Link>

        {/* Pricing */}
        <Link
          to="/pricing"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <DollarSign className="h-5 w-5" />
          Pricing
        </Link>

        {/* Support */}
        <Link
          to="/troubleshooting"
          onClick={onClose}
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          Support
        </Link>

        {/* Contact */}
        <Link
          to="/contact"
          onClick={onClose}
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
