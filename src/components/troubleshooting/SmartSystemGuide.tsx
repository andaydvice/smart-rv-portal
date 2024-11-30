import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const SmartSystemGuide = () => {
  return (
    <Card className="bg-white/10 text-white mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-400">Smart System Integration Guide</CardTitle>
        <CardDescription className="text-gray-300">
          Complete setup and troubleshooting guide for your Smart RV systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-300">Initial Setup Process</h3>
          <div className="grid gap-4 pl-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-blue-200 mb-2">1. Power System Configuration</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Connect main power unit to RV's electrical system</li>
                <li>Set voltage parameters (120V AC / 12V DC)</li>
                <li>Configure battery monitoring system</li>
                <li>Test backup power systems</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-blue-200 mb-2">2. Network Setup</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Install primary router in central location</li>
                <li>Configure main WiFi network with WPA3 security</li>
                <li>Set up guest network with bandwidth limits</li>
                <li>Test connection throughout RV</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-300">Device Compatibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-blue-200 mb-3">Smart Home Devices</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Nest Thermostat</span>
                  <span className="text-green-400">Full Support</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Ring Security</span>
                  <span className="text-yellow-400">Partial Support</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Philips Hue</span>
                  <span className="text-green-400">Full Support</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-medium text-blue-200 mb-3">Entertainment Systems</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Sonos Speakers</span>
                  <span className="text-green-400">Full Support</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Apple TV</span>
                  <span className="text-green-400">Full Support</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Roku Devices</span>
                  <span className="text-green-400">Full Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400/10">
            View Complete Compatibility List <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartSystemGuide;