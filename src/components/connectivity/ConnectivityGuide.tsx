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
            <SignalBoostingSection />
            <HotspotSection />
            <MobileOfficeSection />
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConnectivityGuide;