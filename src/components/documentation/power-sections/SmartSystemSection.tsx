import { CircuitBoard } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SmartSystemSection = () => {
  return (
    <AccordionItem value="system" className="border-gray-700">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <CircuitBoard className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
            How Your Smart Power System Works
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-sm space-y-4 text-white">
        <p>The system constantly monitors how much power each appliance uses and shows this on your dashboard in simple terms – like "Coffee Maker: 900 watts for 5 minutes."</p>
        <p>When multiple appliances run at once, the system prevents blown fuses by managing which ones can operate together.</p>
        <p>You'll receive clear notifications like "AC and Microwave cannot run together on 30-amp service" to prevent power issues.</p>
        <p>The battery monitor shows your power level just like a fuel gauge, making it easy to know when to recharge.</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SmartSystemSection;