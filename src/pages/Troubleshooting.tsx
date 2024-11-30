import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowRight, Wifi, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ContentSection {
  id: string;
  title: string;
  content: string[];
}

const Troubleshooting = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const sections: ContentSection[] = [
    {
      id: "tutorials",
      title: "Step-by-step tutorials",
      content: [
        "Initial system setup and configuration guide",
        "Network integration and device pairing walkthrough",
        "Software updates and maintenance procedures",
        "Customizing automation rules and schedules",
        "Voice control setup and commands reference"
      ]
    },
    {
      id: "compatibility",
      title: "Compatibility charts",
      content: [
        "Smart home device compatibility matrix",
        "RV model-specific integration guides",
        "Operating system and app version requirements",
        "Network hardware compatibility list",
        "Third-party integration possibilities"
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting flowcharts",
      content: [
        "Network connectivity issues resolution",
        "Device pairing problem diagnosis",
        "System performance optimization",
        "Error code reference and solutions",
        "Common integration challenges"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        <img 
          src="/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png" 
          alt="Smart RV Interior"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Troubleshooting Guides
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-8">
              <Settings className="h-8 w-8 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">Smart System Integration</h2>
            </div>

            <div className="space-y-6">
              {sections.map((section) => (
                <Collapsible
                  key={section.id}
                  open={openSections.includes(section.id)}
                  onOpenChange={() => toggleSection(section.id)}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">{section.title}</span>
                    {openSections.includes(section.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 space-y-3 bg-white"
                    >
                      {section.content.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-600">{item}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </motion.div>

          {/* Connectivity Solutions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <Wifi className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Connectivity Solutions</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <p>Guide to boosting internet and cellular signals in remote areas</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <p>Reviews and comparisons of mobile hotspots and signal boosters</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <p>Tips for creating a reliable mobile office setup</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Need personalized assistance? Our support team is ready to help.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Troubleshooting;