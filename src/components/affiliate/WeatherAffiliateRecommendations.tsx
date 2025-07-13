import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

const WeatherAffiliateRecommendations = () => {
  const recommendations = [
    {
      title: "RV Life",
      description: "Get comprehensive weather data, route planning with weather consideration, and real-time conditions for safe RV travel planning.",
      link: "https://rvlife.com",
      features: [
        "Weather-aware route planning",
        "Real-time conditions",
        "Storm tracking alerts",
        "Safe travel recommendations"
      ]
    },
    {
      title: "Good Sam",
      description: "Emergency roadside assistance when weather creates travel problems. 24/7 support for weather-related breakdowns and emergencies.",
      link: "https://goodsam.com",
      features: [
        "24/7 emergency assistance",
        "Weather-related breakdowns",
        "Storm damage support",
        "Safe haven recommendations"
      ]
    }
  ];

  const essentialServices = [
    {
      title: "RVShare",
      description: "Rent weather-appropriate RVs for your trip. Choose models equipped for your destination's weather conditions.",
      link: "https://rvshare.com",
      features: [
        "Weather-appropriate RVs",
        "Climate-specific features",
        "Seasonal availability",
        "Local weather expertise"
      ]
    },
    {
      title: "Outdoorsy",
      description: "Book premium RVs with advanced weather monitoring systems and climate control for comfortable travel in any conditions.",
      link: "https://outdoorsy.com",
      features: [
        "Advanced climate control",
        "Weather monitoring systems",
        "Premium comfort features",
        "All-season capabilities"
      ]
    },
    {
      title: "TechnoRV",
      description: "Smart weather monitoring systems and sensors that provide real-time environmental data for your RV and surroundings.",
      link: "https://technorv.com",
      features: [
        "Weather monitoring systems",
        "Environmental sensors",
        "Real-time data tracking",
        "Alert notifications"
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="bg-[#091020] border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-[#60A5FA] flex items-center gap-2">
            🌤️ Weather Planning & Safety Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Stay safe on the road with these essential weather planning and emergency response services:
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
            🚐 Weather-Ready RV Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Complete your weather-safe RV experience with these services and technology solutions:
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

export default WeatherAffiliateRecommendations;