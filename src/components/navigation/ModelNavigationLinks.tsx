import { Link } from "react-router-dom";
import { ArrowLeft, GitCompare, DollarSign, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModelNavigationLinksProps {
  className?: string;
}

export const ModelNavigationLinks = ({ className = "" }: ModelNavigationLinksProps) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-8 ${className}`}>
      {/* Call-to-Action Section */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
        <h3 className="text-xl font-semibold text-white mb-3">Ready to Make This RV Yours?</h3>
        <p className="text-gray-300 mb-4">
          Explore pricing options for this model with smart technology packages, or schedule a free consultation to discuss customization and financing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/pricing">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              <DollarSign className="w-4 h-4 mr-2" />
              View Pricing & Packages
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/20 w-full sm:w-auto">
              <Phone className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </div>

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
