
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";

const About = () => {
  useEffect(() => {
    console.log("About page - Scrolling to top");
    scrollToTop();
  }, []);

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
            About Smart RV
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-12"
          >
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
              <h2 className="text-3xl font-bold text-white mb-6 text-left">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed text-left">
                Smart RV is revolutionizing the recreational vehicle industry by integrating cutting edge technology with traditional RV experiences.
              </p>
              <p className="text-white/90 text-lg leading-relaxed text-left">
                We believe that the future of travel lies in intelligent, connected vehicles that enhance safety, comfort, and convenience for every journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
                <h3 className="text-2xl font-bold text-white mb-4 text-left">Innovation First</h3>
                <p className="text-white/90 leading-relaxed text-left">
                  Our team of engineers and designers work tirelessly to create smart systems that anticipate your needs and adapt to your lifestyle.
                </p>
                <p className="text-white/90 leading-relaxed text-left">
                  From automated climate control to intelligent power management, every feature is designed with the modern traveler in mind.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
                <h3 className="text-2xl font-bold text-white mb-4 text-left">Sustainability Focus</h3>
                <p className="text-white/90 leading-relaxed text-left">
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
                    <span className="text-white font-bold text-2xl">AI</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Smart Technology</h4>
                  <p className="text-white/80">Advanced AI systems that learn and adapt to your preferences</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5B9BD5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">24/7</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Expert Support</h4>
                  <p className="text-white/80">Round the clock technical support and maintenance guidance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5B9BD5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">∞</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Endless Adventure</h4>
                  <p className="text-white/80">Technology that enables unlimited exploration and discovery</p>
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
