import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { Bed, Thermometer, Wind, Lightbulb, Coffee, Bath, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import heroImage from '@/assets/rv-comfort-hero.webp';
import advancedComfortImage from '@/assets/rv-advanced-comfort.webp';

const RVComfortGuide = () => {
  const comfortAreas = [
    {
      icon: Bed,
      title: "Sleep Quality",
      description: "Create the perfect sleeping environment",
      tips: [
        "Invest in a quality RV mattress or mattress topper",
        "Use blackout curtains for better sleep cycles",
        "Consider a white noise machine for camp sounds",
        "Maintain optimal bedroom temperature (65-68°F)"
      ]
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Maintain comfortable temperature and humidity",
      tips: [
        "Use ceiling fans to improve air circulation",
        "Install thermal window coverings",
        "Monitor humidity levels (30-50% ideal)",
        "Consider a mini-split system for efficiency"
      ]
    },
    {
      icon: Wind,
      title: "Air Quality",
      description: "Keep your RV air fresh and clean",
      tips: [
        "Install air purifiers with HEPA filters",
        "Use exhaust fans while cooking",
        "Open windows when weather permits",
        "Replace HVAC filters regularly"
      ]
    },
    {
      icon: Lightbulb,
      title: "Lighting",
      description: "Optimize lighting for comfort and mood",
      tips: [
        "Use LED bulbs for energy efficiency",
        "Install dimmer switches for ambiance",
        "Add task lighting in work areas",
        "Consider color-changing smart bulbs"
      ]
    },
    {
      icon: Coffee,
      title: "Kitchen Comfort",
      description: "Make cooking and dining enjoyable",
      tips: [
        "Organize with space-saving storage solutions",
        "Use quality cookware that heats evenly",
        "Install good ventilation above the stove",
        "Create comfortable seating for meals"
      ]
    },
    {
      icon: Bath,
      title: "Bathroom Comfort",
      description: "Maximize comfort in small spaces",
      tips: [
        "Use space-saving shower organizers",
        "Install good lighting around the mirror",
        "Consider a composting toilet for comfort",
        "Use moisture-absorbing materials"
      ]
    }
  ];

  const comfortTips = [
    {
      category: "Space Optimization",
      items: [
        "Use multi-functional furniture",
        "Install fold-down tables and surfaces",
        "Maximize vertical storage space",
        "Choose lighter color schemes to feel more spacious"
      ]
    },
    {
      category: "Noise Reduction",
      items: [
        "Add sound dampening materials",
        "Use soft furnishings to absorb sound",
        "Install weather stripping around doors",
        "Consider quieter appliances when upgrading"
      ]
    },
    {
      category: "Personal Touches",
      items: [
        "Display family photos and artwork",
        "Use familiar scents and candles",
        "Bring comfortable pillows and blankets",
        "Create dedicated spaces for hobbies"
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>RV Comfort Guide | Smart RV Portal</title>
        <meta name="description" content="Essential tips and solutions for maximizing comfort in your RV, from sleep quality to climate control and space optimization." />
        <meta name="keywords" content="RV comfort, RV living tips, RV interior, mobile home comfort, travel trailer comfort" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/rv-comfort-guide' : ''} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        {/* Hero Banner */}
        <div 
          className="relative w-full h-[60vh] min-h-[400px] max-h-[720px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 flex items-center justify-start h-full max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                RV Comfort Guide
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                Transform your RV into a comfortable home on wheels with expert tips and solutions 
                for maximizing comfort, efficiency, and livability in your mobile space.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">

          {/* Comfort Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {comfortAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <area.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{area.title}</h3>
                    <p className="text-gray-400 text-sm">{area.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {area.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-300 flex items-start text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Advanced Comfort Showcase Image */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <img 
                src={advancedComfortImage} 
                alt="Modern RV interior showcasing advanced comfort optimization techniques"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </motion.section>

          {/* Additional Comfort Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Advanced Comfort Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {comfortTips.map((category, index) => (
                <div key={category.category}>
                  <h3 className="text-xl font-semibold text-white mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 flex items-start text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Seasonal Comfort */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Winter Comfort</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use thermal window coverings</li>
                <li>• Add extra insulation where possible</li>
                <li>• Keep moisture levels low to prevent condensation</li>
                <li>• Use safe heating sources and ensure ventilation</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-[#151A22] to-[#1a202c] p-8 rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Summer Comfort</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Use reflective window covers</li>
                <li>• Maximize air circulation with fans</li>
                <li>• Park in shade when possible</li>
                <li>• Use awnings and outdoor spaces</li>
              </ul>
            </div>
          </motion.section>

          {/* Related Navigation */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 mt-12 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Explore More</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/features">
                <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Smart Features Hub
                </Button>
              </Link>
              <Link to="/models">
                <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All Models
                </Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" className="bg-transparent border-blue-500 text-blue-400 hover:bg-blue-500/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Planning Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RVComfortGuide;