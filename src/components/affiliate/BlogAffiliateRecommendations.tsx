import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface BlogAffiliateRecommendationsProps {
  category: 'tech' | 'travel' | 'general';
}

export const BlogAffiliateRecommendations = ({ category }: BlogAffiliateRecommendationsProps) => {
  const getRecommendations = () => {
    switch (category) {
      case 'tech':
        return [
          {
            title: "TechnoRV Smart Systems",
            description: "Upgrade your RV with GPS tracking, WiFi boosters, and smart monitoring systems mentioned in our tech articles.",
            link: "https://technorv.com/?ref=smartroadportal",
            commission: "Tech Leader",
            cta: "Shop Smart RV Tech"
          },
          {
            title: "RV Water Filter Store",
            description: "Premium water filtration systems with smart monitoring capabilities for safer RV water.",
            link: "https://rvwaterfilterstore.com/?ref=smartroadportal", 
            commission: "Premium Quality",
            cta: "Improve Your Water"
          }
        ];
      case 'travel':
        return [
          {
            title: "RVShare Premium Rentals",
            description: "Experience the RV destinations featured in our travel guides with smart, tech-equipped rentals.",
            link: "https://rvshare.com/?ref=smartroadportal",
            commission: "Most Popular",
            cta: "Book Your RV Trip"
          },
          {
            title: "RV Life Pro",
            description: "Plan your routes using the campgrounds and destinations we recommend in our travel articles.",
            link: "https://rvlife.com/?ref=smartroadportal",
            commission: "Editor's Choice",
            cta: "Plan Your Journey"
          }
        ];
      default:
        return [
          {
            title: "RV Life Pro Membership",
            description: "Complete RV planning toolkit with everything you need for smart RV living.",
            link: "https://rvlife.com/?ref=smartroadportal",
            commission: "Best Value",
            cta: "Get Started"
          },
          {
            title: "Good Sam Protection",
            description: "Comprehensive RV insurance and roadside assistance for peace of mind on every journey.",
            link: "https://goodsam.com/?ref=smartroadportal",
            commission: "Peace of Mind",
            cta: "Protect Your RV"
          }
        ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-gradient-to-r from-[#5B9BD5]/10 to-[#4B8FE3]/10 border border-[#5B9BD5]/20 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <ExternalLink className="h-5 w-5" />
        Recommended for This Article
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-white">{rec.title}</h4>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                {rec.commission}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-3">{rec.description}</p>
            <Button 
              asChild
              size="sm"
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              <a 
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {rec.cta}
                <ArrowRight className="h-3 w-3" />
              </a>
            </Button>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-400 mt-4">
        Affiliate partnerships help us provide free content while maintaining unbiased reviews.
      </p>
    </div>
  );
};