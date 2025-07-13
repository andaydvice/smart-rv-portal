import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const TowingAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "Blue Ox",
      description: "Professional towing equipment trusted by RV manufacturers worldwide. Ensure safe, worry free travels with industry leading hitch systems and accessories.",
      link: "https://blueox.com",
      features: [
        "Professional towing equipment",
        "RV manufacturer trusted",
        "Industry leading hitches",
        "Safety accessories"
      ]
    },
    {
      title: "TechnoRV TPMS",
      description: "Advanced tire pressure monitoring systems that prevent blowouts and extend tire life. Real time monitoring gives you peace of mind on every journey.",
      link: "https://technorv.com",
      features: [
        "Tire pressure monitoring",
        "Blowout prevention",
        "Extended tire life",
        "Real time monitoring"
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            🚛 Recommended Towing Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Ensure safe and confident towing with these professional grade equipment solutions trusted by RV manufacturers:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

export default TowingAffiliateRecommendations;