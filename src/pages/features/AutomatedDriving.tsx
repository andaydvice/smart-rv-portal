import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Car, Navigation, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AutomatedDriving = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen pt-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Car className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Automated Driving Assistance</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[48px]">
                <h2 className="text-2xl font-semibold text-blue-400">Advanced Driver Assistance Systems (ADAS)</h2>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-emerald-400" />
                  <span className="text-white">Safety Features</span>
                </div>
              </div>
              <div className="relative aspect-video mt-4 mb-6">
                <img 
                  src="/lovable-uploads/23827d7d-a275-4073-9c09-3b69d2d10348.png"
                  alt="ADAS Interface"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Adaptive cruise control for maintaining safe distances</li>
                <li>Lane keeping assist with haptic feedback</li>
                <li>Collision avoidance system with emergency braking</li>
                <li>Blind spot monitoring and detection</li>
                <li>Parking assistance with 360° camera view</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 flex flex-col">
              <div className="h-[48px] mb-4">
                <h2 className="text-2xl font-semibold text-blue-400">GPS and Navigation Integration</h2>
                <div className="flex items-center gap-3">
                  <Navigation className="h-6 w-6 text-purple-400" />
                  <span className="text-white">Smart Navigation</span>
                </div>
              </div>
              <div className="relative aspect-video mt-4 mb-6">
                <img 
                  src="/lovable-uploads/f72886c3-3677-4dfe-8d56-5a784197eda2.png"
                  alt="Navigation System"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Real time traffic updates and route optimization</li>
                <li>RV specific route planning considering vehicle dimensions</li>
                <li>Points of interest and campsite recommendations</li>
                <li>Weather aware navigation with alerts</li>
                <li>Offline map support for remote areas</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/schedule-demo">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AutomatedDriving;