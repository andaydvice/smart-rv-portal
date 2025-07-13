import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const PowerAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "Solar Direct",
      description: "Complete solar solutions designed specifically for RV living. From panels to installation guides, everything you need to power your off grid adventures.",
      link: "https://solardirect.com",
      features: [
        "Complete solar solutions",
        "RV specific designs",
        "Installation guides",
        "Off grid power systems"
      ]
    },
    {
      title: "A1 SolarStore",
      description: "Premium solar systems with expert support and comprehensive warranties. High quality components for reliable off grid power generation.",
      link: "https://a1solarstore.com",
      features: [
        "Premium solar systems",
        "Expert support",
        "Comprehensive warranties",
        "High quality components"
      ]
    },
    {
      title: "Renogy",
      description: "Industry leading solar panels and battery systems with comprehensive warranties and expert support. Trusted by RVers worldwide for reliable off grid power.",
      link: "https://renogy.com",
      features: [
        "Industry leading panels",
        "Battery systems",
        "Expert support",
        "Worldwide trust"
      ]
    },
    {
      title: "Dakota Lithium",
      description: "Lightweight, long lasting lithium batteries that outlast traditional batteries by 4x with comprehensive warranties. Professional grade power for serious RVers.",
      link: "https://dakotalithium.com",
      features: [
        "Lightweight lithium batteries",
        "4x longer lasting",
        "Comprehensive warranties",
        "Professional grade quality"
      ]
    },
    {
      title: "Butler Technik/Victron",
      description: "Professional grade power monitoring and management systems for complete energy control. Monitor every amp and maximize your system efficiency.",
      link: "https://butlertechnik.com",
      features: [
        "Power monitoring systems",
        "Complete energy control",
        "Amp monitoring",
        "System efficiency"
      ]
    }
  ];

  const essentialServices = [
    {
      title: "RVShare",
      description: "Rent RVs with solar systems already installed. Experience off grid living before investing in your own solar setup.",
      link: "https://rvshare.com",
      features: [
        "Solar equipped RV rentals",
        "Off grid experience",
        "Try before you buy",
        "Professional installations"
      ]
    },
    {
      title: "Outdoorsy",
      description: "Book luxury RVs with premium power systems. Experience high end solar and lithium battery combinations in fully equipped rigs.",
      link: "https://outdoorsy.com",
      features: [
        "Luxury RV rentals",
        "Premium power systems",
        "High end solar setups",
        "Lithium battery systems"
      ]
    },
    {
      title: "RV Life",
      description: "Plan your off grid adventures with detailed campground power availability data. Find the best boondocking spots and solar friendly locations.",
      link: "https://rvlife.com",
      features: [
        "Off grid trip planning",
        "Power availability data",
        "Boondocking locations",
        "Solar friendly spots"
      ]
    },
    {
      title: "Good Sam",
      description: "Get technical support and discounts on RV power installations. Expert guidance for solar, battery, and electrical system upgrades.",
      link: "https://goodsam.com",
      features: [
        "Technical support",
        "Installation discounts",
        "Expert guidance",
        "System upgrades"
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            ⚡ Recommended Power Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Power your RV adventures with these trusted solar and battery solutions designed specifically for RV living:
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

      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            🚐 Essential RV Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Complete your RV experience with rental options, trip planning, and support services:
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

export default PowerAffiliateRecommendations;