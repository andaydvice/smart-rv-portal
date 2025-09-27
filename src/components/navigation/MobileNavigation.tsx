
import React from 'react';
import { Link } from "react-router-dom";
import { Home, Zap, Car, Calculator, HelpCircle, Phone, BookOpen, DollarSign, User, Bed, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation = ({ isOpen }: MobileNavigationProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

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

        {/* RV Comfort Guide */}
        <Link
          to="/rv-comfort-guide"
          className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
        >
          <Bed className="h-5 w-5" />
          RV Comfort Guide
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

        {/* Authentication Section */}
        <div className="border-t border-gray-700 pt-4 mt-4">
          {user ? (
            <>
              <div className="px-3 py-2 text-gray-400 text-sm">
                Signed in as: {user.email}
              </div>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-3 text-gray-300 hover:text-[#5B9BD5] px-3 py-3 rounded-md text-base font-medium transition-colors"
            >
              <LogIn className="h-5 w-5" />
              Login / Sign Up
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default MobileNavigation;
