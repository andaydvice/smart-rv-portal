import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface RelatedLink {
  title: string;
  description: string;
  url: string;
  category: string;
  isExternal?: boolean;
}

interface InternalLinkingSuggestionsProps {
  currentPage: string;
  maxSuggestions?: number;
}

const InternalLinkingSuggestions: React.FC<InternalLinkingSuggestionsProps> = ({ 
  currentPage, 
  maxSuggestions = 6 
}) => {
  const linkSuggestions: Record<string, RelatedLink[]> = {
    homepage: [
      {
        title: "RV Models Comparison",
        description: "Compare luxury, compact, and adventure RV models",
        url: "/models/compare",
        category: "models"
      },
      {
        title: "Smart Kitchen Features",
        description: "Discover intelligent kitchen technology for your RV",
        url: "/features/smart-kitchen",
        category: "features"
      },
      {
        title: "Solar Power Guide",
        description: "Complete guide to RV solar systems and installation",
        url: "/solar-power-guide",
        category: "guides"
      },
      {
        title: "RV Storage Facilities",
        description: "Find secure storage solutions near you",
        url: "/storage-facilities",
        category: "services"
      },
      {
        title: "Emergency Preparedness",
        description: "Essential safety equipment and emergency planning",
        url: "/rv-emergency-center",
        category: "safety"
      },
      {
        title: "RV Technology Blog",
        description: "Latest insights on smart RV technology and travel tips",
        url: "/blog",
        category: "content"
      }
    ],
    blog: [
      {
        title: "Smart RV Technology",
        description: "Explore innovative RV automation and smart features",
        url: "/features",
        category: "features"
      },
      {
        title: "RV Cost Calculator",
        description: "Calculate your RV trip costs and expenses",
        url: "/calculators",
        category: "tools"
      },
      {
        title: "Luxury RV Models",
        description: "Discover premium RV models with advanced features",
        url: "/models/luxury",
        category: "models"
      },
      {
        title: "Solar Power Solutions",
        description: "Learn about RV solar panel systems and installation",
        url: "/solar-power-guide",
        category: "guides"
      }
    ],
    models: [
      {
        title: "Smart Features Overview",
        description: "Advanced technology features across all RV models",
        url: "/features",
        category: "features"
      },
      {
        title: "Remote Control Systems",
        description: "Control your RV remotely with smart technology",
        url: "/features/remote-control",
        category: "features"
      },
      {
        title: "Power Management",
        description: "Intelligent power systems for extended off-grid living",
        url: "/features/power-management",
        category: "features"
      },
      {
        title: "RV Calculators",
        description: "Essential tools for RV planning and cost analysis",
        url: "/calculators",
        category: "tools"
      }
    ],
    features: [
      {
        title: "Compare RV Models",
        description: "See which models include your desired features",
        url: "/models/compare",
        category: "models"
      },
      {
        title: "Technology Documentation",
        description: "Detailed technical guides and setup instructions",
        url: "/documentation",
        category: "support"
      },
      {
        title: "Smart RV Blog",
        description: "Latest updates on RV technology and innovations",
        url: "/blog",
        category: "content"
      },
      {
        title: "Essential RV Apps",
        description: "Must-have mobile apps for RV travelers",
        url: "/rv-apps-hub",
        category: "tools"
      }
    ]
  };

  const getCurrentPageSuggestions = (): RelatedLink[] => {
    if (currentPage.includes('/blog')) return linkSuggestions.blog || [];
    if (currentPage.includes('/models')) return linkSuggestions.models || [];
    if (currentPage.includes('/features')) return linkSuggestions.features || [];
    return linkSuggestions.homepage || [];
  };

  const suggestions = getCurrentPageSuggestions().slice(0, maxSuggestions);

  if (suggestions.length === 0) return null;

  return (
    <section className="py-12 bg-[#151A22]/50 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Explore Related Topics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {suggestions.map((link, index) => (
            <div
              key={index}
              className="bg-[#091020] border border-gray-700 rounded-lg p-6 hover:border-[#5B9BD5]/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-[#5B9BD5] uppercase tracking-wide">
                  {link.category}
                </span>
                {link.isExternal ? (
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[#5B9BD5] transition-colors" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#5B9BD5] transition-colors" />
                )}
              </div>
              
              {link.isExternal ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="font-semibold text-white mb-2 group-hover:text-[#5B9BD5] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {link.description}
                  </p>
                </a>
              ) : (
                <Link to={link.url} className="block">
                  <h3 className="font-semibold text-white mb-2 group-hover:text-[#5B9BD5] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {link.description}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalLinkingSuggestions;