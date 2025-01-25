import React from "react";
import { Lightbulb, Thermometer, Radio, Home, Lock, Wifi } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CommandExample from "./CommandExample";

const features = [
  { icon: <Lightbulb />, title: "Lighting", content: "Smart lighting control throughout your RV" },
  { icon: <Thermometer />, title: "Climate Control", content: "Intelligent temperature and humidity management" },
  { icon: <Radio />, title: "Entertainment Systems", content: "Voice-controlled media and sound systems" },
  { icon: <Home />, title: "RV Setup and Breakdown", content: "Streamlined setup and parking procedures" },
  { icon: <Lock />, title: "Security and Monitoring", content: "Advanced security features and monitoring" },
  { icon: <Wifi />, title: "Smart Home Integration", content: "Connect with your existing smart home ecosystem" },
];

const FeaturesSection = () => {
  return (
    <section className="container px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">
        Voice Control Features
      </h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {features.map((feature, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-none bg-[#151B2E] rounded-lg overflow-hidden">
              <AccordionTrigger className="flex items-center gap-4 px-6 py-4 hover:no-underline hover:bg-[#1A1F2E]">
                <span className="text-[#3B82F6]">{feature.icon}</span>
                <span className="text-[#D3E4FD]">{feature.title}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-[#D3E4FD] pl-10">{feature.content}</p>
                <div className="mt-4 pl-10">
                  <CommandExample
                    command={`Set ${feature.title.toLowerCase()} to optimal`}
                    description={`Automatically adjust ${feature.title.toLowerCase()} settings based on conditions`}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FeaturesSection;