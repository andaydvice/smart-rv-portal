import { motion } from "framer-motion";
import { ArrowLeft, Book, Cpu, Tool, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Link to="/troubleshooting">
            <Button 
              variant="outline" 
              className="mb-6 bg-blue-500/10 text-blue-400 border-blue-400 hover:bg-blue-400/10 hover:text-blue-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Troubleshooting
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6">System Documentation</h1>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500">
                <Book className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-blue-500">
                <Cpu className="mr-2 h-4 w-4" />
                Technical
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="data-[state=active]:bg-blue-500">
                <Tool className="mr-2 h-4 w-4" />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="power" className="data-[state=active]:bg-blue-500">
                <Zap className="mr-2 h-4 w-4" />
                Power Systems
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400">System Architecture</CardTitle>
                  <CardDescription>Understanding the Smart RV's core systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">Core Components</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Central Control Unit (CCU)</li>
                      <li>Power Management System</li>
                      <li>Network Infrastructure</li>
                      <li>Security Systems</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Integration Points</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Mobile App Connectivity</li>
                      <li>Cloud Services</li>
                      <li>Third-party Device Support</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400">Technical Specifications</CardTitle>
                  <CardDescription>Detailed system specifications and requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">Hardware Requirements</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Processor: Dual-core ARM processor</li>
                      <li>Memory: 4GB RAM minimum</li>
                      <li>Storage: 64GB SSD</li>
                      <li>Network: Dual-band WiFi, 4G LTE support</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Software Stack</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Operating System: Custom Linux distribution</li>
                      <li>Security: Real-time threat monitoring</li>
                      <li>Updates: Over-the-air (OTA) capability</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400">Maintenance Procedures</CardTitle>
                  <CardDescription>Regular maintenance and troubleshooting guides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">Regular Maintenance</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Monthly system diagnostics</li>
                      <li>Quarterly software updates</li>
                      <li>Annual hardware inspection</li>
                      <li>Backup procedures</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Troubleshooting Steps</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>System reset procedures</li>
                      <li>Network connectivity issues</li>
                      <li>Power system diagnostics</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="power" className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400">Power Management</CardTitle>
                  <CardDescription>Power system specifications and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">Power Sources</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Solar panel integration</li>
                      <li>Battery specifications</li>
                      <li>Shore power requirements</li>
                      <li>Generator compatibility</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Power Management Features</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Automated load balancing</li>
                      <li>Power consumption monitoring</li>
                      <li>Battery health tracking</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;