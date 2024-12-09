import { Book, Server, Eye, Bell } from "lucide-react";
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

const OverviewTab = () => {
  return (
    <Card className="bg-[#091020] border-gray-700">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Book className="w-4 h-4 text-[#60A5FA]" />
          </div>
          <CardTitle className="text-[1.75rem] font-medium text-[#60A5FA]">Smart RV System Guide</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-300">Core Systems Overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="core-systems" className="border-b-gray-700">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
                  Core Systems
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                The Central Control Unit (CCU) manages your RV's main operations. If you experience system wide issues, this is the first place to check.
              </p>
              <p>
                The Power Management System controls your RV's energy distribution. Monitor this through your control panel to prevent power issues.
              </p>
              <p>
                The Network System keeps all your smart features connected. A strong WiFi signal indicates everything is communicating properly.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="key-features" className="border-b-gray-700">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
                  Key Features to Monitor
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                The Mobile App provides remote access to your RV's systems. If connection issues occur, first verify your phone's WiFi connection to the RV.
              </p>
              <p>
                Cloud Services backup your settings and monitor system health. Check your internet connection if you receive sync errors.
              </p>
              <p>
                Smart Device Integration allows connection with various devices. Ensure compatible devices are within range and properly paired.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="system-alerts" className="border-b-gray-700">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
                  Common System Alerts
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-gray-300">
              <p>
                Power Alerts: Yellow warnings indicate preventive checks needed. Red alerts require immediate attention.
              </p>
              <p>
                Network Notifications: System will alert you to connection strength issues or disconnected devices.
              </p>
              <p>
                Updates Available: Regular system updates improve performance and add new features.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;