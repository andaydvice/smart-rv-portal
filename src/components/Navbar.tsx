import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Smart RV</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white/95 hover:bg-white">Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] md:w-[500px] lg:w-[600px] bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="grid grid-cols-2 gap-4 p-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-primary">Smart Features</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="hover:text-primary transition-colors">
                              <NavigationMenuLink className="block p-2 rounded hover:bg-secondary/50">
                                Navigation System
                              </NavigationMenuLink>
                            </li>
                            <li className="hover:text-primary transition-colors">
                              <NavigationMenuLink className="block p-2 rounded hover:bg-secondary/50">
                                Security System
                              </NavigationMenuLink>
                            </li>
                            <li className="hover:text-primary transition-colors">
                              <NavigationMenuLink className="block p-2 rounded hover:bg-secondary/50">
                                Power Management
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-primary">Entertainment</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="hover:text-primary transition-colors">
                              <NavigationMenuLink className="block p-2 rounded hover:bg-secondary/50">
                                Smart TV
                              </NavigationMenuLink>
                            </li>
                            <li className="hover:text-primary transition-colors">
                              <NavigationMenuLink className="block p-2 rounded hover:bg-secondary/50">
                                Audio System
                              </NavigationMenuLink>
                            </li>
                            <li className="hover:text-primary transition-colors">
                              <NavigationMenuLink className="block p-2 rounded hover:bg-secondary/50">
                                Internet Connectivity
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-base bg-white/95 hover:bg-white">Models</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-base bg-white/95 hover:bg-white">Technology</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-base bg-white/95 hover:bg-white">Sustainability</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-base bg-white/95 hover:bg-white">Contact</Button>
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
              className="bg-white/95 hover:bg-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2">
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-secondary/50">Features</Button>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-secondary/50">Models</Button>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-secondary/50">Technology</Button>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-secondary/50">Sustainability</Button>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-secondary/50">Contact</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;