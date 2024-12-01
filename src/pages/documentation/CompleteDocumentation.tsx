import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

const CompleteDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Link to="/documentation">
            <Button
              variant="outline"
              className="bg-white/5 text-white border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation Overview
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Complete System Documentation</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive documentation covering all aspects of your Smart RV system
            </p>
          </div>

          <div className="space-y-12">
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">System Architecture</CardTitle>
                <CardDescription className="text-gray-300">
                  Detailed breakdown of the Smart RV system architecture and components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="central-control" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-blue-300">Central Control Unit (CCU)</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-blue-200">Overview</h3>
                      <p className="leading-relaxed">
                        The Central Control Unit (CCU) serves as the brain of your Smart RV, coordinating all subsystems and ensuring smooth operation. It features a dual-core processor specifically optimized for RV operations, with 8GB of RAM for smooth multitasking and a 256GB SSD for system and user data storage.
                      </p>
                      <h3 className="text-lg font-semibold text-blue-200 mt-6">Key Components</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Dual-core ARM processor running at 2.0 GHz per core</li>
                        <li>Temperature-resistant design operating from -20°C to 60°C</li>
                        <li>8GB DDR4 RAM for efficient multitasking</li>
                        <li>256GB industrial-grade SSD with wear leveling</li>
                        <li>Redundant power supply with automatic failover</li>
                        <li>Hardware watchdog timer for system stability</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-blue-200 mt-6">System Integration</h3>
                      <p className="leading-relaxed">
                        The CCU integrates with all major RV subsystems through a proprietary high-speed bus system. This includes power management, climate control, security systems, and entertainment features. The integration allows for centralized control and monitoring of all RV functions through both the main display and mobile app.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="network-infrastructure" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-blue-300">Network Infrastructure</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-blue-200">Connectivity Overview</h3>
                      <p className="leading-relaxed">
                        The network infrastructure combines multiple technologies to ensure reliable connectivity in any situation. The system features dual-band WiFi (2.4GHz + 5GHz) with MIMO technology, 4G LTE backup connection, and mesh network capability for extended coverage throughout your RV.
                      </p>
                      <h3 className="text-lg font-semibold text-blue-200 mt-6">Security Features</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>WPA3 encryption for wireless security</li>
                        <li>Hardware firewall with intrusion detection</li>
                        <li>VPN support for secure remote access</li>
                        <li>Network segmentation for IoT devices</li>
                        <li>Regular security updates and patches</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-blue-200 mt-6">Performance Optimization</h3>
                      <p className="leading-relaxed">
                        The network system includes advanced QoS (Quality of Service) features to prioritize critical system traffic over entertainment data. This ensures that important functions like security and power management always have the bandwidth they need.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="power-management" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-blue-300">Power Management System</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-blue-200">Power Sources</h3>
                      <p className="leading-relaxed">
                        The power management system intelligently coordinates multiple power sources including shore power, solar panels, batteries, and generator. The system automatically switches between sources based on availability and demand, ensuring optimal power efficiency.
                      </p>
                      <h3 className="text-lg font-semibold text-blue-200 mt-6">Battery Management</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Advanced lithium battery monitoring</li>
                        <li>Temperature-compensated charging</li>
                        <li>State of charge estimation</li>
                        <li>Automatic load shedding</li>
                        <li>Battery health diagnostics</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-blue-200 mt-6">Solar Integration</h3>
                      <p className="leading-relaxed">
                        The solar power system includes MPPT (Maximum Power Point Tracking) technology for optimal solar charging efficiency. The system monitors solar production, battery state, and power consumption in real-time, providing detailed analytics through the dashboard.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400">User Interface & Controls</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive guide to system interfaces and control mechanisms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="main-display" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-emerald-300">Main Display Interface</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-emerald-200">Display Specifications</h3>
                      <p className="leading-relaxed">
                        The main display features a 10-inch HD touchscreen with anti-glare coating and automatic brightness adjustment. The interface is designed for both day and night operation, with customizable color schemes and layout options.
                      </p>
                      <h3 className="text-lg font-semibold text-emerald-200 mt-6">Interface Features</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Customizable dashboard layouts</li>
                        <li>Multi-touch gesture support</li>
                        <li>Voice control integration</li>
                        <li>Context-sensitive help system</li>
                        <li>Emergency override controls</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mobile-app" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-emerald-300">Mobile Application</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-emerald-200">App Capabilities</h3>
                      <p className="leading-relaxed">
                        The mobile app provides full remote access to your RV's systems, allowing you to monitor and control various functions from anywhere with an internet connection. The app includes advanced features like geofencing, automated routines, and push notifications for important events.
                      </p>
                      <h3 className="text-lg font-semibold text-emerald-200 mt-6">Security Features</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Biometric authentication</li>
                        <li>Two-factor authentication</li>
                        <li>Encrypted communication</li>
                        <li>Remote access logging</li>
                        <li>Emergency lockout capability</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-rose-400">Maintenance & Troubleshooting</CardTitle>
                <CardDescription className="text-gray-300">
                  Detailed maintenance procedures and troubleshooting guides
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="routine-maintenance" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-rose-300">Routine Maintenance</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-rose-200">Maintenance Schedule</h3>
                      <p className="leading-relaxed">
                        Regular maintenance is crucial for optimal system performance. The system includes automated maintenance routines and will notify you when manual intervention is required. Key maintenance tasks are scheduled based on usage patterns and system health metrics.
                      </p>
                      <h3 className="text-lg font-semibold text-rose-200 mt-6">Key Procedures</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Monthly system diagnostics</li>
                        <li>Quarterly sensor calibration</li>
                        <li>Semi-annual software updates</li>
                        <li>Annual hardware inspection</li>
                        <li>Battery maintenance schedule</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="troubleshooting" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-rose-300">Advanced Troubleshooting</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-rose-200">Diagnostic Tools</h3>
                      <p className="leading-relaxed">
                        The system includes comprehensive diagnostic tools for identifying and resolving issues. These tools provide detailed system logs, performance metrics, and automated troubleshooting procedures for common problems.
                      </p>
                      <h3 className="text-lg font-semibold text-rose-200 mt-6">Common Issues</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Network connectivity problems</li>
                        <li>Power system anomalies</li>
                        <li>Sensor calibration issues</li>
                        <li>Software update failures</li>
                        <li>Hardware malfunction indicators</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-rose-200 mt-6">Emergency Procedures</h3>
                      <p className="leading-relaxed">
                        In case of system failure, the emergency recovery mode can be activated by pressing and holding the recovery button for 10 seconds. This mode provides basic system functionality and access to recovery tools.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteDocumentation;