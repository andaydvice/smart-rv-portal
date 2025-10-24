import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Navigation, Shield, Wifi } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Footer2 from "@/components/ui/Footer2";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import { Helmet } from "react-helmet-async";

// Model data
const models = [
  {
    name: "Luxury Class",
    image: "/lovable-uploads/Luxury_RV_Living-minx800.jpg",
    price: "Starting From 1.3M",
    description: "Experience unparalleled luxury with our flagship model, featuring advanced automation and premium finishes.",
    features: [
      { icon: Navigation, text: "Advanced Navigation System", color: "text-blue-400" },
      { icon: Shield, text: "Premium Security Suite", color: "text-emerald-400" },
      { icon: Battery, text: "Extended Range Power System", color: "text-yellow-400" },
      { icon: Wifi, text: "High-Speed Internet", color: "text-purple-400" },
    ],
    learnMoreLink: "/models/luxury"
  },
  {
    name: "Adventure Class",
    image: "/lovable-uploads/2935caf5-f345-40a6-8676-0f20817c6d6e.png",
    price: "Starting From $50,000",
    description: "Built for the modern explorer, combining durability with smart technology for off-grid adventures.",
    features: [
      { icon: Battery, text: "Solar Power Integration", color: "text-yellow-400" },
      { icon: Shield, text: "All-Terrain Monitoring", color: "text-emerald-400" },
      { icon: Navigation, text: "Off-Road Navigation", color: "text-blue-400" },
      { icon: Wifi, text: "Satellite Connectivity", color: "text-purple-400" },
    ],
    learnMoreLink: "/models/adventure"
  },
  {
    name: "Compact Smart",
    image: "/lovable-uploads/e6619d24-bebf-439f-96b0-6aca2fb69380.png",
    price: "Starting From $20,000",
    description: "Perfect for weekend getaways, packed with smart features in an efficient, easy-to-maneuver package.",
    features: [
      { icon: Navigation, text: "City-Optimized Navigation", color: "text-blue-400" },
      { icon: Battery, text: "Efficient Power Management", color: "text-yellow-400" },
      { icon: Shield, text: "Smart Security System", color: "text-emerald-400" },
      { icon: Wifi, text: "4G/5G Connectivity", color: "text-purple-400" },
    ],
    learnMoreLink: "/models/compact"
  }
];

const Models = () => {

  // Define the footer links and socials for this page
  const footerLinks = [
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
  ];

  const footerSocials = [
    { icon: "facebook", href: "https://facebook.com" },
    { icon: "twitter", href: "https://twitter.com" },
    { icon: "instagram", href: "https://instagram.com" },
    { icon: "youtube", href: "https://youtube.com" }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Browse & Compare Smart RV Models | Find Your Perfect RV</title>
        <meta name="description" content="Browse and compare luxury, adventure, and compact smart RV models. Find your perfect RV with advanced technology, premium features, and competitive pricing from $20,000 to $1.3M." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/models' : ''} />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-left mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Our Models</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Discover our range of luxury smart RVs, each designed to provide the ultimate blend of comfort and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 group hover:border-blue-500/50 transition-all duration-300 text-left"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error(`[Models] Image failed to load:`, model.image);
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{model.name}</h2>
                  <p className="text-blue-400 font-medium mb-4">{model.price}</p>
                  <p className="text-gray-300 mb-6">{model.description}</p>
                  <div className="space-y-3 mb-6">
                    {model.features.map((feature) => (
                      <div key={feature.text} className="flex items-center gap-2">
                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        <span className="text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={model.learnMoreLink}>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-left mt-16"
          >
            <Link to="/models/compare">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-blue-500/50 hover:text-white min-h-[44px] touch-manipulation"
              >
                Compare All Models <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
          
          {/* RV Model Partners and Services */}
          
          {/* RV Model Partners and Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-20"
          >
            <OptimizedAffiliateGrid
              title="Find Your Perfect RV Experience"
              subtitle="Explore different models through rentals, get expert advice, and find the right technology upgrades for any RV type."
              partners={[
                {
                  name: 'RVShare',
                  url: 'https://rvshare.com',
                  title: 'Try Different RV Models',
                  description: 'Rent and test various RV models before making your purchase decision. Perfect for comparing features.',
                  features: ['Multiple Model Types', 'Test Drive Experience', 'Owner Insights', 'Insurance Included'],
                  buttonText: 'Browse RV Models'
                },
                {
                  name: 'Outdoorsy',
                  url: 'https://outdoorsy.com',
                  title: 'Luxury RV Experiences',
                  description: 'Experience premium and luxury RV models with high-end amenities and concierge service.',
                  features: ['Luxury Models', 'Premium Service', 'Unique Locations', 'White Glove Treatment'],
                  buttonText: 'Book Luxury Experience'
                },
                {
                  name: 'RV Life',
                  url: 'https://rvlife.com',
                  title: 'RV Technology Upgrades',
                  description: 'Upgrade any RV model with smart technology, monitoring systems, and automation features.',
                  features: ['Model-Specific Upgrades', 'Professional Installation', 'Smart Monitoring', 'Compatibility Guaranteed'],
                  buttonText: 'Shop Model Upgrades'
                },
                {
                  name: 'Good Sam',
                  url: 'https://goodsam.com',
                  title: 'RV Model Support & Services',
                  description: 'Get expert advice, maintenance support, and protection plans for any RV model or type.',
                  features: ['Model-Specific Advice', 'Maintenance Plans', 'Protection Coverage', 'Expert Support'],
                  buttonText: 'Get Model Support'
                },
                {
                  name: 'RV Trip Wizard',
                  url: 'https://rvtripwizard.com',
                  title: 'Model-Specific Trip Planning',
                  description: 'Plan trips optimized for your specific RV model with route planning and campground compatibility.',
                  features: ['Model-Based Routes', 'Size Restrictions', 'Compatibility Checks', 'Expert Reviews'],
                  buttonText: 'Plan Model-Safe Routes'
                },
                {
                  name: 'RV Water Filter Store',
                  url: 'https://rvwaterfilterstore.com',
                  title: 'Model-Specific Water Systems',
                  description: 'Get the right water filtration system designed specifically for your RV model and setup.',
                  features: ['Model Compatibility', 'Custom Installation', 'Perfect Fit Guarantee', 'Expert Consultation'],
                  buttonText: 'Find Model Systems'
                }
              ]}
              gridCols="3"
            />
          </motion.div>
        </div>
        
        {/* Affiliate Disclosure */}
        <div className="px-4">
          <AffiliateDisclosure className="max-w-7xl mx-auto my-8" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Models;
