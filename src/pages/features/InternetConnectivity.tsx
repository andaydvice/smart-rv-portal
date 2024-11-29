import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Wifi, Globe, Shield, Zap } from "lucide-react";

const InternetConnectivity = () => {
  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min h screen pt24 px4 bg gradient to b from gray900 to gray800"
      >
        <div className="max w 7xl mx auto">
          <div className="flex items center gap4 mb8">
            <Wifi className="h8 w8 text cyan500" />
            <h1 className="text4xl font bold text white">Internet Connectivity</h1>
          </div>

          <div className="grid grid cols1 md:grid cols2 gap8 mb12">
            <div className="bg gray800/50 p8 rounded lg border border gray700">
              <h2 className="text2xl font semibold text cyan400 mb4">Always Connected</h2>
              <p className="text gray300 mb6">
                Stay connected wherever your journey takes you with our advanced internet 
                connectivity solutions. Featuring high speed 5G capabilities and reliable 
                satellite backup, never lose touch with what matters most.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8" 
                alt="Mobile Internet Connectivity" 
                className="w full h64 object cover rounded lg mb6"
              />
              <ul className="list disc list inside space y3 text gray300">
                <li>High speed 5G connectivity</li>
                <li>Dual band WiFi system</li>
                <li>Signal booster integration</li>
                <li>Multiple device support</li>
                <li>Secure network encryption</li>
              </ul>
            </div>

            <div className="space y6">
              <div className="bg gray800/50 p6 rounded lg border border gray700">
                <Globe className="h6 w6 text blue400 mb4" />
                <h3 className="text xl font semibold text white mb2">Global Coverage</h3>
                <p className="text gray300">
                  Seamless connectivity across borders with automatic carrier switching and 
                  satellite backup options.
                </p>
              </div>

              <div className="bg gray800/50 p6 rounded lg border border gray700">
                <Shield className="h6 w6 text green400 mb4" />
                <h3 className="text xl font semibold text white mb2">Enhanced Security</h3>
                <p className="text gray300">
                  Enterprise grade encryption and security protocols keep your data safe 
                  while on the move.
                </p>
              </div>

              <div className="bg gray800/50 p6 rounded lg border border gray700">
                <Zap className="h6 w6 text yellow400 mb4" />
                <h3 className="text xl font semibold text white mb2">Smart Optimization</h3>
                <p className="text gray300">
                  Intelligent bandwidth management and automatic network optimization for 
                  the best possible connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default InternetConnectivity;