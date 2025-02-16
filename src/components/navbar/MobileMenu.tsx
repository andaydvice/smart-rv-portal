import { Fragment } from "react";
import { Link } from "react-router-dom";
import MobileMenuSection from "./MobileMenuSection";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  Laptop,
  Settings,
  Car,
  Calculator,
  BookOpen,
  MessageSquare,
  User,
  LogIn,
  LogOut
} from "lucide-react";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "../NavbarLinks";

interface MobileMenuProps {
  isOpen: boolean;
  openSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

const MobileMenu = ({ isOpen, openSections, toggleSection }: MobileMenuProps) => {
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
    <div className="fixed inset-0 z-[9998] bg-[#080F1F]/95 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#151A22] shadow-xl">
        <div className="flex flex-col h-full pt-20 pb-6 overflow-y-auto">
          <nav className="flex-1 px-4 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-2 p-3 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>

            <MobileMenuSection
              title="Technology"
              icon={<Laptop className="h-5 w-5" />}
              isOpen={openSections.core}
              onToggle={() => toggleSection('core')}
            >
              <ul className="space-y-2 px-3 mt-2">
                <li>
                  <Link to="/voice-control" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Voice Control
                  </Link>
                </li>
                <li>
                  <Link to="/features/navigation" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Navigation System
                  </Link>
                </li>
                <li>
                  <Link to="/features/security" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Security System
                  </Link>
                </li>
                <li>
                  <Link to="/features/power" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Power Management
                  </Link>
                </li>
              </ul>
            </MobileMenuSection>

            <MobileMenuSection
              title="RV Systems"
              icon={<Settings className="h-5 w-5" />}
              isOpen={openSections.features}
              onToggle={() => toggleSection('features')}
            >
              <ul className="space-y-2 px-3 mt-2">
                <li>
                  <Link to="/features/smart-kitchen" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Smart Kitchen
                  </Link>
                </li>
                <li>
                  <Link to="/features/tv" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Smart TV
                  </Link>
                </li>
                <li>
                  <Link to="/features/audio" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Audio System
                  </Link>
                </li>
                <li>
                  <Link to="/features/internet" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Internet Connectivity
                  </Link>
                </li>
              </ul>
            </MobileMenuSection>

            <MobileMenuSection
              title="Models"
              icon={<Car className="h-5 w-5" />}
              isOpen={openSections.vehicles}
              onToggle={() => toggleSection('vehicles')}
            >
              <ul className="space-y-2 px-3 mt-2">
                <li>
                  <Link to="/models/compare" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Compare Models
                  </Link>
                </li>
                <li>
                  <Link to="/models/luxury" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Luxury Model
                  </Link>
                </li>
                <li>
                  <Link to="/models/adventure" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Adventure Model
                  </Link>
                </li>
                <li>
                  <Link to="/models/compact" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Compact Model
                  </Link>
                </li>
              </ul>
            </MobileMenuSection>

            <Link
              to="/calculators"
              className="flex items-center gap-2 p-3 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50"
            >
              <Calculator className="h-5 w-5" />
              RV Tools
            </Link>

            <Link
              to="/blog"
              className="flex items-center gap-2 p-3 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50"
            >
              <BookOpen className="h-5 w-5" />
              Blog
            </Link>

            <MobileMenuSection
              title="Support"
              icon={<MessageSquare className="h-5 w-5" />}
              isOpen={openSections.support}
              onToggle={() => toggleSection('support')}
            >
              <ul className="space-y-2 px-3 mt-2">
                <li>
                  <Link to="/troubleshooting" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Troubleshooting
                  </Link>
                </li>
                <li>
                  <Link to="/documentation" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/documentation/complete" className="flex items-center gap-2 p-2 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50">
                    Complete Documentation
                  </Link>
                </li>
              </ul>
            </MobileMenuSection>

            {user ? (
              <Fragment>
                <div className="flex items-center gap-2 p-3 text-[#A3B3BC]">
                  <User className="h-5 w-5" />
                  <span className="truncate">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 p-3 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </Fragment>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-2 p-3 text-[#A3B3BC] hover:text-[#4B9EF4] transition-colors rounded-lg hover:bg-[#0F1729]/50"
              >
                <LogIn className="h-5 w-5" />
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
