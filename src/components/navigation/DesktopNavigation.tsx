
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Calculator, CloudSun, Warehouse, ClipboardCheck,
  Brain, Lightbulb, Eye, Search,
  Cog, Layers, Activity, Network,
  Car, Truck, Tent, LayoutTemplate,
  HelpCircle, MessageCircleQuestion, LifeBuoy, Phone, BookOpen
} from "lucide-react";
import AuthButtons from "./AuthButtons";
import HoverDropdownMenu from "./HoverDropdownMenu";
import HoverDropdownMenuV2 from "./HoverDropdownMenuV2";
import { SearchBar } from "@/components/search";

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

  // Define RV Intelligence links with icons
  const intelligenceLinks = [
    { 
      text: "Voice Control", 
      href: "/voice-control",
      icon: <Brain size={16} className="text-[#D946EF]" />
    },
    { 
      text: "Smart Automation", 
      href: "/features/smart-automation",
      icon: <Lightbulb size={16} className="text-[#F59E0B]" /> 
    },
    { 
      text: "Security System", 
      href: "/features/security-system",
      icon: <Eye size={16} className="text-[#10B981]" />
    },
    { 
      text: "Navigation System", 
      href: "/features/navigation-system",
      icon: <Search size={16} className="text-[#3B82F6]" />
    }
  ];

  // Define RV Systems links with icons
  const systemsLinks = [
    { 
      text: "Power Management", 
      href: "/features/power-management",
      icon: <Cog size={16} className="text-[#F97316]" />
    },
    { 
      text: "Water Systems", 
      href: "/features/water-systems",
      icon: <Layers size={16} className="text-[#0EA5E9]" />
    },
    { 
      text: "Climate Control", 
      href: "/features/climate-control",
      icon: <Activity size={16} className="text-[#10B981]" />
    },
    { 
      text: "Entertainment", 
      href: "/features/entertainment",
      icon: <Network size={16} className="text-[#8B5CF6]" />
    }
  ];

  // Define Models links with icons
  const modelsLinks = [
    { 
      text: "Luxury Models", 
      href: "/models/luxury-model",
      icon: <Car size={16} className="text-[#F59E0B]" />
    },
    { 
      text: "Compact Models", 
      href: "/models/compact-model",
      icon: <Truck size={16} className="text-[#3B82F6]" />
    },
    { 
      text: "Adventure Models", 
      href: "/models/adventure-model",
      icon: <Tent size={16} className="text-[#10B981]" />
    },
    { 
      text: "Compare Models", 
      href: "/models/compare-models",
      icon: <LayoutTemplate size={16} className="text-[#D946EF]" />
    }
  ];

  // Define Support links with icons — include FAQ as one link plus others cleanly
  const supportLinks = [
    { 
      text: "Technology FAQ", 
      href: "/technology",
      icon: <HelpCircle size={16} className="text-[#5B9BD5]" /> 
    },
    { 
      text: "Troubleshooting", 
      href: "/troubleshooting",
      icon: <HelpCircle size={16} className="text-[#F97316]" />
    },
    { 
      text: "Documentation", 
      href: "/documentation",
      icon: <MessageCircleQuestion size={16} className="text-[#0EA5E9]" />
    },
    { 
      text: "Schedule Demo", 
      href: "/schedule-demo",
      icon: <LifeBuoy size={16} className="text-[#8B5CF6]" />
    }
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
        
        {/* Search Bar */}
        <div className="ml-2">
          <SearchBar />
        </div>
      </div>

      <AuthButtons />
    </div>
  );
};

export default DesktopNavigation;
