import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RelatedFeature {
  title: string;
  path: string;
  description: string;
}

interface FeatureNavigationLinksProps {
  relatedFeatures: RelatedFeature[];
  className?: string;
}

export const FeatureNavigationLinks = ({ relatedFeatures, className = "" }: FeatureNavigationLinksProps) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-8 ${className}`}>
      {/* Back to Features Hub */}
      <div className="mb-8">
        <Link to="/features">
          <Button
            variant="outline"
            className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Features Hub
          </Button>
        </Link>
      </div>

      {/* Related Features */}
      {relatedFeatures.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Explore Related Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedFeatures.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="group bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg p-4 transition-all duration-200"
              >
                <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm mb-3">{feature.description}</p>
                <div className="flex items-center text-blue-400 text-sm">
                  Learn more
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
