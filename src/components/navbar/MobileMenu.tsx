
import { AnimatePresence, motion } from "framer-motion";
import MobileMenuSection from "./MobileMenuSection";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks, RVToolsLinks } from "../navigation/links";
import { Link } from "react-router-dom";
import { Calculator, LogIn, Home } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { LogOut } from "lucide-react";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MobileMenuProps {
  isOpen: boolean;
  openSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export default function MobileMenu({
  isOpen,
  openSections,
  toggleSection,
}: MobileMenuProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 shadow-xl z-50 md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <div className="pb-6">
            <MobileMenuSection
              title="Home"
              isOpen={false}
              toggleSection={() => {}}
              isLink={true}
              linkTo="/"
              hideChevron={true}
            >
              <Home className="h-4 w-4" />
            </MobileMenuSection>

            <MobileMenuSection
              title="RV Intelligence"
              isOpen={openSections.features}
              toggleSection={() => toggleSection("features")}
            >
              <SmartFeaturesLinks />
            </MobileMenuSection>

            <MobileMenuSection
              title="RV Systems"
              isOpen={openSections.core}
              toggleSection={() => toggleSection("core")}
            >
              <CoreSystemsLinks />
            </MobileMenuSection>

            <MobileMenuSection
              title="Models"
              isOpen={openSections.vehicles}
              toggleSection={() => toggleSection("vehicles")}
            >
              <VehicleSelectionLinks />
            </MobileMenuSection>

            <MobileMenuSection
              title="RV Tools"
              isOpen={openSections.tools}
              toggleSection={() => toggleSection("tools")}
            >
              <RVToolsLinks />
            </MobileMenuSection>

            <MobileMenuSection
              title="Blog"
              isOpen={false}
              toggleSection={() => {}}
              isLink={true}
              linkTo="/blog"
              hideChevron={true}
            >
              <div></div>
            </MobileMenuSection>

            <MobileMenuSection
              title="Support"
              isOpen={openSections.support}
              toggleSection={() => toggleSection("support")}
            >
              <SupportLinks />
            </MobileMenuSection>

            <MobileMenuSection
              title="Contact"
              isOpen={openSections.customer}
              toggleSection={() => toggleSection("customer")}
            >
              <CustomerSupportLinks />
            </MobileMenuSection>

            <div className="px-5 py-4 border-t border-gray-700 mt-2">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="h-4 w-4" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
