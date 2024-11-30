import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Wifi, Settings, ChevronDown, ChevronUp } from "lucide-react";

const Troubleshooting = () => {
  const tutorials = [
    {
      title: "Initial System Setup",
      content: [
        {
          subtitle: "Power System Configuration",
          steps: [
            "Connect the main power unit to your RV's electrical system",
            "Configure voltage settings based on your RV model",
            "Test backup power systems and generators",
            "Set up power monitoring through the smart app"
          ]
        },
        {
          subtitle: "Network Setup",
          steps: [
            "Install the primary router in a central location",
            "Configure WiFi settings and security protocols",
            "Set up guest network access",
            "Test connection strength throughout the RV"
          ]
        },
        {
          subtitle: "Device Integration",
          steps: [
            "Download and install the Smart RV companion app",
            "Connect smart thermostats and climate controls",
            "Pair lighting systems and motion sensors",
            "Configure entertainment systems and speakers"
          ]
        }
      ]
    },
    {
      title: "Device Compatibility",
      content: [
        {
          subtitle: "Smart Home Devices",
          compatibility: [
            { device: "Nest Thermostat", status: "Full Support", notes: "All features available" },
            { device: "Ring Security", status: "Partial Support", notes: "Video features require enhanced WiFi" },
            { device: "Philips Hue", status: "Full Support", notes: "Hub required for operation" },
            { device: "Smart Things", status: "Limited Support", notes: "Basic features only" }
          ]
        },
        {
          subtitle: "Entertainment Systems",
          compatibility: [
            { device: "Sonos Speakers", status: "Full Support", notes: "Mesh network recommended" },
            { device: "Apple TV", status: "Full Support", notes: "Requires stable internet" },
            { device: "Roku Devices", status: "Full Support", notes: "All features supported" },
            { device: "Amazon Fire TV", status: "Full Support", notes: "4K requires enhanced bandwidth" }
          ]
        }
      ]
    },
    {
      title: "Troubleshooting Guide",
      content: [
        {
          subtitle: "Network Issues",
          steps: [
            "Check physical connections and power to networking devices",
            "Verify router settings and WiFi configuration",
            "Test connection speed and signal strength",
            "Review device connection limits and bandwidth allocation"
          ],
          solutions: [
            "Reset network equipment if experiencing connectivity issues",
            "Update router firmware to latest version",
            "Adjust antenna positioning for optimal coverage",
            "Consider adding WiFi extenders for better coverage"
          ]
        },
        {
          subtitle: "Power Management",
          steps: [
            "Monitor battery levels and charging status",
            "Check circuit breaker and fuse status",
            "Verify solar panel connectivity and output",
            "Test backup power systems"
          ],
          solutions: [
            "Clean solar panels for optimal performance",
            "Replace weak or damaged batteries",
            "Update power management firmware",
            "Calibrate battery monitors"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative">
        <img 
          src="/lovable-uploads/a6746652-04f0-4f89-a55d-b241e7bd972a.png" 
          alt="Smart RV Interior"
          className="w-full h-[40vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Troubleshooting & Setup Guides
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Comprehensive guides and solutions for your Smart RV system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Accordion type="single" collapsible className="space-y-4">
            {tutorials.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`section-${index}`} className="bg-white/10 rounded-lg overflow-hidden border-none">
                  <AccordionTrigger className="px-6 py-4 text-white hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5" />
                      <span className="text-xl font-semibold">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white/5">
                    <div className="space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{item.subtitle}</h3>
                          {item.steps && (
                            <div className="space-y-2">
                              {item.steps.map((step, stepIdx) => (
                                <div key={stepIdx} className="flex items-start gap-3 text-gray-300">
                                  <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                  <p>{step}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          {item.compatibility && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {item.compatibility.map((comp, compIdx) => (
                                <div key={compIdx} className="bg-white/10 p-4 rounded-lg">
                                  <h4 className="font-medium text-white">{comp.device}</h4>
                                  <p className="text-sm text-blue-400">{comp.status}</p>
                                  <p className="text-sm text-gray-400">{comp.notes}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          {item.solutions && (
                            <div className="space-y-2">
                              <h4 className="text-white font-medium">Recommended Solutions:</h4>
                              {item.solutions.map((solution, solIdx) => (
                                <div key={solIdx} className="flex items-start gap-3 text-gray-300">
                                  <ArrowRight className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                  <p>{solution}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link to="/contact">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Need More Help? Contact Support <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Troubleshooting;