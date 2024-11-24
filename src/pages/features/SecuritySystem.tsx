import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Shield, Lock, Bell, Camera } from "lucide-react";

const SecuritySystem = () => {
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
            <Shield className="h-8 w-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-white">Security System</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Advanced Security Features</h2>
              <p className="text-gray-300 mb-6">
                Our comprehensive security system provides peace of mind with state-of-the-art 
                technology and round-the-clock monitoring. From smart locks to motion detection, 
                your RV is protected wherever your journey takes you.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Security System Interface" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Smart door locks with remote access</li>
                <li>Motion sensors and security cameras</li>
                <li>Real-time alerts to your mobile device</li>
                <li>GPS tracking and geofencing</li>
                <li>Emergency response integration</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Lock className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Locks</h3>
                <p className="text-gray-300">
                  Keyless entry system with remote control and automatic locking features.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Bell className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Alert System</h3>
                <p className="text-gray-300">
                  Instant notifications for any security events with customizable alert settings.
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Camera className="h-6 w-6 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video Surveillance</h3>
                <p className="text-gray-300">
                  HD cameras with night vision and motion detection for complete coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SecuritySystem;