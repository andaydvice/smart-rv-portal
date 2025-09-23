
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { scrollToTop } from "@/utils/scrollToTop";
import TechnologyFAQ from "@/components/technology/TechnologyFAQ";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";

// Simple version of Technology page without any complex components
const Technology = () => {
  // Basic scroll to top effect
  useEffect(() => {
    scrollToTop();
  }, []);

  // Technology cards data
  const technologies = [
    {
      title: "AI Integration",
      description: "Advanced artificial intelligence systems for smart automation and personalized experiences",
      color: "text-cyan-400",
    },
    {
      title: "Connected Systems",
      description: "Seamless integration of all RV components through our proprietary network",
      color: "text-blue-400",
    },
    {
      title: "Smart Power",
      description: "Intelligent power management with solar integration and battery optimization",
      color: "text-green-400",
    },
    {
      title: "Security Suite",
      description: "State of the art security systems with biometric access and 24/7 monitoring",
      color: "text-purple-400",
    },
    {
      title: "Mobile Control",
      description: "Complete control of your RV through our intuitive mobile application",
      color: "text-pink-400",
    },
    {
      title: "Automation",
      description: "Smart automation for climate, lighting, and entertainment systems",
      color: "text-orange-400",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Smart RV Technology | Systems, Power, Connectivity</title>
        <meta name="description" content="Explore Smart RV Hub systems, power management, connectivity, and automation partners to upgrade your travel experience." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/technology' : ''} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'RV Life - Smart Technology', url: 'https://rvlife.com' },
              { '@type': 'ListItem', position: 2, name: 'Good Sam - Tech Support', url: 'https://goodsam.com' },
              { '@type': 'ListItem', position: 3, name: 'RV Life - Smart Planning', url: 'https://rvlife.com' }
            ]
          })}
        </script>
      </Helmet>
      <div className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Header section */}
        <div className="w-full py-10">
          <div className="w-full overflow-hidden mb-12 flex justify-center">
            <img
              src="/lovable-uploads/9ad50274-5f5b-47fa-8278-32599d734b3e.png"
              alt="Technology Main Header"
              className="w-full max-w-[1600px]"
              width="1600"
              height="600"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Intro text */}
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the cutting edge technologies that power the Smart RVs
            </p>
          </div>

          {/* Technology cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {technologies.map((tech, index) => (
              <div
                key={tech.title}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className={`text-xl font-bold ${tech.color} mb-2`}>{tech.title}</h3>
                <p className="text-gray-300">{tech.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ component */}
          <div className="mb-16">
            <TechnologyFAQ />
          </div>

          {/* CTA section */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <img
              src="/lovable-uploads/db5f9104-32a0-458f-a2ca-5ecb38415ec9.png"
              alt="Technology Overview"
              className="w-full h-96 object-cover"
              width="1200"
              height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Experience the Future Today</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl drop-shadow-md">
                  Our smart RVs combine cutting edge technology with luxurious comfort to create
                  the ultimate travel experience
                </p>
                <Link to="/products">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Explore Top Deals <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Technology Partners and Solutions */}
          <div className="mb-16">
            <OptimizedAffiliateGrid
              title="Smart RV Technology Partners"
              subtitle="Get the latest RV technology, professional installation, and expert support to upgrade your travel experience."
              partners={[
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'Smart RV Technology',
                  description: 'Advanced monitoring systems, automation solutions, and connectivity upgrades for modern RVs.',
                  features: ['Smart Monitoring Systems', 'Professional Installation', 'Expert Support', '2-Year Warranty'],
                  buttonText: 'Shop RV Life'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'Technology Support Services',
                  description: 'Professional installation, technical support, and warranty coverage for all your RV tech upgrades.',
                  features: ['Expert Installation', '24/7 Tech Support', 'Warranty Coverage', 'Training Included'],
                  buttonText: 'Get Professional Support'
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'Smart Travel Planning',
                  description: 'Advanced trip planning technology with GPS navigation, campground data, and real-time updates.',
                  features: ['Smart Navigation', 'Real-Time Updates', 'Offline Maps', 'Community Reviews'],
                  buttonText: 'Get Smart Planning Tools'
                }
              ]}
              gridCols="3"
            />
            <div className="px-4">
              <AffiliateDisclosure className="max-w-7xl mx-auto my-8" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Technology;
