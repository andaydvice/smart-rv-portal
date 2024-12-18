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
      <Card className="bg-gradient-to-b from-[#1B2028] to-[#151A22] border border-blue-400/20 shadow-lg shadow-blue-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-4xl font-light text-[#5B9BD5] drop-shadow-[0_0_10px_rgba(91,155,213,0.3)]">
            Connectivity Solutions
          </CardTitle>
          <CardDescription className="text-gray-400 text-lg">
            Comprehensive guide to maintaining strong internet connectivity on the road
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[#5B9BD5] text-xl mb-4">
                <Signal className="h-6 w-6 drop-shadow-[0_0_8px_rgba(91,155,213,0.3)]" />
                <h3 className="drop-shadow-[0_0_8px_rgba(91,155,213,0.3)]">Signal Boosting Solutions</h3>
              </div>
              <SignalBoostingSection />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[#5B9BD5] text-xl mb-4">
                <Wifi className="h-6 w-6 drop-shadow-[0_0_8px_rgba(91,155,213,0.3)]" />
                <h3 className="drop-shadow-[0_0_8px_rgba(91,155,213,0.3)]">Mobile Hotspot Comparison</h3>
              </div>
              <HotspotSection />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-[#5B9BD5] text-xl mb-4">
                <Laptop className="h-6 w-6 drop-shadow-[0_0_8px_rgba(91,155,213,0.3)]" />
                <h3 className="drop-shadow-[0_0_8px_rgba(91,155,213,0.3)]">Mobile Office Setup Tips</h3>
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