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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wifi, Antenna, Satellite, Router, Battery, Laptop, Cloud, WifiOff, Signal } from "lucide-react";

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
          <CardTitle className="text-2xl text-blue-400">Professional RV Connectivity Solutions</CardTitle>
          <CardDescription className="text-gray-300">
            Enterprise-grade connectivity solutions for the modern mobile workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="boosting" className="border-gray-700">
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                <div className="flex items-center gap-2">
                  <Antenna className="h-5 w-5" />
                  Signal Enhancement Systems
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-200 mb-4">Enterprise Signal Solutions</h4>
                  <div className="space-y-6">
                    <div className="border-b border-gray-700 pb-4">
                      <h5 className="text-blue-300 mb-2">WeBoost Drive X RV</h5>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Multi-carrier signal amplification up to 65dB gain</li>
                        <li>5G/4G LTE compatibility with all major carriers</li>
                        <li>MIMO technology support for enhanced throughput</li>
                        <li>Extended range external antenna system</li>
                      </ul>
                    </div>
                    <div className="border-b border-gray-700 pb-4">
                      <h5 className="text-blue-300 mb-2">Pepwave MAX Transit Duo</h5>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Dual-modem load balancing and failover</li>
                        <li>Advanced QoS and bandwidth management</li>
                        <li>Enterprise-grade VPN capabilities</li>
                        <li>Remote management interface</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-300 mb-2">Winegard ConnecT 2.0</h5>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Integrated 4G LTE and Wi-Fi systems</li>
                        <li>Automatic network switching capabilities</li>
                        <li>High-gain directional antenna array</li>
                        <li>Weather-resistant enclosure (IP67 rated)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hotspots" className="border-gray-700">
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                <div className="flex items-center gap-2">
                  <Router className="h-5 w-5" />
                  Mobile Gateway Solutions
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-blue-300">Device</TableHead>
                        <TableHead className="text-blue-300">Specifications</TableHead>
                        <TableHead className="text-blue-300">Optimal Use Case</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-gray-700">
                        <TableCell className="font-medium">Netgear Nighthawk M6</TableCell>
                        <TableCell>
                          <ul className="list-disc list-inside text-sm">
                            <li>5G mmWave support</li>
                            <li>2.5Gbps ethernet port</li>
                            <li>13-hour battery life</li>
                          </ul>
                        </TableCell>
                        <TableCell>High-bandwidth applications, video streaming</TableCell>
                      </TableRow>
                      <TableRow className="border-gray-700">
                        <TableCell className="font-medium">GL.iNet Beryl</TableCell>
                        <TableCell>
                          <ul className="list-disc list-inside text-sm">
                            <li>OpenWRT firmware</li>
                            <li>Multi-VPN protocols</li>
                            <li>Tor network support</li>
                          </ul>
                        </TableCell>
                        <TableCell>Security-focused deployments</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">MoFi 5500</TableCell>
                        <TableCell>
                          <ul className="list-disc list-inside text-sm">
                            <li>External MIMO antenna ports</li>
                            <li>Industrial-grade hardware</li>
                            <li>Advanced band selection</li>
                          </ul>
                        </TableCell>
                        <TableCell>Remote locations, industrial applications</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="office" className="border-gray-700">
              <AccordionTrigger className="text-blue-300 hover:text-blue-400">
                <div className="flex items-center gap-2">
                  <Laptop className="h-5 w-5" />
                  Professional Mobile Office Configuration
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Signal className="h-4 w-4 text-green-400" />
                      <h4 className="font-medium text-blue-200">Multi-Carrier Strategy</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Primary: Verizon (Band 13/66 coverage)</li>
                      <li>Secondary: AT&T (FirstNet compatibility)</li>
                      <li>Tertiary: T-Mobile (Band 71 for rural)</li>
                      <li>Load balancing configuration</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Antenna className="h-4 w-4 text-yellow-400" />
                      <h4 className="font-medium text-blue-200">RF Optimization</h4>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>MIMO antenna array installation</li>
                      <li>Signal amplification system</li>
                      <li>Cellular band optimization</li>
                      <li>RF interference mitigation</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Cloud className="h-4 w-4 text-blue-400" />
                    <h4 className="font-medium text-blue-200">Network Redundancy</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-blue-300 text-sm mb-2">Primary Connection</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Bonded cellular connections (400Mbps+)</li>
                        <li>SD-WAN traffic optimization</li>
                        <li>QoS implementation for critical services</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-blue-300 text-sm mb-2">Backup Systems</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Starlink Roam (100-200ms latency)</li>
                        <li>Local cache server configuration</li>
                        <li>Automated failover protocols</li>
                      </ul>
                    </div>
                  </div>
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