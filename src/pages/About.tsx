
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import AffiliateDisclosure from "@/components/affiliate/AffiliateDisclosure";
import SEO from "@/components/seo/SEO";
import { organizationSchema, faqSchema, breadcrumbSchema, serviceSchema } from "@/components/seo/schemas";

const About = () => {
  useEffect(() => {
    
    scrollToTop();
  }, []);

  return (
    <Layout>
      <SEO
        title="About Smart RV Technology Hub | Leading RV Tech Resource"
        description="Discover Smart RV Technology Hub's mission to empower modern travelers with expert RV technology guidance, comprehensive reviews, and innovative tools for connected living on the road."
        keywords="about smart RV, RV technology experts, digital nomad resources, RV tech reviews, connected travel solutions"
        ogImage="/og-image.svg"
        ogImageAlt="Smart RV Technology Hub team and mission"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: 'About', url: typeof window !== 'undefined' ? `${window.location.origin}/about` : '' }
          ]),
          faqSchema([
            {
              question: "What is Smart RV Technology Hub?",
              answer: "Smart RV Technology Hub is the leading resource for RV technology, providing expert reviews, guides, and tools for modern travelers and digital nomads."
            },
            {
              question: "Who can benefit from Smart RV Technology Hub?",
              answer: "Our content serves tech-savvy travelers, digital nomads, RV enthusiasts, and anyone interested in connected mobile living solutions."
            },
            {
              question: "What types of products do you review?",
              answer: "We review smart RV technology including connectivity solutions, solar power systems, security devices, navigation tools, and automation systems."
            }
          ]),
          serviceSchema({
            name: "Smart RV Expert Reviews",
            description: "Comprehensive reviews and testing of RV technology products and services",
            provider: "Smart RV Technology Hub",
            serviceType: "Product Review & Testing"
          }),
          serviceSchema({
            name: "RV Technology Education",
            description: "Educational content and guides for smart RV technology implementation",
            provider: "Smart RV Technology Hub",
            serviceType: "Educational Services"
          })
        ]}
      />
      {/* Hero Video Section - Simplified Structure */}
      <div className="relative w-full h-[70vh] min-h-[500px] bg-gradient-to-br from-[#080F1F] to-[#151A22]">
        {/* Video Container - Simple Iframe Embed */}
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full relative" style={{ paddingTop: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              loading='lazy'
              src="https://adilo.bigcommand.com/watch/osMojtq7"
              frameBorder="0"
              allowFullScreen
              scrolling="no"
            />
          </div>
        </div>

        {/* Title Overlay - Positioned to not block video interaction */}
        <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none">
          <div className="text-center px-6">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 image-overlay-headline"
            >
              About Smart RV
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 image-overlay-headline"
            >
              The Future of Intelligent Travel
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
            {/* Mission Section */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10 text-left">
              <h2 className="text-3xl font-bold text-white mb-6 text-left">Our Mission</h2>
              <p className="text-white/90 text-lg leading-relaxed text-left mb-4">
                Smart RV is revolutionizing the recreational vehicle industry by integrating cutting edge technology with traditional smart RV experiences.
              </p>
              <p className="text-white/90 text-lg leading-relaxed text-left">
                We believe that the future of travel lies in intelligent, connected smart RVs that enhance safety, comfort, and convenience for every journey.
              </p>
            </div>

            {/* Innovation & Sustainability Grid */}
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

            {/* Why Choose Smart RV */}
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

            {/* Affiliate Partners Grid */}
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
            <div className="px-4">
              <AffiliateDisclosure compact className="max-w-6xl mx-auto my-8" />
            </div>

            {/* Call to Action */}
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
