
import { Link, useLocation } from "react-router-dom";
import { Home, Calculator, CloudSun, Warehouse, ClipboardCheck } from "lucide-react";
import AuthButtons from "./AuthButtons";
import HoverDropdownMenu from "./HoverDropdownMenu";
import HoverDropdownMenuV2 from "./HoverDropdownMenuV2";
import { CoreSystemsLinks, SmartFeaturesLinks, VehicleSelectionLinks, SupportLinks, CustomerSupportLinks } from "./links";

const DesktopNavigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Define RV Tools links for the hover dropdown with icons and specific colors
  const rvToolsLinks = [
    { 
      text: "RV Calculators", 
      href: "/calculators", 
      icon: <Calculator size={16} className="text-[#F59E0B]" /> 
    },
    { 
      text: "RV Weather", 
      href: "/rv-weather", 
      icon: <CloudSun size={16} className="text-[#3B82F6]" /> 
    },
    { 
      text: "Storage Facilities", 
      href: "/storage-facilities", 
      icon: <Warehouse size={16} className="text-[#8B5CF6]" /> 
    },
    { 
      text: "Storage Checklist", 
      href: "/storage-preparation-checklist", 
      icon: <ClipboardCheck size={16} className="text-[#10B981]" /> 
    }
  ];

  // Define RV Intelligence links
  const intelligenceLinks = [
    { text: "Voice Control", href: "/voice-control" },
    { text: "Smart Automation", href: "/features/smart-automation" },
    { text: "Security System", href: "/features/security-system" },
    { text: "Navigation System", href: "/features/navigation-system" }
  ];

  // Define RV Systems links
  const systemsLinks = [
    { text: "Power Management", href: "/features/power-management" },
    { text: "Water Systems", href: "/features/water-systems" },
    { text: "Climate Control", href: "/features/climate-control" },
    { text: "Entertainment", href: "/features/entertainment" }
  ];

  // Define Models links
  const modelsLinks = [
    { text: "Luxury Models", href: "/models/luxury-model" },
    { text: "Compact Models", href: "/models/compact-model" },
    { text: "Adventure Models", href: "/models/adventure-model" },
    { text: "Compare Models", href: "/models/compare-models" }
  ];

  // Define Support links
  const supportLinks = [
    { text: "Troubleshooting", href: "/troubleshooting" },
    { text: "Documentation", href: "/documentation" },
    { text: "Contact Us", href: "/contact" },
    { text: "Schedule Demo", href: "/schedule-demo" }
  ];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        {!isHomePage && (
          <Link 
            to="/" 
            className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        )}

        {/* RV Intelligence Dropdown */}
        <HoverDropdownMenuV2 
          trigger="RV Intelligence" 
          links={intelligenceLinks}
        />

        {/* RV Systems Dropdown */}
        <HoverDropdownMenuV2 
          trigger="RV Systems" 
          links={systemsLinks}
        />

        {/* Models Dropdown */}
        <HoverDropdownMenuV2 
          trigger="Models" 
          links={modelsLinks}
        />

        {/* RV Tools Dropdown */}
        <HoverDropdownMenu 
          trigger="RV Tools" 
          links={rvToolsLinks}
        />

        {/* Blog Link */}
        <Link 
          to="/blog" 
          className="text-gray-300 hover:text-[#5B9BD5] transition-colors text-base flex items-center gap-2 px-4 py-2"
        >
          Blog
        </Link>

        {/* Support Dropdown */}
        <HoverDropdownMenuV2 
          trigger="Support" 
          links={supportLinks}
        />
      </div>

      <AuthButtons />
    </div>
  );
};

export default DesktopNavigation;
