import { motion } from "framer-motion";
import { ArrowLeft, Book, Cpu, Wrench, Zap } from "lucide-react";
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
              className="mb-6 bg-blue-500/10 text-blue-400 border-blue-400 hover:bg-blue-400/20 hover:text-blue-300 font-bold text-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Troubleshooting
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-6">System Documentation</h1>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
                <Book className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
                <Cpu className="mr-2 h-4 w-4" />
                Technical
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
                <Wrench className="mr-2 h-4 w-4" />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="power" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold text-base">
                <Zap className="mr-2 h-4 w-4" />
                Power Systems
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="bg-gray-800/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-2xl">System Architecture</CardTitle>
                  <CardDescription className="text-blue-100 font-medium text-lg">Understanding the Smart RV's core systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-white">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Core Components</h3>
                    <p className="mb-4">
                      At the heart of our Smart RV lies the Central Control Unit (CCU), a sophisticated system that orchestrates all onboard operations with precision and reliability. This advanced component serves as the brain of your vehicle, ensuring seamless integration of all smart features.
                    </p>
                    <p className="mb-4">
                      The Power Management System represents the next evolution in RV energy control, delivering optimal power distribution while maximizing efficiency. It continuously monitors and adjusts power flow to ensure all systems receive exactly what they need, when they need it.
                    </p>
                    <p className="mb-4">
                      Our Network Infrastructure provides enterprise-grade connectivity throughout your RV, ensuring reliable communication between all smart systems. This robust framework supports both internal system operations and external connectivity needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Integration Points</h3>
                    <p className="mb-4">
                      The Mobile App Connectivity feature transforms your smartphone into a powerful remote control center, offering comprehensive system management from anywhere in the world. Through our intuitive interface, you can monitor and control every aspect of your RV's operation.
                    </p>
                    <p className="mb-4">
                      Our Cloud Services integration provides real-time data synchronization and backup, ensuring your settings and preferences are always secure and accessible. This service also enables advanced features like predictive maintenance and usage analytics.
                    </p>
                    <p>
                      Third-party Device Support extends the capabilities of your Smart RV through seamless integration with popular smart home devices and services. This open ecosystem approach ensures your RV can evolve with your needs and preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card className="bg-gray-800/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-2xl">Technical Specifications</CardTitle>
                  <CardDescription className="text-blue-100 font-medium text-lg">Detailed system specifications and requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-white">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Hardware Requirements</h3>
                    <p className="mb-4">
                      The Dual-core ARM processor powers our system with exceptional performance and energy efficiency. This advanced processor ensures smooth operation of all onboard systems while maintaining optimal power consumption.
                    </p>
                    <p className="mb-4">
                      With 4GB RAM minimum, the system provides ample memory for multitasking and running complex operations simultaneously. This generous memory allocation ensures responsive performance even under heavy loads.
                    </p>
                    <p className="mb-4">
                      The 64GB SSD storage offers quick access to system files and plenty of space for your personal data. This solid-state solution provides reliability and speed while withstanding the rigors of mobile use.
                    </p>
                    <p className="mb-4">
                      Dual-band WiFi with 4G LTE support ensures you stay connected wherever your journey takes you. This comprehensive connectivity solution adapts to available networks automatically.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Software Stack</h3>
                    <p className="mb-4">
                      Our Custom Linux distribution has been specifically engineered for RV operations, providing a stable and secure foundation for all system functions. This specialized operating system optimizes performance while minimizing resource usage.
                    </p>
                    <p className="mb-4">
                      Real-time threat monitoring actively protects your system from security risks, ensuring your data and privacy remain secure. This comprehensive security solution adapts to new threats as they emerge.
                    </p>
                    <p>
                      Over-the-air (OTA) update capability keeps your system current with the latest features and security patches. Updates are delivered seamlessly without interrupting your RV experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <Card className="bg-gray-800/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-2xl">Maintenance Procedures</CardTitle>
                  <CardDescription className="text-blue-100 font-medium text-lg">Regular maintenance and troubleshooting guides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-white">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Regular Maintenance</h3>
                    <p className="mb-4">
                      Monthly system diagnostics provide comprehensive health checks of all major systems. These automated assessments identify potential issues before they impact your travel experience.
                    </p>
                    <p className="mb-4">
                      Quarterly software updates deliver new features and optimizations to enhance your RV's capabilities. Each update undergoes rigorous testing to ensure compatibility and stability.
                    </p>
                    <p className="mb-4">
                      Annual hardware inspections maintain peak system performance through professional assessment of all physical components. These thorough checkups ensure long-term reliability of your investment.
                    </p>
                    <p className="mb-4">
                      Regular backup procedures protect your settings and personal data against unexpected events. Our automated backup system ensures your information is always secure and recoverable.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Troubleshooting Steps</h3>
                    <p className="mb-4">
                      System reset procedures are carefully designed to resolve issues while preserving your settings. These targeted reset options minimize disruption to your RV experience.
                    </p>
                    <p className="mb-4">
                      Network connectivity issues are addressed through our advanced diagnostic tools. These utilities help identify and resolve connection problems quickly and effectively.
                    </p>
                    <p>
                      Power system diagnostics ensure optimal energy distribution and battery health. Regular monitoring prevents power-related issues before they affect your journey.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="power" className="space-y-4">
              <Card className="bg-gray-800/90 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-2xl">Power Management</CardTitle>
                  <CardDescription className="text-blue-100 font-medium text-lg">Power system specifications and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-white">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Power Sources</h3>
                    <p className="mb-4">
                      Solar panel integration provides sustainable energy generation for extended off-grid adventures. Our advanced solar system maximizes power generation while minimizing environmental impact.
                    </p>
                    <p className="mb-4">
                      Battery specifications are optimized for long-term reliability and performance. Our battery system delivers consistent power while supporting rapid charging capabilities.
                    </p>
                    <p className="mb-4">
                      Shore power requirements are managed through intelligent power distribution systems. This ensures safe and efficient power usage when connected to external power sources.
                    </p>
                    <p className="mb-4">
                      Generator compatibility extends your power options with seamless integration of auxiliary power sources. Our system automatically manages generator operation for optimal efficiency.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Power Management Features</h3>
                    <p className="mb-4">
                      Automated load balancing ensures efficient power distribution across all systems. This intelligent feature prevents power overload while maintaining optimal performance.
                    </p>
                    <p className="mb-4">
                      Power consumption monitoring provides detailed insights into your energy usage patterns. This information helps optimize your power management strategy for maximum efficiency.
                    </p>
                    <p>
                      Battery health tracking extends the life of your power system through proactive maintenance alerts. Continuous monitoring ensures optimal battery performance throughout its lifecycle.
                    </p>
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
