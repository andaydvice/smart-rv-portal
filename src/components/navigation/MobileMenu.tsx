
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, LogOut, User } from "lucide-react";
import NavigationSection from "./NavigationSection";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0A101E] border-t border-[#1E2A3E] max-h-[calc(100vh-4rem)] overflow-y-auto">
        <Link
          to="/"
          className="text-gray-300 hover:text-[#5B9BD5] block px-3 py-2 rounded-md text-base font-medium"
        >
          Home
        </Link>
        
        <NavigationSection 
          title="RV Intelligence"
          expanded={!!expandedSections['intelligence']}
          onToggle={() => toggleSection('intelligence')}
          path="/features/internet-connectivity"
        />
        
        <NavigationSection 
          title="RV Systems"
          expanded={!!expandedSections['systems']}
          onToggle={() => toggleSection('systems')}
          path="/documentation"
        />
        
        <NavigationSection 
          title="Models"
          expanded={!!expandedSections['models']}
          onToggle={() => toggleSection('models')}
          path="/models"
        />
        
        <NavigationSection 
          title="RV Tools"
          expanded={!!expandedSections['tools']}
          onToggle={() => toggleSection('tools')}
          path="/calculators"
        />
        
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
  );
};

export default MobileMenu;
