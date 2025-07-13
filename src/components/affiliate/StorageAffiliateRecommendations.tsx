import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const StorageAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "Good Sam",
      description: "Get expert advice on RV storage preparation, facility recommendations, and seasonal maintenance support for proper storage.",
      link: "https://goodsam.com",
      features: [
        "Storage preparation guidance",
        "Facility recommendations",
        "Seasonal maintenance support",
        "Storage insurance options"
      ]
    },
    {
      title: "RV Water Filter Store",
      description: "Essential winterization products and water system protection for safe long-term RV storage. Prevent freeze damage with quality products.",
      link: "https://rvwaterfilterstore.com",
      features: [
        "Winterization products",
        "Water system protection",
        "Freeze damage prevention",
        "Storage preparation kits"
      ]
    }
  ];

  const essentialServices = [
    {
      title: "RVShare",
      description: "Rent RVs when yours is in storage or test different models before committing to long-term storage solutions.",
      link: "https://rvshare.com",
      features: [
        "Rental options during storage",
        "Test different RV models",
        "Seasonal rental availability",
        "Storage alternative solutions"
      ]
    },
    {
      title: "Outdoorsy",
      description: "Premium RV rentals with storage pickup/delivery services. Some hosts offer storage solutions for fellow RV owners.",
      link: "https://outdoorsy.com",
      features: [
        "Premium RV rentals",
        "Storage pickup services",
        "Host storage solutions",
        "Flexible rental terms"
      ]
    },
    {
      title: "RV Life",
      description: "Find storage facilities, plan seasonal trips, and manage your RV lifestyle with comprehensive trip planning tools.",
      link: "https://rvlife.com",
      features: [
        "Storage facility finder",
        "Seasonal trip planning",
        "RV lifestyle management",
        "Comprehensive travel tools"
      ]
    },
    {
      title: "TechnoRV",
      description: "Smart monitoring systems for stored RVs including security cameras, battery monitors, and environmental sensors.",
      link: "https://technorv.com",
      features: [
        "RV security monitoring",
        "Battery system monitoring",
        "Environmental sensors",
        "Remote surveillance options"
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            🏠 Storage Preparation & Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Protect your RV investment with proper storage preparation and expert guidance:
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
            🚐 RV Services & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Complete your RV storage experience with these services and monitoring solutions:
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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

export default StorageAffiliateRecommendations;