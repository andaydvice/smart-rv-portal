
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";

const Products = () => {
  useEffect(() => {
    console.log("Products page - Scrolling to top");
    scrollToTop();
  }, []);

  const productCategories = [
    {
      title: "Smart RV Models",
      description: "Explore our complete lineup of intelligent recreational vehicles designed for the modern traveler.",
      image: "/lovable-uploads/11a2f8d8-22f5-4ed7-83f9-28b08a64aeb5.png",
      link: "/models",
      features: ["AI-Powered Systems", "Solar Integration", "Advanced Safety"]
    },
    {
      title: "RV Technology Solutions",
      description: "Cutting edge technology packages that can be integrated into existing RVs or new builds.",
      image: "/lovable-uploads/c25a3800-323e-4e21-9402-72b27002e767.png", 
      link: "/technology",
      features: ["Smart Controls", "Energy Management", "Connectivity Solutions"]
    },
    {
      title: "Storage Solutions",
      description: "Premium indoor RV storage facilities with advanced security and climate control systems.",
      image: "/lovable-uploads/598a2cb5-ffcb-440a-9943-6c4440749b9f.png",
      link: "/storage-facilities", 
      features: ["Climate Controlled", "24/7 Security", "Easy Access"]
    }
  ];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-[#080F1F] to-[#151A22]"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-bold text-white mb-8 text-center"
          >
            Smart RV Products
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto"
          >
            Discover our comprehensive range of smart RV solutions designed to enhance every aspect of your mobile lifestyle experience.
          </motion.p>

          <div className="space-y-16">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-4">{category.title}</h2>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3">Key Features:</h3>
                      <ul className="space-y-2">
                        {category.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-white/80">
                            <div className="w-2 h-2 bg-[#5B9BD5] rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      to={category.link}
                      className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-8 py-3 rounded-full font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Affiliate Product Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 space-y-8"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Shop Smart RV Products</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* RVShare Rentals */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">RV Rentals</h3>
                <p className="text-white/80 mb-4">Compare and book premium RV rentals nationwide. Perfect for trying before buying.</p>
                <div className="text-[#5B9BD5] font-semibold mb-4">Nationwide Network • Insurance Included</div>
                <a 
                  href="https://rvshare.com/?ref=smartroadportal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Browse RV Rentals
                </a>
              </div>

              {/* TechnoRV Products */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Smart RV Tech</h3>
                <p className="text-white/80 mb-4">Upgrade your RV with cutting-edge smart technology and monitoring systems.</p>
                <div className="text-[#5B9BD5] font-semibold mb-4">Professional Installation • Warranty Included</div>
                <a 
                  href="https://technorv.com/?ref=smartroadportal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Shop TechnoRV
                </a>
              </div>

              {/* Good Sam Services */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">RV Services</h3>
                <p className="text-white/80 mb-4">Essential roadside assistance, insurance, and maintenance services for RV owners.</p>
                <div className="text-[#5B9BD5] font-semibold mb-4">Good Sam Partner</div>
                <a 
                  href="https://www.goodsam.com/?ref=smartroadportal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Get Good Sam
                </a>
              </div>

              {/* RV Water Filter Store */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Water Systems</h3>
                <p className="text-white/80 mb-4">Premium water filtration and purification systems for safe, clean water on the road.</p>
                <div className="text-[#5B9BD5] font-semibold mb-4">Clean Water Guarantee • Easy Installation</div>
                <a 
                  href="https://rvwaterfilterstore.com/?ref=smartroadportal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Shop Water Filters
                </a>
              </div>

              {/* Outdoorsy Luxury */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Luxury Rentals</h3>
                <p className="text-white/80 mb-4">Book unique outdoor experiences and luxury RV rentals for premium adventures.</p>
                <div className="text-[#5B9BD5] font-semibold mb-4">Luxury Selection • Premium Service</div>
                <a 
                  href="https://outdoorsy.com/?ref=smartroadportal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Browse Outdoorsy
                </a>
              </div>

              {/* RV Life Tools */}
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Trip Planning</h3>
                <p className="text-white/80 mb-4">Professional RV trip planning tools, GPS navigation, and campground guides.</p>
                <div className="text-[#5B9BD5] font-semibold mb-4">RV-Safe Routes • Expert Reviews</div>
                <a 
                  href="https://rvlife.com/?ref=smartroadportal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Get RV Life
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-20 bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Need Custom Solutions?</h2>
            <p className="text-white/90 text-lg mb-6">
              Our engineering team can develop custom smart RV solutions tailored to your specific needs and requirements.
            </p>
            <Link 
              to="/contact"
              className="inline-block bg-[#00ffff] text-black hover:bg-[#00ffff]/80 px-8 py-3 rounded-full font-medium transition-colors"
            >
              Contact Our Experts
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Products;
