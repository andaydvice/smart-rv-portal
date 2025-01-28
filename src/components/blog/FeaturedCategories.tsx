import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Cpu, Wifi, Battery, Navigation } from "lucide-react";
import { LampDemo } from "@/components/ui/lamp";

const categories = [
  {
    title: "Smart Systems",
    icon: <Cpu className="w-6 h-6 text-connectivity-accent" />,
    description: "Automation and control systems for modern RVs"
  },
  {
    title: "Connectivity",
    icon: <Wifi className="w-6 h-6 text-connectivity-accent" />,
    description: "Stay connected on the road with reliable internet solutions"
  },
  {
    title: "Power Solutions",
    icon: <Battery className="w-6 h-6 text-connectivity-accent" />,
    description: "Solar, battery, and sustainable power systems"
  },
  {
    title: "Navigation Tech",
    icon: <Navigation className="w-6 h-6 text-connectivity-accent" />,
    description: "Advanced navigation and route planning tools"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="space-y-8">
      <LampDemo />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-connectivity-darkBg border-connectivity-accent/20 p-6 hover:border-connectivity-accent/40 transition-colors cursor-pointer">
              <div className="space-y-4">
                <div className="p-2 rounded-full bg-connectivity-bg inline-block">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                <p className="text-[#E2E8FF] text-sm">{category.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;