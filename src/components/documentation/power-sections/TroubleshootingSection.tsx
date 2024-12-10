import { AlertCircle } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TroubleshootingSection = () => {
  return (
    <AccordionItem value="troubleshooting" className="border-gray-700">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
            When Things Aren't Working Right
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-sm space-y-4 text-white">
        <p>If your batteries aren't charging from solar: First check if your panels are dirty – even light dust can reduce power by 30%.</p>
        <p>If you plug into shore power but have no electricity: Verify your power cord is fully inserted and locked at both ends.</p>
        <p>When your generator won't start automatically: Check that both the fuel tank is at least quarter full and the generator switch shows "Auto."</p>
        <p>For unexpectedly high power usage: Look for plugged-in devices you rarely use – even small items like phone chargers consume power continuously.</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default TroubleshootingSection;