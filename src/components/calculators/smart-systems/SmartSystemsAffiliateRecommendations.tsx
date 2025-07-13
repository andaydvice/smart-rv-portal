import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const SmartSystemsAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "TechnoRV Smart Systems",
      description: "Smart RV systems and surge protection that safeguards your investment and enhances your experience. Professional grade protection and convenience features.",
      link: "https://technorv.com",
      features: [
        "Smart RV systems",
        "Surge protection",
        "Investment protection",
        "Professional grade"
      ]
    },
    {
      title: "Winegard",
      description: "Stay connected everywhere with premium WiFi extenders and satellite internet solutions. Reliable connectivity for work and entertainment on the road.",
      link: "https://winegard.com",
      features: [
        "WiFi extenders",
        "Satellite internet",
        "Reliable connectivity",
        "Work and entertainment"
      ]
    },
    {
      title: "RV LIFE Pro",
      description: "The most comprehensive RV trip planning and GPS navigation app built specifically for RVers. Plan routes, find campgrounds, and navigate safely.",
      link: "https://rvlife.com",
      features: [
        "Trip planning app",
        "GPS navigation",
        "RV specific routes",
        "Campground finder"
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            📱 Recommended Smart Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Upgrade your RV with smart systems and connectivity solutions that enhance your travel experience:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.map((product, index) => (
              <Card key={index} className="bg-[#131a2a] border-gray-600 h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{product.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                  
                  <ul className="text-sm text-gray-300 space-y-1 mb-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    className="w-full bg-[#60A5FA] hover:bg-[#4B8FE3] text-white"
                  >
                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Visit {product.title}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AffiliateDisclosure compact />
    </div>
  );
};

export default SmartSystemsAffiliateRecommendations;