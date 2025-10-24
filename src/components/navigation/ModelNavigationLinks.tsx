import { Link } from "react-router-dom";
import { ArrowLeft, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelNavigationLinksProps {
  className?: string;
}

export const ModelNavigationLinks = ({ className = "" }: ModelNavigationLinksProps) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-8 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Back to Models Hub */}
        <Link to="/models">
          <Button
            variant="outline"
            className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            View All Models
          </Button>
        </Link>

        {/* Compare Models */}
        <Link to="/models/compare">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
          >
            <GitCompare className="w-4 h-4 mr-2" />
            Compare Models
          </Button>
        </Link>
      </div>

      {/* Additional Navigation Hint */}
      <p className="text-gray-400 text-sm text-center mt-4">
        Explore our full lineup of luxury, adventure, and compact smart RVs
      </p>
    </div>
  );
};
