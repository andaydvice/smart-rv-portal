import { Battery } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PowerSourcesSection = () => {
  return (
    <AccordionItem value="sources" className="border-gray-700">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-[#60A5FA]" />
          <span className="text-[16px] leading-[24px] font-medium text-[#60A5FA] font-['Inter']">
            Understanding Your Power Sources
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-sm space-y-4 text-white">
        <p>Your Smart RV intelligently manages power from four sources to keep you comfortable on the road.</p>
        <p>The solar panels on your roof automatically generate electricity whenever daylight hits them, even on cloudy days.</p>
        <p>Your house batteries store this power so you can run appliances when boondocking or overnight.</p>
        <p>Shore power gives you unlimited electricity when plugged into a campground pedestal.</p>
        <p>Your generator serves as backup power, automatically starting when needed if you enable this feature.</p>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PowerSourcesSection;