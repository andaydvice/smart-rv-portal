
import React from 'react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from "framer-motion";
import { WifiIcon, HomeIcon, LightbulbIcon, ThermometerIcon } from 'lucide-react';

const SmartAutomation = () => {
  return (
    <Layout>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <Container className="py-24">
          <h1 className="text-4xl font-bold text-white mb-8">Smart RV Automation</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-lg text-gray-300 mb-6">
                Experience unprecedented control of your RV environment with our advanced automation systems. Smart RV Automation seamlessly integrates all your vehicle's systems into one intuitive interface, giving you complete command whether you're inside your RV or miles away.
              </p>
              
              <p className="text-lg text-gray-300">
                Our automation technology transforms your recreational vehicle into a true smart home on wheels, adapting to your preferences and optimizing energy usage automatically.
              </p>
            </div>
            
            <Card className="bg-[#131a2a] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#5B9BD5]">Key Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#5B9BD5]/20 p-2 rounded-full">
                    <HomeIcon className="h-6 w-6 text-[#5B9BD5]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Whole-RV Integration</h3>
                    <p className="text-gray-400">Control lighting, climate, entertainment, security, and power systems from a single app.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[#5B9BD5]/20 p-2 rounded-full">
                    <WifiIcon className="h-6 w-6 text-[#5B9BD5]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Remote Access</h3>
                    <p className="text-gray-400">Monitor and control your RV systems from anywhere with an internet connection.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[#5B9BD5]/20 p-2 rounded-full">
                    <ThermometerIcon className="h-6 w-6 text-[#5B9BD5]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Smart Climate Control</h3>
                    <p className="text-gray-400">Automatically adjusts temperature based on weather conditions and preferences.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-[#5B9BD5]/20 p-2 rounded-full">
                    <LightbulbIcon className="h-6 w-6 text-[#5B9BD5]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Customizable Scenes</h3>
                    <p className="text-gray-400">Create and activate personalized settings for different scenarios with one touch.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#131a2a] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Voice Activation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Control your RV with simple voice commands through popular virtual assistants. Adjust lighting, temperature, and entertainment systems hands-free.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#131a2a] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Energy Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Smart power management that prioritizes critical systems and reduces energy usage when appropriate, extending battery life and reducing generator runtime.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#131a2a] border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Safety Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Integrated smoke, carbon monoxide, and propane detectors with instant notifications to your mobile device if issues are detected.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </motion.div>
    </Layout>
  );
};

export default SmartAutomation;
