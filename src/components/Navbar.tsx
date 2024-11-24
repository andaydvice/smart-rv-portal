import { useState, useEffect } from "react";
import { Menu, X, Navigation, Shield, Battery, Tv, Music, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Smart Features</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-400 transition-colors text-gray-300">
                              <Link to="/features" className="block p-2 rounded hover:bg-gray-800/50">
                                <span className="flex items-center gap-2">
                                  <Navigation className="h-4 w-4 text-blue-500" />
                                  Navigation System
                                </span>
                              </Link>
                            </li>
                            <li className="hover:text-blue-400 transition-colors text-gray-300">
                              <Link to="/features" className="block p-2 rounded hover:bg-gray-800/50">
                                <span className="flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-emerald-500" />
                                  Security System
                                </span>
                              </Link>
                            </li>
                            <li className="hover:text-blue-400 transition-colors text-gray-300">
                              <Link to="/features" className="block p-2 rounded hover:bg-gray-800/50">
                                <span className="flex items-center gap-2">
                                  <Battery className="h-4 w-4 text-yellow-500" />
                                  Power Management
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-white">Entertainment</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-400 transition-colors text-gray-300">
                              <Link to="/features" className="block p-2 rounded hover:bg-gray-800/50">
                                <span className="flex items-center gap-2">
                                  <Tv className="h-4 w-4 text-purple-500" />
                                  Smart TV
                                </span>
                              </Link>
                            </li>
                            <li className="hover:text-blue-400 transition-colors text-gray-300">
                              <Link to="/features" className="block p-2 rounded hover:bg-gray-800/50">
                                <span className="flex items-center gap-2">
                                  <Music className="h-4 w-4 text-pink-500" />
                                  Audio System
                                </span>
                              </Link>
                            </li>
                            <li className="hover:text-blue-400 transition-colors text-gray-300">
                              <Link to="/features" className="block p-2 rounded hover:bg-gray-800/50">
                                <span className="flex items-center gap-2">
                                  <Wifi className="h-4 w-4 text-cyan-500" />
                                  Internet Connectivity
                                </span>
                              </Link>
                            </li>
                          </ul>
                        </div>
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