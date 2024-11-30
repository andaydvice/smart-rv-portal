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
  Cpu, 
  Wifi, 
  Battery, 
  Shield, 
  Settings, 
  AlertTriangle,
  RefreshCw,
  Zap
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        {/* Initial Setup Process */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Initial Setup Process
          </h3>
          <div className="grid gap-4">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-200 mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                System Configuration
              </h4>
              <ol className="list-decimal pl-5 text-gray-300 space-y-3">
                <li>Connect main power unit to RV's electrical system</li>
                <li>Set voltage parameters (120V AC / 12V DC)</li>
                <li>Configure battery monitoring system</li>
                <li>Test backup power systems</li>
                <li>Calibrate power management settings</li>
              </ol>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-200 mb-4 flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Network Setup
              </h4>
              <ol className="list-decimal pl-5 text-gray-300 space-y-3">
                <li>Install primary router in central location</li>
                <li>Configure main WiFi network with WPA3 security</li>
                <li>Set up guest network with bandwidth limits</li>
                <li>Configure mesh network nodes</li>
                <li>Test connection throughout RV</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Device Compatibility Matrix */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Device Compatibility Matrix
          </h3>
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50">
                  <TableHead className="text-blue-300">Device Type</TableHead>
                  <TableHead className="text-blue-300">Protocol</TableHead>
                  <TableHead className="text-blue-300">Compatibility</TableHead>
                  <TableHead className="text-blue-300">Required Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-800/50">
                  <TableCell className="text-gray-300">Smart Thermostat</TableCell>
                  <TableCell className="text-gray-300">WiFi / ZigBee</TableCell>
                  <TableCell className="text-green-400">Full Support</TableCell>
                  <TableCell className="text-gray-300">v2.1+</TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-800/50">
                  <TableCell className="text-gray-300">Security System</TableCell>
                  <TableCell className="text-gray-300">Z-Wave</TableCell>
                  <TableCell className="text-yellow-400">Partial</TableCell>
                  <TableCell className="text-gray-300">v3.0+</TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-800/50">
                  <TableCell className="text-gray-300">Smart Lighting</TableCell>
                  <TableCell className="text-gray-300">ZigBee</TableCell>
                  <TableCell className="text-green-400">Full Support</TableCell>
                  <TableCell className="text-gray-300">v1.4+</TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-800/50">
                  <TableCell className="text-gray-300">Entertainment System</TableCell>
                  <TableCell className="text-gray-300">WiFi / BT</TableCell>
                  <TableCell className="text-green-400">Full Support</TableCell>
                  <TableCell className="text-gray-300">v4.2+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Common Error Codes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Error Codes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-200 mb-4 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                System Errors
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-red-400">ERR_001</span>
                  <span className="text-gray-300">Network Configuration Failed</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-red-400">ERR_002</span>
                  <span className="text-gray-300">Device Sync Error</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400">ERR_003</span>
                  <span className="text-gray-300">Power Management Issue</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h4 className="font-medium text-blue-200 mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Power Issues
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-yellow-400">PWR_001</span>
                  <span className="text-gray-300">Low Battery Warning</span>
                </div>
                <div className="flex justify-between text-sm border-b border-gray-700 pb-2">
                  <span className="text-yellow-400">PWR_002</span>
                  <span className="text-gray-300">Charging System Error</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-400">PWR_003</span>
                  <span className="text-gray-300">Power Supply Unstable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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