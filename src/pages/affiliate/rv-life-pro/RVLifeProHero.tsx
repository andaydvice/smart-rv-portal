import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Check, AlertTriangle, MapPin, Shield, Star } from 'lucide-react';

const RVLifeProHero: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>RV Life Pro - Never Risk a $15,000 Bridge Strike Again | Smart RV Hub</title>
        <meta name="description" content="Join 47,000+ RV owners using RV Life Pro for safe GPS routing. Prevent bridge strikes, find campgrounds, and travel worry-free." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22]">
        
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Never Risk a $15,000 Bridge Strike Again
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              RV-Safe GPS Navigation for Caravans and Motorhomes
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white text-lg px-8 py-6"
                onClick={() => window.open('https://rvlife.com', '_blank')}
              >
                Start 14-Day Free Trial
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Crisis Story */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Real Story: The $15,000 Mistake</h2>
                <p className="text-white/90 leading-relaxed mb-4">
                  Sarah and Tom were 3 days into their dream retirement trip when their GPS led them under a 3.2m bridge. Their 3.8m motorhome didn't fit. 
                </p>
                <p className="text-white/90 leading-relaxed">
                  The result? $15,000 in damage, ruined holiday, and insurance premiums that doubled. All because their regular GPS didn't know their RV height.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why 47,000+ RVers Trust RV Life Pro</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <Shield className="w-12 h-12 text-[#5B9BD5] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">RV-Safe Routes</h3>
              <p className="text-white/80">
                Knows your RV height, width, and weight. Never get sent under low bridges or narrow roads again.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <MapPin className="w-12 h-12 text-[#5B9BD5] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">14,000+ Campgrounds</h3>
              <p className="text-white/80">
                Find perfect campsites with reviews, photos, and real-time availability across Australia and NZ.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <Star className="w-12 h-12 text-[#5B9BD5] mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">4.8/5 Rating</h3>
              <p className="text-white/80">
                From 2,300+ verified reviews. RVers love the peace of mind and stress-free navigation.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-black/20 backdrop-blur-md p-12 rounded-xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Just $65/Year</h2>
            <p className="text-white/80 text-lg mb-8">
              One avoided wrong turn pays for itself. 14-day free trial, cancel anytime.
            </p>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              <li className="flex items-center text-white/90">
                <Check className="w-5 h-5 text-[#5B9BD5] mr-3 flex-shrink-0" />
                RV-safe GPS navigation
              </li>
              <li className="flex items-center text-white/90">
                <Check className="w-5 h-5 text-[#5B9BD5] mr-3 flex-shrink-0" />
                14,000+ campground database
              </li>
              <li className="flex items-center text-white/90">
                <Check className="w-5 h-5 text-[#5B9BD5] mr-3 flex-shrink-0" />
                Trip planning tools
              </li>
              <li className="flex items-center text-white/90">
                <Check className="w-5 h-5 text-[#5B9BD5] mr-3 flex-shrink-0" />
                Weather & road conditions
              </li>
            </ul>
            <Button 
              size="lg" 
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white text-lg px-12 py-6"
              onClick={() => window.open('https://rvlife.com', '_blank')}
            >
              Start Free Trial
            </Button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default RVLifeProHero;
