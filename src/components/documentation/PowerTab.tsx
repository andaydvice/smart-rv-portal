import { Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import PowerSourcesSection from "./power-sections/PowerSourcesSection";
import SmartSystemSection from "./power-sections/SmartSystemSection";
import TroubleshootingSection from "./power-sections/TroubleshootingSection";
import ImportantInfoSection from "./power-sections/ImportantInfoSection";

const PowerTab = () => {
  return (
    <Card className="bg-[#091020] border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Zap className="w-4 h-4 text-[#60A5FA]" />
          </div>
          <CardTitle className="text-[1.75rem] font-medium text-[#60A5FA]">Smart RV Power Management</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-300">Power system specifications and optimization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <PowerSourcesSection />
          <SmartSystemSection />
          <TroubleshootingSection />
          <ImportantInfoSection />
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PowerTab;