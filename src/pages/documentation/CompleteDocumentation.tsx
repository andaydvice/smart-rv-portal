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
              Back to Documentation
            </Button>
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Complete System Documentation</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              In-depth documentation covering all aspects of your Smart RV system
            </p>
          </div>

          <div className="space-y-12">
            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">System Architecture Overview</CardTitle>
                <CardDescription className="text-gray-300">
                  Detailed breakdown of the Smart RV system architecture and components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="system-overview" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-blue-300">Core System Components</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-blue-200">Central Control Unit (CCU)</h3>
                      <p>The CCU is the brain of your Smart RV, coordinating all subsystems and ensuring smooth operation. It features:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Dual-core processor optimized for RV operations</li>
                        <li>8GB RAM for smooth multitasking</li>
                        <li>256GB SSD for system and user data storage</li>
                        <li>Redundant power supply with automatic failover</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="network-architecture" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-blue-300">Network Architecture</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-blue-200">Multi-Layer Network Design</h3>
                      <p>Our network architecture ensures reliable connectivity through:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Dual-band WiFi (2.4GHz + 5GHz)</li>
                        <li>4G LTE backup connection</li>
                        <li>Mesh network capability for extended coverage</li>
                        <li>Enterprise-grade security protocols</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="power-management" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-blue-300">Advanced Power Management</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-blue-200">Intelligent Power Distribution</h3>
                      <p>The power management system includes:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Smart load balancing between multiple power sources</li>
                        <li>Solar integration with MPPT technology</li>
                        <li>Lithium battery management system</li>
                        <li>Predictive maintenance algorithms</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400">Security & Safety Features</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive security measures protecting your Smart RV
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="physical-security" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-emerald-300">Physical Security</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-emerald-200">Multi-Layer Protection</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>360° camera coverage with night vision</li>
                        <li>Motion sensors with AI detection</li>
                        <li>Smart door locks with biometric authentication</li>
                        <li>GPS tracking with geofencing alerts</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cyber-security" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-emerald-300">Cybersecurity Measures</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-emerald-200">Network Protection</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Enterprise-grade firewall</li>
                        <li>Encrypted data transmission</li>
                        <li>Regular security updates</li>
                        <li>Intrusion detection system</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Maintenance & Support</CardTitle>
                <CardDescription className="text-gray-300">
                  Detailed maintenance procedures and support resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="routine-maintenance" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-purple-300">Routine Maintenance</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-purple-200">Maintenance Schedule</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Daily system health checks</li>
                        <li>Weekly backup procedures</li>
                        <li>Monthly performance optimization</li>
                        <li>Quarterly professional inspection</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="support-resources" className="border-gray-700">
                    <AccordionTrigger className="text-xl text-purple-300">Support Resources</AccordionTrigger>
                    <AccordionContent className="text-gray-100 space-y-4">
                      <h3 className="text-lg font-semibold text-purple-200">Available Support Channels</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>24/7 emergency technical support</li>
                        <li>Online knowledge base</li>
                        <li>Video tutorials library</li>
                        <li>Community forums</li>
                      </ul>
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