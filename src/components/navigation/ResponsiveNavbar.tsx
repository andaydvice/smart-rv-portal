
import { useState, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LogIn, LogOut, User } from "lucide-react";
import { Logo } from "../Logo";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks, RVToolsLinks } from "./links";

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Close mobile menu when window resizes to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080F1F]/95 backdrop-blur-sm border-b border-[#1E2A3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="hover-scale flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-2">
                {!isHomePage && (
                  <NavigationMenuItem>
                    <Link 
                      to="/" 
                      className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
                    RV Intelligence
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                      <SmartFeaturesLinks />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
                    RV Systems
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                      <CoreSystemsLinks />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
                    Models
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                      <VehicleSelectionLinks />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
                    RV Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                      <RVToolsLinks />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/blog" 
                    className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/storage-facilities" 
                    className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
                  >
                    Storage
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-[#5B9BD5] transition-colors !bg-transparent data-[state=open]:!bg-transparent text-base">
                    Support
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg p-6">
                      <div className="grid gap-6 grid-cols-2">
                        <SupportLinks />
                        <CustomerSupportLinks />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex items-center gap-2 text-gray-300">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm truncate max-w-[150px]">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-sm flex items-center gap-2 whitespace-nowrap px-3 py-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-sm flex items-center gap-2 whitespace-nowrap px-3 py-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-[#5B9BD5] focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0A101E] border-t border-[#1E2A3E] max-h-[calc(100vh-4rem)] overflow-y-auto">
            {!isHomePage && (
              <Link
                to="/"
                className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
            )}
            <Link
              to="/features/internet-connectivity"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              RV Intelligence
            </Link>
            <Link
              to="/documentation"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              RV Systems
            </Link>
            <Link
              to="/models"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              Models
            </Link>
            <Link
              to="/calculators"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              RV Tools
            </Link>
            <Link
              to="/blog"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              Blog
            </Link>
            <Link
              to="/storage-facilities"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              Storage
            </Link>
            <Link
              to="/storage-preparation-checklist"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              Storage Checklist
            </Link>
            <Link
              to="/troubleshooting"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              Troubleshooting
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            
            {/* Auth section for mobile */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              {user ? (
                <>
                  <div className="flex items-center px-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white truncate max-w-[200px]">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#5B9BD5] hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 px-2">
                  <Link
                    to="/auth"
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[#5B9BD5] hover:bg-gray-800"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default ResponsiveNavbar;
