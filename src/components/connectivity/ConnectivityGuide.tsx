import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { SignalBoostingSection } from "./SignalBoostingSection";
import { HotspotSection } from "./HotspotSection";
import { MobileOfficeSection } from "./MobileOfficeSection";
import { Wifi, Signal, Laptop } from "lucide-react";

const ConnectivityGuide = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="bg-gradient-to-b from-[#1B2028] to-[#000000] border-2 border-blue-400/40 shadow-xl shadow-blue-500/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-medium text-[#5B9BD5] drop-shadow-[0_0_30px_rgba(91,155,213,0.7)]">
            Connectivity Solutions
          </CardTitle>
          <CardDescription className="text-gray-400 text-lg drop-shadow-[0_0_25px_rgba(91,155,213,0.6)]">
            Comprehensive guide to maintaining strong internet connectivity on the road
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[#5B9BD5] text-2xl mb-4">
                <Signal className="h-6 w-6 animate-pulse drop-shadow-[0_0_20px_rgba(91,155,213,0.5)]" />
                <h3 className="drop-shadow-[0_0_30px_rgba(91,155,213,0.7)]">Signal Boosting Solutions</h3>
              </div>
              <SignalBoostingSection />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[#5B9BD5] text-2xl mb-4">
                <Wifi className="h-6 w-6 animate-pulse drop-shadow-[0_0_20px_rgba(91,155,213,0.5)]" />
                <h3 className="drop-shadow-[0_0_30px_rgba(91,155,213,0.7)]">Mobile Hotspot Comparison</h3>
              </div>
              <HotspotSection />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[#5B9BD5] text-2xl mb-4">
                <Laptop className="h-6 w-6 animate-pulse drop-shadow-[0_0_20px_rgba(91,155,213,0.5)]" />
                <h3 className="drop-shadow-[0_0_30px_rgba(91,155,213,0.7)]">Mobile Office Setup Tips</h3>
              </div>
              <MobileOfficeSection />
            </div>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConnectivityGuide;