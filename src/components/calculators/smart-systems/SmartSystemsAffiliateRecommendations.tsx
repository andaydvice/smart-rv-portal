import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const SmartSystemsAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "TechnoRV",
      description: "Smart RV systems, surge protection, and monitoring technology that safeguards your investment and enhances your travel experience. Professional grade automation and convenience features.",
      link: "https://technorv.com",
      features: [
        "Smart RV systems",
        "Surge protection",
        "Monitoring technology",
        "Professional automation"
      ]
    },
    {
      title: "RV Life",
      description: "The most comprehensive RV trip planning and GPS navigation app built specifically for RVers. Plan routes, find campgrounds, and navigate safely with smart routing.",
      link: "https://rvlife.com",
      features: [
        "Trip planning app",
        "GPS navigation",
        "RV specific routes",
        "Smart campground finder"
      ]
    }
  ];

  const essentialServices = [
    {
      title: "RVShare",
      description: "Rent RVs with smart systems pre installed. Experience the latest RV technology and automation without the upfront investment.",
      link: "https://rvshare.com",
      features: [
        "Smart system equipped RVs",
        "Latest RV technology",
        "Automation features",
        "No upfront investment"
      ]
    },
    {
      title: "Outdoorsy",
      description: "Book tech enabled luxury RVs with premium smart features. Try cutting edge RV automation, monitoring, and convenience systems.",
      link: "https://outdoorsy.com",
      features: [
        "Tech enabled luxury RVs",
        "Premium smart features",
        "Cutting edge automation",
        "Monitoring systems"
      ]
    },
    {
      title: "Good Sam",
      description: "Get technical support for RV smart system installations and troubleshooting. Expert help when technology needs setup or repair.",
      link: "https://goodsam.com",
      features: [
        "Technical support",
        "Installation help",
        "Troubleshooting",
        "Expert assistance"
      ]
    },
    {
      title: "RV Water Filter Store",
      description: "Smart water filtration systems and monitoring technology for your RV. Protect your water systems with intelligent filtration and quality monitoring.",
      link: "https://rvwaterfilterstore.com",
      features: [
        "Smart water filtration",
        "Quality monitoring",
        "System protection",
        "Intelligent technology"
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
            Complete your RV experience with rental options, tech support, and professional services:
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

export default SmartSystemsAffiliateRecommendations;