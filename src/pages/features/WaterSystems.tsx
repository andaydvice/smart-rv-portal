
import React, { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { 
  Droplet, 
  RefreshCw, 
  Filter, 
  Waves,
  BarChart3,
  AlertTriangle,
  Gauge,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WaterSystems = () => {
  // Using both useLayoutEffect and useEffect for maximum reliability
  useLayoutEffect(() => {
    console.log("WaterSystems useLayoutEffect - immediate visibility fixes");
    
    // Force document visibility, color and opacity immediately
    document.body.style.backgroundColor = '#080F1F';
    document.documentElement.style.backgroundColor = '#080F1F';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    document.body.style.display = 'block';
    
    // Force root visibility
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.opacity = '1';
      root.style.backgroundColor = '#080F1F';
    }
  }, []);

  useEffect(() => {
    console.log("WaterSystems page mounted - forcing update");
    
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    // Force update using the global function if available
    if (typeof window !== 'undefined' && window.forceRouteUpdate) {
      window.forceRouteUpdate('water-systems');
    }
    
    // Show toast to verify component is working
    toast.success("Water Systems page loaded successfully", {
      duration: 2000,
    });
    
    // Log to console to verify component mounted
    console.log("Water Systems page fully rendered");
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  const staggeredContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      <div className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-16"
          >
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Smart Water Systems</h1>
                <p className="text-xl text-gray-300 mb-8">
                  Advanced monitoring and management of your RV's complete water system for safety, efficiency, and peace of mind.
                </p>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-connectivity-accent/20 p-2 rounded-full">
                      <Droplet className="h-5 w-5 text-connectivity-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Real-time monitoring</h3>
                      <p className="text-gray-300">
                        Track water levels, usage patterns, and quality with precision sensors.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-[#10B981]/20 p-2 rounded-full">
                      <Filter className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Multi-stage filtration</h3>
                      <p className="text-gray-300">
                        Premium water purification system for clean, safe drinking water anywhere.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-[#8B5CF6]/20 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Smart alerts</h3>
                      <p className="text-gray-300">
                        Get notifications for leaks, tank levels, and maintenance needs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-connectivity-accent hover:bg-connectivity-accent/90 text-white">
                    Learn More
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    View Specifications
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/7756e688-8317-4115-a900-53fcc1aee60f.png" 
                    alt="Smart RV water system with digital monitoring panel" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 right-4 bg-connectivity-darkBg/80 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-sm text-white font-medium">Premium Series</span>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              variants={staggeredContainer}
              initial="initial"
              animate="animate"
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Complete Water Management System</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <motion.div 
                  variants={fadeIn}
                  className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700 hover:border-connectivity-accent transition-colors"
                >
                  <Droplet className="h-8 w-8 text-connectivity-accent mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Fresh Water Management</h3>
                  <p className="text-gray-300">
                    Monitor fresh water levels, usage patterns, and quality with integrated sensors. Receive alerts when levels are low or when it's time to replace filters.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeIn}
                  className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700 hover:border-[#10B981] transition-colors"
                >
                  <RefreshCw className="h-8 w-8 text-[#10B981] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Waste Water Management</h3>
                  <p className="text-gray-300">
                    Track gray and black water tank levels with precision sensors. Receive notifications when tanks need emptying and find nearby dump stations.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={fadeIn}
                  className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700 hover:border-[#8B5CF6] transition-colors"
                >
                  <Filter className="h-8 w-8 text-[#8B5CF6] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Filtration System</h3>
                  <p className="text-gray-300">
                    Multi-stage filtration ensures safe drinking water from any source. Track filter life and get automatic maintenance reminders.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeIn}
                  className="bg-connectivity-darkBg p-6 rounded-lg border border-gray-700 hover:border-[#F59E0B] transition-colors"
                >
                  <Waves className="h-8 w-8 text-[#F59E0B] mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Winterization & Maintenance</h3>
                  <p className="text-gray-300">
                    Protect your system with guided winterization protocols and scheduled maintenance reminders throughout the year.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-white mb-8">Smart Water Management Features</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-[#131a2a] to-[#0d1420] p-6 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-[#3B82F6]/20 p-3 rounded-lg">
                      <Gauge className="h-7 w-7 text-[#3B82F6]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Usage Analytics</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
                      <span>Daily water consumption tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
                      <span>Historical usage patterns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
                      <span>Conservation recommendations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
                      <span>Custom usage alerts</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-[#131a2a] to-[#0d1420] p-6 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-[#10B981]/20 p-3 rounded-lg">
                      <BarChart3 className="h-7 w-7 text-[#10B981]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Remote Monitoring</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                      <span>Smartphone app integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                      <span>Real-time tank level monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                      <span>Leak detection alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                      <span>Water quality reports</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-[#131a2a] to-[#0d1420] p-6 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="bg-[#8B5CF6]/20 p-3 rounded-lg">
                      <Settings className="h-7 w-7 text-[#8B5CF6]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Smart Controls</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
                      <span>Voice-activated commands</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
                      <span>Automatic shut-off valves</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
                      <span>Temperature regulation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
                      <span>Pressure monitoring system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Upgrade Your RV's Water System?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Experience the future of RV water management with our smart water systems. Pure water, precise monitoring, and peace of mind wherever your adventures take you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-connectivity-accent hover:bg-connectivity-accent/90 text-white px-6 py-3 text-lg">
                  Request a Quote
                </Button>
                <Link to="/features">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-3 text-lg">
                    Explore All Features
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </Layout>
  );
};

export default WaterSystems;
