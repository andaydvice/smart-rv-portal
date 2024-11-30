import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wifi, Signal, Laptop } from "lucide-react";

const ConnectivityGuide = () => {
  return (
    <Card className="bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-400">Connectivity Solutions</CardTitle>
        <CardDescription className="text-gray-300">
          Comprehensive guide to maintaining strong internet connectivity on the road
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <Wifi className="h-6 w-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-blue-200">Signal Boosting Solutions</h3>
                <ul className="mt-2 space-y-2 text-gray-300">
                  <li>• WeBoost Drive X RV: Best for cellular signal boosting</li>
                  <li>• Winegard ConnecT 2.0: Excellent for WiFi range extension</li>
                  <li>• Pepwave MAX Transit Duo: Professional-grade mobile router</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <Signal className="h-6 w-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-blue-200">Mobile Hotspot Comparison</h3>
                <div className="mt-2 space-y-3">
                  <div className="border-b border-white/10 pb-2">
                    <p className="text-blue-200">Netgear Nighthawk M6</p>
                    <p className="text-sm text-gray-300">Best overall performance, 5G capability</p>
                  </div>
                  <div className="border-b border-white/10 pb-2">
                    <p className="text-blue-200">GL.iNet Beryl</p>
                    <p className="text-sm text-gray-300">Best for privacy and security</p>
                  </div>
                  <div>
                    <p className="text-blue-200">MoFi 5500</p>
                    <p className="text-sm text-gray-300">Best for rural areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Laptop className="h-6 w-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-blue-200">Mobile Office Setup Tips</h3>
                <ul className="mt-2 space-y-2 text-gray-300">
                  <li>1. Use a dual-carrier approach (Verizon + AT&T)</li>
                  <li>2. Install a cellular antenna on the RV roof</li>
                  <li>3. Set up a mobile-optimized mesh network</li>
                  <li>4. Configure automatic failover between connections</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectivityGuide;