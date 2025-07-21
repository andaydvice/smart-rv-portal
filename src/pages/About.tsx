import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { generateImagePlaceholder, deferOperation } from "@/utils/performance";

const About = () => {
  useEffect(() => {
    console.log("About page - Scrolling to top");
    scrollToTop();
    
    // Load Adilo script and initialize
    const loadAdiloScript = () => {
      // Remove existing script if any
      const existingScript = document.querySelector('script[src="https://cdn.bigcommand.com/dynamic-embed/js/inline.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.bigcommand.com/dynamic-embed/js/inline.js';
      script.async = true;
      
      script.onload = () => {
        console.log("Adilo script loaded successfully");
        // Give the script a moment to initialize
        setTimeout(() => {
          // Try to trigger any initialization function that might exist
          if ((window as any).AdiloPlayer) {
            (window as any).AdiloPlayer.init();
          }
        }, 1000);
      };
      
      script.onerror = () => {
        console.error("Failed to load Adilo script");
      };
      
      document.head.appendChild(script);
    };
    
    loadAdiloScript();
    
    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.bigcommand.com/dynamic-embed/js/inline.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleVideoLoad = () => {
    console.log("✅ Adilo video iframe loaded successfully");
  };

  const handleVideoError = () => {
    console.error("❌ Adilo video iframe failed to load");
  };

  return (
    <Layout>
      {/* Hero Video Section */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden -mt-16">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative w-full h-full z-0">
          {/* Adilo JavaScript Video Embed */}
          <div 
            className="motion_popover w-full h-full relative"
            data-id="osMojtq7" 
            data-play-type="" 
            style={{ width: '100%', height: '100%', paddingTop: '56.25%', position: 'relative' }} 
            data-type="thumbnail"
          ></div>
          {/* Fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#080F1F] to-[#151A22] -z-10"></div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-6">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl"
            >
              About Smart RV
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 drop-shadow-lg"
            >
              The Future of Intelligent Travel
            </motion.p>
          </div>
        </div>
      </div>

      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full bg-gradient-to-b from-[#080F1F] to-[#151A22]"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
              <h2 className="text-3xl font-bold text-white mb-6 text-left">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed text-left mb-4">
                Smart RV is revolutionizing the recreational vehicle industry by integrating cutting edge technology with traditional RV experiences.
              </p>
              <p className="text-white/90 text-lg leading-relaxed text-left">
                We believe that the future of travel lies in intelligent, connected vehicles that enhance safety, comfort, and convenience for every journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
                <h3 className="text-2xl font-bold text-white mb-4 text-left">Innovation First</h3>
                <p className="text-white/90 leading-relaxed text-left mb-4">
                  Our team of engineers and designers work tirelessly to create smart systems that anticipate your needs and adapt to your lifestyle.
                </p>
                <p className="text-white/90 leading-relaxed text-left">
                  From automated climate control to intelligent power management, every feature is designed with the modern traveler in mind.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
                <h3 className="text-2xl font-bold text-white mb-4 text-left">Sustainability Focus</h3>
                <p className="text-white/90 leading-relaxed text-left mb-4">
                  We are committed to creating environmentally responsible RV solutions.
                </p>
                <p className="text-white/90 leading-relaxed text-left">
                  Our solar integration systems, energy efficient appliances, and waste reduction technologies help minimize your environmental footprint while maximizing your adventure potential.
                </p>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose Smart RV</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5B9BD5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">📚</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Expert Education</h4>
                  <p className="text-white/80">Comprehensive guides and tutorials from RV industry professionals</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5B9BD5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Trusted Reviews</h4>
                  <p className="text-white/80">Honest, unbiased reviews and comparisons of RV products and services</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5B9BD5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">🎯</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Practical Advice</h4>
                  <p className="text-white/80">Real world tips and solutions for common RV challenges and maintenance</p>
                </div>
              </div>
            </div>

            <OptimizedAffiliateGrid
              title="Our Trusted Partners"
              subtitle="We partner with industry-leading companies to provide you with the best RV products and services."
              partners={[
                {
                  partner: 'rvshare',
                  title: 'Premium RV Rentals',
                  description: 'Nationwide RV rentals with instant booking and comprehensive insurance coverage',
                  features: ['Instant booking', 'Insurance included', 'Nationwide coverage', '24/7 support']
                },
                {
                  partner: 'technorv',
                  title: 'Smart RV Technology',
                  description: 'Advanced monitoring systems and smart technology for modern RV living',
                  features: ['Professional installation', 'Smart monitoring', 'Remote control', 'Expert support']
                },
                {
                  partner: 'goodsam',
                  title: 'Roadside Assistance',
                  description: 'Comprehensive RV services and emergency roadside assistance nationwide',
                  features: ['24/7 roadside help', 'Emergency services', 'Nationwide coverage', 'Peace of mind']
                },
                {
                  partner: 'rvwaterfilter',
                  title: 'Water Filtration Systems',
                  description: 'Premium water filtration with clean water guarantee for safe travel',
                  features: ['Clean water guarantee', 'Easy installation', 'NSF certified', 'Health protection']
                },
                {
                  partner: 'outdoorsy',
                  title: 'Luxury RV Experiences',
                  description: 'Premium RV rentals and concierge services for exceptional adventures',
                  features: ['Luxury fleet', 'Concierge service', 'Premium experience', 'Quality guaranteed']
                },
                {
                  partner: 'rvlife',
                  title: 'Trip Planning Tools',
                  description: 'GPS navigation and trip planning tools designed specifically for RVs',
                  features: ['RV-safe routes', 'Trip planning', 'GPS navigation', 'Campground finder']
                }
              ]}
              gridCols="3"
            />

            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Smart RV Journey?</h2>
              <p className="text-white/90 text-lg mb-6">
                Discover how our intelligent RV solutions can transform your travel experience.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-[#5B9BD5] text-white hover:bg-[#4A8AC4] px-8 py-3 rounded-full text-lg font-medium transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default About;
