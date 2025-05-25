
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Layout from "@/components/layout/Layout";
import { Shield, Lock, Bell, Camera, Smartphone, MapPin, BatteryCharging, KeyRound, Wrench } from "lucide-react";

const SecuritySystem = () => {
  return (
    <Layout>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="h-8 w-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-white">Security System</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Advanced Security Features</h2>
              <div className="text-gray-300 mb-6 space-y-4">
                <p className="text-left">
                  Experience unparalleled peace of mind on every adventure with our cutting edge RV security system.
                </p>
                <p className="text-left">
                  This comprehensive solution integrates state of the art technology to safeguard your mobile home.
                </p>
                <p className="text-left">
                  Enjoy the confidence that comes with round the clock monitoring, providing constant vigilance over your valuable asset.
                </p>
                <p className="text-left">
                  Our system intelligently combines features like smart locks, advanced motion detection, and high definition cameras.
                </p>
                <p className="text-left">
                  This ensures robust protection whether you are parked at a bustling campsite or exploring remote landscapes.
                </p>
                <p className="text-left">
                  Your RV remains secure, allowing you to fully immerse yourself in the journey ahead.
                </p>
              </div>
              <img 
                src="/lovable-uploads/24586e9a-422f-45ee-aaaa-2ffa5f0e2274.png"
                alt="RV Security System Interface" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <ul className="list-disc list-inside space-y-3 text-gray-300 text-left">
                <li className="text-left">Smart door locks with remote access allow you to control entry from anywhere, offering flexibility and convenience.</li>
                <li className="text-left">Motion sensors and security cameras provide comprehensive surveillance, detecting any unusual activity around your RV.</li>
                <li className="text-left">Real time alerts to your mobile device keep you informed of any security events, no matter where you are.</li>
                <li className="text-left">GPS tracking and geofencing capabilities help you monitor your RV’s location and set virtual boundaries for added security.</li>
                <li className="text-left">Emergency response integration ensures that help can be dispatched quickly if a critical situation arises.</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Lock className="h-6 w-6 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Locks</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Seamlessly manage access from your smartphone, whether you’re inside or away from your RV.
                  </p>
                  <p className="text-gray-300 text-left">
                    Receive real time lock status updates and enjoy peace of mind with secure, encrypted control.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Bell className="h-6 w-6 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Alert System</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Stay informed wherever you are—alerts arrive instantly on your mobile device.
                  </p>
                  <p className="text-gray-300 text-left">
                    Easily adjust notification preferences to fit your travel style and security needs.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Camera className="h-6 w-6 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Video Surveillance</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Check live camera feeds anytime through the mobile app for on the go monitoring.
                  </p>
                  <p className="text-gray-300 text-left">
                    All footage is securely encrypted, ensuring your privacy while keeping your RV safe.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <Smartphone className="h-6 w-6 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Mobile App Integration</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Stay in control wherever you roam.
                  </p>
                  <p className="text-gray-300 text-left">
                    Effortlessly lock or unlock doors, monitor live camera feeds, and receive instant security alerts.
                  </p>
                  <p className="text-gray-300 text-left">
                    All from a dedicated mobile app designed for your RV lifestyle.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <MapPin className="h-6 w-6 text-lime-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Geofencing Capabilities</h3>
                <div className="space-y-2">
                  <p className="text-gray-300 text-left">
                    Enjoy hands free security with geofencing.
                  </p>
                  <p className="text-gray-300 text-left">
                    Your system automatically locks, unlocks, and arms or disarms based on your location.
                  </p>
                  <p className="text-gray-300 text-left">
                    This ensures your RV is always protected when you come and go.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <BatteryCharging className="h-6 w-6 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Battery Backup and Reliability</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-left">
                  Never worry about losing protection during a power outage.
                </p>
                <p className="text-gray-300 text-left">
                  Our robust battery backup keeps your security system running smoothly.
                </p>
                <p className="text-gray-300 text-left">
                  So your RV stays secure no matter what.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <KeyRound className="h-6 w-6 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Privacy and Data Security</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-left">
                  Your privacy is our priority.
                </p>
                <p className="text-gray-300 text-left">
                  All video streams and data are encrypted and securely stored.
                </p>
                <p className="text-gray-300 text-left">
                  This gives you complete peace of mind that your information stays private.
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <Wrench className="h-6 w-6 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Easy Installation and Compatibility</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-left">
                  Get started in minutes with our straightforward setup process.
                </p>
                <p className="text-gray-300 text-left">
                  The system is compatible with most RV models and integrates seamlessly with existing equipment.
                </p>
                <p className="text-gray-300 text-left">
                  This makes security upgrades hassle free.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </Layout>
  );
};

export default SecuritySystem;

