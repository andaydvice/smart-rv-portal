
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer2 from "@/components/ui/Footer2";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Car, Cpu, Battery, ShieldCheck, Wifi, Ruler, AreaChart, Zap } from "lucide-react";

// Model comparison data
const models = [
  {
    name: "Luxury Class",
    image: "/lovable-uploads/Luxury_RV_Living-min.jpg",
    price: "$1,300,000+",
    description: "Our flagship model with unparalleled luxury features and premium finishes for discerning travelers.",
    specs: {
      length: "45 ft",
      height: "13.5 ft",
      weight: "54,000 lbs",
      sleeps: "6-8",
      powerSystem: "800Ah Lithium + 3kW Solar",
      connectivity: "Starlink + 5G",
      automation: "Full Smart Home Integration",
      security: "Advanced 360° Monitoring"
    },
    features: [
      { name: "Automated Driving Assistant", icon: Car, included: true },
      { name: "Neural Voice Control", icon: Cpu, included: true },
      { name: "Extended Range Power", icon: Battery, included: true },
      { name: "Advanced Security", icon: ShieldCheck, included: true },
      { name: "High-Speed Connectivity", icon: Wifi, included: true },
      { name: "Premium Space Design", icon: Ruler, included: true },
      { name: "Adaptive Climate System", icon: AreaChart, included: true },
      { name: "Solar Integration", icon: Zap, included: true },
    ]
  },
  {
    name: "Adventure Class",
    image: "/lovable-uploads/2935caf5-f345-40a6-8676-0f20817c6d6e.png",
    price: "$550,000+",
    description: "Designed for explorers who want to venture off the beaten path without sacrificing technology.",
    specs: {
      length: "32 ft",
      height: "12 ft",
      weight: "28,000 lbs",
      sleeps: "4-6",
      powerSystem: "600Ah Lithium + 2kW Solar",
      connectivity: "4G/5G + Local Mesh",
      automation: "Core Smart Systems",
      security: "Perimeter + Internal Monitoring"
    },
    features: [
      { name: "Automated Driving Assistant", icon: Car, included: true },
      { name: "Neural Voice Control", icon: Cpu, included: true },
      { name: "Extended Range Power", icon: Battery, included: true },
      { name: "Advanced Security", icon: ShieldCheck, included: true },
      { name: "High-Speed Connectivity", icon: Wifi, included: true },
      { name: "Premium Space Design", icon: Ruler, included: false },
      { name: "Adaptive Climate System", icon: AreaChart, included: true },
      { name: "Solar Integration", icon: Zap, included: true },
    ]
  },
  {
    name: "Compact Smart",
    image: "/lovable-uploads/e6619d24-bebf-439f-96b0-6aca2fb69380.png",
    price: "$220,000+",
    description: "Perfect for weekend getaways with smart technology in an efficient, easy-to-maneuver package.",
    specs: {
      length: "24 ft",
      height: "10.5 ft",
      weight: "12,000 lbs",
      sleeps: "2-4",
      powerSystem: "300Ah Lithium + 1kW Solar",
      connectivity: "4G/5G",
      automation: "Basic Smart Controls",
      security: "Entry + Motion Detection"
    },
    features: [
      { name: "Automated Driving Assistant", icon: Car, included: false },
      { name: "Neural Voice Control", icon: Cpu, included: false },
      { name: "Extended Range Power", icon: Battery, included: false },
      { name: "Advanced Security", icon: ShieldCheck, included: false },
      { name: "High-Speed Connectivity", icon: Wifi, included: true },
      { name: "Premium Space Design", icon: Ruler, included: false },
      { name: "Adaptive Climate System", icon: AreaChart, included: false },
      { name: "Solar Integration", icon: Zap, included: true },
    ]
  }
];

const CompareModels = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("[CompareModels] Component mounted");
    console.log("[CompareModels] Current location:", location.pathname);
    // Ensure the page scrolls to top when mounted
    window.scrollTo(0, 0);
  }, [location]);

  console.log("[CompareModels] Rendering component, current path:", location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#080F1F] text-white">
      <Navbar />
      
      {/* Hero header image */}
      <div className="relative w-full h-96">
        <img 
          src="/lovable-uploads/Luxury-Class-RVs-min.jpg" 
          alt="RV models comparison" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-6">Compare Models</h1>
          <p className="text-xl max-w-3xl text-center px-4">
            Find the perfect smart RV that matches your lifestyle. Compare features and 
            specifications across our range of models.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {models.map((model) => (
            <div key={model.name} className="bg-[#131a2a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#5B9BD5] transition-all duration-300">
              <div className="h-48 relative">
                <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131a2a] to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-[#5B9BD5] font-semibold mb-4">{model.price}</p>
                <p className="text-gray-300 mb-6">{model.description}</p>
                <Link to={`/models/${model.name.toLowerCase().replace(/\s+/g, '-')}`} className="block text-center py-2 px-4 bg-[#5B9BD5] hover:bg-[#4B8FE3] rounded-lg transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Specifications comparison */}
        <h2 className="text-3xl font-bold mb-8 text-center">Technical Specifications</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-16">
            <thead>
              <tr className="bg-[#1E2A3E] text-left">
                <th className="p-4 border-b border-gray-700">Specification</th>
                {models.map(model => (
                  <th key={model.name} className="p-4 border-b border-gray-700">{model.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(models[0].specs).map((specKey) => (
                <tr key={specKey} className="border-b border-gray-800 hover:bg-[#1E2A3E]/50">
                  <td className="p-4 font-medium capitalize">{specKey.replace(/([A-Z])/g, ' $1').trim()}</td>
                  {models.map(model => (
                    <td key={`${model.name}-${specKey}`} className="p-4">
                      {model.specs[specKey as keyof typeof model.specs]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Features comparison */}
        <h2 className="text-3xl font-bold mb-8 text-center">Features Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-16">
            <thead>
              <tr className="bg-[#1E2A3E] text-left">
                <th className="p-4 border-b border-gray-700">Feature</th>
                {models.map(model => (
                  <th key={model.name} className="p-4 border-b border-gray-700">{model.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models[0].features.map((feature, index) => (
                <tr key={feature.name} className="border-b border-gray-800 hover:bg-[#1E2A3E]/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <feature.icon className="w-5 h-5 text-[#5B9BD5]" />
                      <span>{feature.name}</span>
                    </div>
                  </td>
                  {models.map(model => (
                    <td key={`${model.name}-${feature.name}`} className="p-4 text-center">
                      {model.features[index].included ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500/20 text-green-500 rounded-full">✓</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500/20 text-red-500 rounded-full">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to action */}
        <div className="text-center py-10 px-4 bg-[#1E2A3E] rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Smart RV Living?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to see our smart RV technology in action and find the perfect model for your needs.
          </p>
          <Link to="/schedule-demo" className="inline-block py-3 px-8 bg-[#5B9BD5] hover:bg-[#4B8FE3] rounded-lg text-lg font-medium transition-colors">
            Schedule a Demo
          </Link>
        </div>
      </div>

      <Footer2 
        links={[
          {
            title: "Quick Links",
            links: [
              { text: "Features", href: "/features" },
              { text: "Technology", href: "/technology" },
              { text: "Contact", href: "/contact" }
            ]
          },
          {
            title: "Model Types",
            links: [
              { text: "Luxury Class", href: "/models/luxury" },
              { text: "Adventure Class", href: "/models/adventure" },
              { text: "Compact Smart", href: "/models/compact" },
              { text: "Compare Models", href: "/models/compare" }
            ]
          }
        ]}
        socials={[
          { icon: "facebook", href: "https://facebook.com" },
          { icon: "twitter", href: "https://twitter.com" },
          { icon: "instagram", href: "https://instagram.com" },
          { icon: "youtube", href: "https://youtube.com" }
        ]}
        description="Compare our premium Smart RV lineup to find the perfect model for your lifestyle"
      />
    </div>
  );
};

// Make sure we're exporting this component as default
export default CompareModels;
