import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Bluetooth,
  BluetoothOff,
  Wifi,
  WifiOff,
  Power,
  Settings,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Cog,
  DollarSign,
  Zap,
  Tool
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SmartSystemGuide = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-400">Smart System Integration Guide</CardTitle>
        <CardDescription className="text-gray-300">
          Complete setup and troubleshooting guide for your Smart RV systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Accordion type="single" collapsible className="space-y-4">
          {/* Bluetooth Connectivity Section */}
          <AccordionItem value="bluetooth" className="border-gray-700">
            <AccordionTrigger className="text-blue-300 hover:text-blue-400">
              <div className="flex items-center gap-2">
                <Bluetooth className="h-5 w-5" />
                Bluetooth Connectivity
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <DollarSign className="h-4 w-4" />
                  <span>Cost Range: $50-200 for premium adapters and boosters</span>
                </div>
                <div className="flex items-center gap-2 text-green-200 mb-3">
                  <Zap className="h-4 w-4" />
                  <span>Power Usage: Very Low (0.5-1W when active)</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-200 mb-4">
                  <Tool className="h-4 w-4" />
                  <span>Installation: DIY-friendly, plug-and-play setup</span>
                </div>
                <h4 className="font-medium text-blue-200 mb-2">Common Issues</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Device not appearing in pairing list</li>
                  <li>Connection drops frequently</li>
                  <li>Audio quality issues</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium text-blue-200 mb-2">Solutions</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Ensure Bluetooth is enabled on both devices</li>
                  <li>Clear existing paired devices list</li>
                  <li>Restart both devices</li>
                  <li>Update device firmware if available</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Software Reset Section */}
          <AccordionItem value="software" className="border-gray-700">
            <AccordionTrigger className="text-blue-300 hover:text-blue-400">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Software Troubleshooting
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <DollarSign className="h-4 w-4" />
                  <span>Cost Range: Free to $299 for premium software licenses</span>
                </div>
                <div className="flex items-center gap-2 text-green-200 mb-3">
                  <Zap className="h-4 w-4" />
                  <span>Power Usage: Varies by device (2-5W average)</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-200 mb-4">
                  <Tool className="h-4 w-4" />
                  <span>Installation: DIY for basic updates, Professional for system-wide changes</span>
                </div>
                <h4 className="font-medium text-blue-200 mb-2">App Data Management</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Clear app cache</li>
                  <li>Force stop application</li>
                  <li>Clear app data (Note: This will reset all settings)</li>
                  <li>Reinstall app if issues persist</li>
                </ol>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium text-blue-200 mb-2">Control Tablet Reset</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Perform soft reset (hold power button for 10 seconds)</li>
                  <li>Check for system updates</li>
                  <li>Factory reset as last resort</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Power Management Section */}
          <AccordionItem value="power" className="border-gray-700">
            <AccordionTrigger className="text-blue-300 hover:text-blue-400">
              <div className="flex items-center gap-2">
                <Power className="h-5 w-5" />
                Power System Diagnostics
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <DollarSign className="h-4 w-4" />
                  <span>Cost Range: $500-2,500 for power system components</span>
                </div>
                <div className="flex items-center gap-2 text-green-200 mb-3">
                  <Zap className="h-4 w-4" />
                  <span>Power Usage: System dependent (50-200W peak)</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-200 mb-4">
                  <Tool className="h-4 w-4" />
                  <span>Installation: Professional installation recommended</span>
                </div>
                <h4 className="font-medium text-blue-200 mb-2">Converter Testing</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Test output voltage (should be 13.6-14.4V DC)</li>
                  <li>Check for unusual noise or vibration</li>
                  <li>Inspect cooling fan operation</li>
                  <li>Verify proper grounding</li>
                </ol>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium text-blue-200 mb-2">Circuit Protection</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Locate main circuit breaker panel</li>
                  <li>Check for tripped breakers</li>
                  <li>Inspect fuse box for blown fuses</li>
                  <li>Test GFCI outlets</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Remote Connectivity Section */}
          <AccordionItem value="remote" className="border-gray-700">
            <AccordionTrigger className="text-blue-300 hover:text-blue-400">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Remote Area Connectivity
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-blue-200 mb-3">
                  <DollarSign className="h-4 w-4" />
                  <span>Cost Range: $300-1,500 for boosters and antennas</span>
                </div>
                <div className="flex items-center gap-2 text-green-200 mb-3">
                  <Zap className="h-4 w-4" />
                  <span>Power Usage: 10-30W for signal boosters</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-200 mb-4">
                  <Tool className="h-4 w-4" />
                  <span>Installation: Professional recommended for optimal performance</span>
                </div>
                <h4 className="font-medium text-blue-200 mb-2">Signal Enhancement</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Install cellular signal booster</li>
                  <li>Use directional antenna for better reception</li>
                  <li>Consider satellite internet options</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h4 className="font-medium text-blue-200 mb-2">Connectivity Tips</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Park in elevated locations when possible</li>
                  <li>Use multiple carriers for redundancy</li>
                  <li>Monitor data usage and speeds</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-8">
          <Button 
            variant="outline" 
            className="bg-blue-500/10 text-blue-400 border-blue-400 hover:bg-blue-400/20"
          >
            View Complete System Documentation
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSystemGuide;