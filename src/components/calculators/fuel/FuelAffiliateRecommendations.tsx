import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const FuelAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "RV Life",
      description: "Plan fuel efficient routes, find the best fuel prices along your journey, and discover RV friendly stops nationwide. The most comprehensive trip planning app built specifically for RVers.",
      link: "https://rvlife.com",
      features: [
        "Smart route planning",
        "Best fuel prices nationwide",
        "RV friendly stops",
        "Fuel efficient routing"
      ]
    },
    {
      title: "Good Sam",
      description: "Save on fuel costs with Good Sam membership fuel discounts at thousands of gas stations nationwide. Plus get emergency roadside assistance when you need it most.",
      link: "https://goodsam.com",
      features: [
        "Fuel discounts nationwide",
        "Emergency roadside assistance",
        "Member savings program",
        "24/7 support availability"
      ]
    }
  ];

  const essentialServices = [
    {
      title: "RVShare",
      description: "Rent fuel efficient RVs for your next adventure. Compare hundreds of well maintained RVs with detailed fuel consumption data nationwide.",
      link: "https://rvshare.com",
      features: [
        "Fuel efficient RV rentals",
        "Detailed consumption data",
        "Nationwide availability",
        "Well maintained fleet"
      ]
    },
    {
      title: "Outdoorsy",
      description: "Book premium RVs with superior fuel efficiency. Choose from luxury models that maximize every mile and minimize fuel costs.",
      link: "https://outdoorsy.com",
      features: [
        "Premium RV rentals",
        "Superior fuel efficiency",
        "Luxury models",
        "Cost effective travel"
      ]
    },
    {
      title: "TechnoRV",
      description: "Smart monitoring systems that help optimize fuel consumption and engine performance. Professional grade RV technology for better fuel efficiency.",
      link: "https://technorv.com",
      features: [
        "Smart monitoring systems",
        "Fuel consumption optimization",
        "Engine performance tracking",
        "Professional RV technology"
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            ⛽ Recommended Fuel Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Maximize your fuel efficiency and plan better routes with these trusted RV fuel solutions:
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

      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            🚐 Essential RV Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Complete your RV experience with rental options, roadside assistance, and support services:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {essentialServices.map((service, index) => (
              <Card key={index} className="bg-[#131a2a] border-gray-600 h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                  
                  <ul className="text-sm text-gray-300 space-y-1 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    className="w-full bg-[#60A5FA] hover:bg-[#4B8FE3] text-white"
                  >
                    <a 
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Visit {service.title}
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

export default FuelAffiliateRecommendations;