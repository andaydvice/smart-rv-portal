
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Cpu, Workflow, Zap, Wifi, Brain, ShieldCheck } from "lucide-react";

const SmartAutomation = () => {
  return (
    <Layout>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-[#080F1F] to-[#151A22] pt-20 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Smart RV Automation</h1>
            <p className="text-xl text-[#E2E8FF] max-w-3xl mx-auto">
              Experience next-generation convenience with intelligent systems that anticipate your needs and automate daily RV tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#151A22] p-8 rounded-xl border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
              <Cpu className="w-12 h-12 text-[#5B9BD5] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Intelligent Climate Control</h3>
              <p className="text-[#E2E8FF]">
                Automatically adjusts temperature and humidity based on your preferences, time of day, and external weather conditions.
              </p>
            </div>

            <div className="bg-[#151A22] p-8 rounded-xl border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
              <Workflow className="w-12 h-12 text-[#10B981] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Automated Routine Sequences</h3>
              <p className="text-[#E2E8FF]">
                Create custom automation sequences for morning, evening, or travel preparation with a single voice command or tap.
              </p>
            </div>

            <div className="bg-[#151A22] p-8 rounded-xl border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
              <Zap className="w-12 h-12 text-[#F59E0B] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Smart Energy Management</h3>
              <p className="text-[#E2E8FF]">
                Intelligently balances power usage between solar, battery, and shore power to optimize efficiency and reduce costs.
              </p>
            </div>

            <div className="bg-[#151A22] p-8 rounded-xl border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
              <Wifi className="w-12 h-12 text-[#3B82F6] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Connected Device Ecosystem</h3>
              <p className="text-[#E2E8FF]">
                Seamlessly integrates with smartphones, wearables, and other IoT devices to create a responsive living environment.
              </p>
            </div>

            <div className="bg-[#151A22] p-8 rounded-xl border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
              <Brain className="w-12 h-12 text-[#8B5CF6] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Adaptive Learning System</h3>
              <p className="text-[#E2E8FF]">
                The system learns from your habits and preferences over time, automatically adjusting settings to match your lifestyle.
              </p>
            </div>

            <div className="bg-[#151A22] p-8 rounded-xl border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-300">
              <ShieldCheck className="w-12 h-12 text-[#EF4444] mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Advanced Security Automation</h3>
              <p className="text-[#E2E8FF]">
                Automatically locks doors, activates surveillance, and monitors access points when you leave or during night hours.
              </p>
            </div>
          </div>

          <div className="bg-[#131a2a] rounded-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">How Smart Automation Works</h2>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#151A22] flex items-center justify-center text-[#5B9BD5] text-xl font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Sensor Network</h3>
                  <p className="text-[#E2E8FF]">
                    A comprehensive network of sensors throughout your RV continuously monitors temperature, motion, light levels, air quality, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#151A22] flex items-center justify-center text-[#5B9BD5] text-xl font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Central Processing</h3>
                  <p className="text-[#E2E8FF]">
                    The Smart RV Controller processes sensor data and user preferences to make intelligent decisions about system operations.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#151A22] flex items-center justify-center text-[#5B9BD5] text-xl font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Automated Actions</h3>
                  <p className="text-[#E2E8FF]">
                    Smart systems automatically adjust lighting, climate, entertainment, security, and more based on the processed information.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#151A22] flex items-center justify-center text-[#5B9BD5] text-xl font-bold">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">User Control</h3>
                  <p className="text-[#E2E8FF]">
                    Override automation anytime through the smartphone app, touchscreen control panel, or voice commands.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Transform Your RV Experience?</h2>
            <div className="inline-block">
              <button className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white px-8 py-3 rounded-md text-lg transition-colors">
                Schedule a Smart Automation Demo
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SmartAutomation;
