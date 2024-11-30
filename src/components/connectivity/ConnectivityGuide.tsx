import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wifi, Antenna, Satellite, Router, Battery, Laptop, Cloud, Headphones } from "lucide-react";

const ConnectivityGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">Smart RV Connectivity Solutions</CardTitle>
          <CardDescription className="text-gray-300">
            Comprehensive guide to maintaining strong connectivity and creating an efficient mobile workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="boosting" className="border-gray-700">
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                <div className="flex items-center gap-2">
                  <Antenna className="h-5 w-5" />
                  Signal Boosting Solutions
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-200 mb-2">Cellular Signal Boosters</h4>
                  <p>Advanced amplification technology to enhance weak cellular signals in remote areas, providing reliable connectivity when you're off the grid.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-200 mb-2">Directional Antennas</h4>
                  <p>Specialized antennas designed to capture and focus on distant cellular signals, significantly improving reception in challenging locations.</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-200 mb-2">Satellite Internet</h4>
                  <p>Solutions like Starlink Roam provide high-speed internet access in extremely remote locations where cellular coverage is unavailable.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hotspots" className="border-gray-700">
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                <div className="flex items-center gap-2">
                  <Router className="h-5 w-5" />
                  Mobile Hotspots & Routers
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-200 mb-2">Premium Solutions</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Nomad Internet: Unlimited data plans with nationwide coverage</li>
                    <li>WeBoost: RV-specific cellular boosters for optimal performance</li>
                    <li>Teltonika RUTX50: High-speed 5G router with 3.3 Gbps cellular speeds</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-200 mb-2">Affordable Options</h4>
                  <ul className="list-disc list-inside space-y-2">
                    <li>HiBoost: Cost-effective boosters with reliable performance</li>
                    <li>Basic cellular routers: Convert cellular signals to Wi-Fi networks</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="office" className="border-gray-700">
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                <div className="flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Mobile Office Setup
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="h-4 w-4 text-green-400" />
                      <h4 className="font-medium text-blue-200">Power Management</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Solar panel integration</li>
                      <li>Smart power management systems</li>
                      <li>Backup power solutions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Headphones className="h-4 w-4 text-purple-400" />
                      <h4 className="font-medium text-blue-200">Workspace Optimization</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Ergonomic furniture solutions</li>
                      <li>Noise-cancelling equipment</li>
                      <li>Space-saving accessories</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="h-4 w-4 text-blue-400" />
                    <h4 className="font-medium text-blue-200">Cloud & Backup Solutions</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Cloud storage integration</li>
                    <li>Automatic backup systems</li>
                    <li>Dual-SIM router configuration</li>
                    <li>Network redundancy setup</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConnectivityGuide;