import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Car, Shield, Wifi, Battery, Navigation, 
  Tv, Utensils, Lock, Phone, Mic, 
  Sun, Leaf, MapPin, HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    });

    document.querySelectorAll(".fade-in-section").forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7"
            alt="Modern RV in mountain landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-4"
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
            Welcome to Smart RV
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Future of Travel
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience luxury and innovation with cutting-edge technology
          </p>
          <div className="flex gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="lg" className="bg-white text-black hover:bg-white/90">
                  Schedule Demo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule a Demo</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <p>Contact our team to schedule a personalized demo of our Smart RV features.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white bg-black/40 hover:bg-white/10"
            >
              Explore Models
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Overview */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-secondary rounded-full">
              Smart Features
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Intelligent Living on Wheels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of comfort and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-lg hover-scale"
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-24 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white rounded-full">
              Smart Systems
            </span>
            <h2 className="text-4xl font-bold mb-4">Cutting-Edge Technology</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced systems for a smarter, more comfortable journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-white p-6"
              >
                <system.icon className="w-16 h-16 mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">{system.name}</h3>
                <p className="text-gray-600 mb-4">{system.description}</p>
                <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-secondary rounded-full">
              Eco-Friendly
            </span>
            <h2 className="text-4xl font-bold mb-4">Sustainable Innovation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leading the way in eco-friendly RV technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sustainability.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-secondary/50 p-6 rounded-lg"
              >
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in-section">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
              Get Started
            </span>
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Journey?</h2>
            <p className="text-lg mb-8 opacity-80">
              Connect with our team to learn more about Smart RV technology
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90">
                Contact Sales
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: Car,
    title: "Smart Navigation",
    description: "AI-powered route planning and real-time traffic updates",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "24/7 monitoring and smart lock system for peace of mind",
  },
  {
    icon: Wifi,
    title: "Always Connected",
    description: "High-speed internet and smart device integration",
  },
  {
    icon: Battery,
    title: "Power Management",
    description: "Solar integration and intelligent energy distribution",
  },
  {
    icon: Navigation,
    title: "Autopilot Ready",
    description: "Advanced driver assistance for safer journeys",
  },
  {
    icon: Tv,
    title: "Entertainment Suite",
    description: "Smart TV and premium audio systems",
  },
];

const systems = [
  {
    icon: Lock,
    name: "Smart Security",
    description: "Advanced security systems with remote monitoring and smart locks",
  },
  {
    icon: Phone,
    name: "Remote Control",
    description: "Control all RV systems from your smartphone",
  },
  {
    icon: Mic,
    name: "Voice Control",
    description: "Hands-free control with virtual assistant integration",
  },
  {
    icon: Utensils,
    name: "Smart Kitchen",
    description: "Connected appliances with remote monitoring",
  },
];

const sustainability = [
  {
    icon: Sun,
    title: "Solar Power",
    description: "Integrated solar panels for sustainable energy",
  },
  {
    icon: Leaf,
    title: "Eco-Materials",
    description: "Sustainable materials and manufacturing processes",
  },
  {
    icon: MapPin,
    title: "Green Routes",
    description: "Eco-friendly route planning and charging stations",
  },
  {
    icon: HeartHandshake,
    title: "Carbon Neutral",
    description: "Commitment to reducing environmental impact",
  },
];

export default Index;
