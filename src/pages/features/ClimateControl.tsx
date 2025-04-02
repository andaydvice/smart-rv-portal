
import { motion } from "framer-motion";
import { Thermometer, Droplet, Fan, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";

const ClimateControl = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Thermometer className="h-8 w-8 text-[#5B9BD5]" />
            <h1 className="text-4xl font-bold text-white">Smart Climate Control</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Advanced Temperature Management</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/ae14102b-cf2e-443b-a722-7fe364e92e36.png" 
                  alt="Climate Control Dashboard"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-[#E2E8FF] mb-6 text-left">
                Experience unparalleled comfort with our precision climate control system. Dynamic temperature zones allow different areas of your RV to maintain independent climate settings, while smart sensors continuously optimize for energy efficiency.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Multi-zone temperature control</li>
                <li>Smart scheduling for pre-heating/cooling</li>
                <li>Learning algorithms adapt to your preferences</li>
                <li>Voice command integration</li>
                <li>Remote control via smartphone app</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Humidity Control & Air Quality</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/9e2c5b7f-c03c-4d99-9997-0d3de18f61e1.png"
                  alt="Air Quality Monitor"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-[#E2E8FF] mb-6 text-left">
                Maintain the perfect atmospheric balance with intelligent humidity control and advanced air filtration. Our system automatically adjusts to prevent condensation and mold while ensuring allergens and pollutants are removed from your living space.
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#E2E8FF] text-left">
                <li>Precision humidity level management</li>
                <li>HEPA filtration system</li>
                <li>Air quality monitoring with alerts</li>
                <li>Automated ventilation control</li>
                <li>Anti-condensation technology</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-12">
            <h2 className="text-2xl font-semibold text-[#5B9BD5] mb-6">System Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Fan className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Energy Efficient</h3>
                <p className="text-[#E2E8FF] text-left">Smart algorithms optimize energy usage by up to 30% compared to traditional systems.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Clock className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Scheduling</h3>
                <p className="text-[#E2E8FF] text-left">Set climate preferences based on time, location, or activity patterns.</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg flex flex-col items-center">
                <Shield className="h-8 w-8 text-[#5B9BD5] mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">Health Protection</h3>
                <p className="text-[#E2E8FF] text-left">Advanced filtration removes allergens, bacteria, and VOCs for cleaner air.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/schedule-demo">
              <Button size="lg" className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white text-lg py-6 px-8">
                Schedule a Climate System Demo
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ClimateControl;
