import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SmartFeatureLinks, EntertainmentLinks } from "./NavbarLinks";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-md" : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">Smart RV</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="bg-transparent hover:bg-blue-400/80 text-white hover:text-white"
                    onClick={() => navigate('/features')}
                  >
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] md:w-[500px] lg:w-[600px] bg-gray-900/95 rounded-lg shadow-lg border border-gray-700">
                      <div className="grid grid-cols-2 gap-4 p-6">
                        <SmartFeatureLinks />
                        <EntertainmentLinks />
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className="text-base bg-transparent hover:bg-blue-400/80 text-white hover:text-white"
                    onClick={() => navigate('/models')}
                  >
                    Models
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className="text-base bg-transparent hover:bg-blue-400/80 text-white hover:text-white"
                    onClick={() => navigate('/technology')}
                  >
                    Technology
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className="text-base bg-transparent hover:bg-blue-400/80 text-white hover:text-white"
                    onClick={() => navigate('/contact')}
                  >
                    Contact
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-transparent hover:bg-white/50 text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-lg rounded-lg mt-2">
              <Button 
                variant="ghost" 
                className="w-full text-left justify-start text-white hover:bg-blue-400/80 hover:text-white"
                onClick={() => {
                  navigate('/features');
                  setIsMobileMenuOpen(false);
                }}
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left justify-start text-white hover:bg-blue-400/80 hover:text-white"
                onClick={() => {
                  navigate('/models');
                  setIsMobileMenuOpen(false);
                }}
              >
                Models
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left justify-start text-white hover:bg-blue-400/80 hover:text-white"
                onClick={() => {
                  navigate('/technology');
                  setIsMobileMenuOpen(false);
                }}
              >
                Technology
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left justify-start text-white hover:bg-blue-400/80 hover:text-white"
                onClick={() => {
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;