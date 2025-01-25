import React from "react";
import { Lightbulb, Thermometer, Radio, Home, Lock, Wifi } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CommandExample from "./CommandExample";

const features = [
  { icon: <Lightbulb size={24} />, title: "Lighting", content: "Smart lighting control throughout your RV" },
  { icon: <Thermometer size={24} />, title: "Climate Control", content: "Intelligent temperature and humidity management" },
  { icon: <Radio size={24} />, title: "Entertainment Systems", content: "Voice-controlled media and sound systems" },
  { icon: <Home size={24} />, title: "RV Setup and Breakdown", content: "Streamlined setup and parking procedures" },
  { icon: <Lock size={24} />, title: "Security and Monitoring", content: "Advanced security features and monitoring" },
  { icon: <Wifi size={24} />, title: "Smart Home Integration", content: "Connect with your existing smart home ecosystem" },
];

const FeaturesSection = () => {
  return (
    <section className="container px-4 py-16 bg-[#151B2E]">
      <h2 className="text-4xl font-semibold text-center mb-16 text-white">
        Voice Control Features
      </h2>
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="space-y-6">
          {features.map((feature, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-b border-[#2A2F3E] bg-transparent"
            >
              <AccordionTrigger 
                className="flex items-center gap-6 px-8 py-6 text-2xl font-normal text-white hover:no-underline group"
              >
                <span className="text-[#3B82F6] transition-transform group-data-[state=open]:rotate-0">
                  {feature.icon}
                </span>
                {feature.title}
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8">
                <p className="text-[#D3E4FD] text-xl pl-12 mb-6">{feature.content}</p>
                <div className="pl-12">
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