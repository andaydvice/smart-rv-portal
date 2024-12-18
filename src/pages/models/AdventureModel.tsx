import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const adventureModels = [
  {
    category: "Off-Road Ready",
    models: [
      {
        name: "Trail Blazer X1",
        price: "$125,000",
        description: "All-terrain capability with luxury amenities",
        features: ["4x4 drivetrain", "Solar power system", "Satellite connectivity"]
      },
      {
        name: "Mountain Explorer",
        price: "$145,000",
        description: "Built for high-altitude adventures",
        features: ["Enhanced suspension", "Oxygen system", "Weather station"]
      }
    ]
  },
  {
    category: "Expedition Series",
    models: [
      {
        name: "Nomad Pro",
        price: "$165,000",
        description: "Extended range for long journeys",
        features: ["500-mile range", "Water purification", "Dual batteries"]
      },
      {
        name: "Safari Master",
        price: "$155,000",
        description: "Designed for wildlife photography tours",
        features: ["360° cameras", "Silent mode", "Observation deck"]
      }
    ]
  }
];

const AdventureModel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20"
      >
        <div className="container mx-auto px-4">
          <Link to="/models">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Models
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-8">Adventure Class RVs</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            {adventureModels.map((category, index) => (
              <AccordionItem 
                key={index} 
                value={`category-${index}`}
                className="bg-white/5 rounded-lg border border-white/10"
              >
                <AccordionTrigger className="px-6 text-white hover:text-blue-400">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6 pt-4">
                    {category.models.map((model, modelIndex) => (
                      <Card key={modelIndex} className="bg-white/5 border-white/10">
                        <CardHeader>
                          <CardTitle className="text-white">{model.name}</CardTitle>
                          <CardDescription className="text-blue-400">
                            Starting at {model.price}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-4">{model.description}</p>
                          <ul className="space-y-2">
                            {model.features.map((feature, featureIndex) => (
                              <li 
                                key={featureIndex}
                                className="text-gray-400 flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.main>
    </>
  );
};

export default AdventureModel;