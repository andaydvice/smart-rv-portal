
import { motion } from "framer-motion";
import { Phone, Wifi, Lock, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { OptimizedImage } from "@/components/blog/post/OptimizedImage";

const RemoteControl = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Full width header image section */}
      <div className="relative w-full h-[600px] overflow-hidden -mt-16">
        <div className="absolute inset-0 w-full h-full bg-black/60 z-10"></div>
        <OptimizedImage
          src="/lovable-uploads/cdb72cba-3fb1-44e9-8aea-bde00743141a.png"
          alt="RV Remote Control Device"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-md text-left">
              <h1 className="text-5xl font-bold text-white mb-4 image-overlay-headline">
                Remote Control
              </h1>
              <p className="text-xl text-white image-overlay-headline">
                Take command of your RV systems from anywhere
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">Smartphone Control</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/1c1bb4c0-13a3-42f8-9b4d-f0aa74e2adb3.png"
                  alt="Mobile App Interface"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Intuitive mobile app interface for iOS and Android</li>
                <li>Personalized user profiles and settings</li>
                <li>Real time system monitoring and alerts</li>
                <li>Touch controls for all RV systems</li>
                <li>Scheduling and automation capabilities</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[72px]">
                <h2 className="text-2xl font-semibold text-[#5B9BD5]">System Integration</h2>
              </div>
              <div className="relative aspect-video mb-6">
                <img 
                  src="/lovable-uploads/51ac2438-08c7-47ee-b56d-876aa3bbdc80.png"
                  alt="System Integration Diagram"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Seamless connection with all smart RV systems</li>
                <li>Central hub for comprehensive control</li>
                <li>Unified dashboard for system status</li>
                <li>Automatic sync between devices</li>
                <li>Offline mode for essential functions</li>
              </ul>
            </div>
          </div>

          {/* Technology Breakdown Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">Technology Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <Phone className="h-10 w-10 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Mobile App</h3>
                <p className="text-gray-300">Advanced application with intuitive controls, customizable dashboards, and smart notifications for complete RV management.</p>
              </div>
              
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <Wifi className="h-10 w-10 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Connectivity Options</h3>
                <p className="text-gray-300">Multiple connection methods including 5G, WiFi, and Bluetooth, with automatic switching for consistent control anywhere.</p>
              </div>
              
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <Lock className="h-10 w-10 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Security Features</h3>
                <p className="text-gray-300">Enterprise grade encryption, multi factor authentication, and secure access controls to protect your RV systems.</p>
              </div>
              
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700">
                <Monitor className="h-10 w-10 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Integration</h3>
                <p className="text-gray-300">Compatible with all smart RV systems and major smart home platforms for extended functionality.</p>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700 mb-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Real World Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">Climate Control</h3>
                <p className="text-gray-300 mb-6">
                  Pre cool or heat your RV before arrival, ensuring perfect comfort the moment you step inside.
                  Schedule temperature changes based on time of day or your location.
                </p>
                
                <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">System Monitoring</h3>
                <p className="text-gray-300 mb-6">
                  Check battery levels, water tank capacity, and security status from anywhere.
                  Receive instant alerts if any system requires attention.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">Remote Troubleshooting</h3>
                <p className="text-gray-300 mb-6">
                  Diagnose and resolve system issues without visiting a service center.
                  Share system data with support technicians for faster resolution.
                </p>
                
                <h3 className="text-xl font-semibold text-[#5B9BD5] mb-3">Power Management</h3>
                <p className="text-gray-300 mb-6">
                  Monitor energy usage and switch between power sources remotely.
                  Optimize power consumption based on usage patterns and availability.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Demonstration */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-6">The Control Interface</h2>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <h3 className="text-xl font-semibold text-[#5B9BD5] mb-4">Dashboard View</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-300">
                    <li>System status at a glance</li>
                    <li>Quick access to essential controls</li>
                    <li>Customizable layout</li>
                    <li>Real time updates</li>
                  </ul>
                </div>
                <div className="col-span-2">
                  <img 
                    src="/lovable-uploads/58df06da-2491-453e-9f4d-11154ddb1104.png"
                    alt="App Interface Dashboard" 
                    className="w-full rounded-lg border border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Experience Total Control</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Take command of your smart RV experience with our comprehensive remote control system, designed for convenience, security, and peace of mind.
            </p>
            <Link to="/schedule-demo">
              <Button size="lg" className="text-lg py-6 px-8">
                Schedule a Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default RemoteControl;
