import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Calculator, MapPin, Cloud } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  showBackToMain?: boolean;
}

const DashboardHeader = ({ title, description, showBackToMain = true }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {showBackToMain && (
            <Link 
              to="/"
              className="flex items-center gap-2 text-[#60A5FA] hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Main Site</span>
            </Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 text-[#E2E8FF] hover:text-white transition-colors text-sm"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard Home</span>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        {description && <p className="text-[#E2E8FF]">{description}</p>}
        {user && (
          <p className="text-gray-400 text-sm mt-2">
            Welcome back, {user.email?.split('@')[0]}
          </p>
        )}
      </div>

      {/* Quick navigation breadcrumbs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Link 
          to="/calculators"
          className="flex items-center gap-2 px-3 py-2 bg-[#131a2a] rounded-lg border border-gray-600 hover:border-[#60A5FA] transition-colors text-sm"
        >
          <Calculator className="h-4 w-4 text-[#60A5FA]" />
          <span className="text-white">RV Tools</span>
        </Link>
        
        <Link 
          to="/storage-facilities"
          className="flex items-center gap-2 px-3 py-2 bg-[#131a2a] rounded-lg border border-gray-600 hover:border-[#60A5FA] transition-colors text-sm"
        >
          <MapPin className="h-4 w-4 text-[#60A5FA]" />
          <span className="text-white">Storage</span>
        </Link>

        <Link 
          to="/weather"
          className="flex items-center gap-2 px-3 py-2 bg-[#131a2a] rounded-lg border border-gray-600 hover:border-[#60A5FA] transition-colors text-sm"
        >
          <Cloud className="h-4 w-4 text-[#60A5FA]" />
          <span className="text-white">Weather</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;