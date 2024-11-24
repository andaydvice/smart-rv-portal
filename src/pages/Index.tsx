import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Car, Shield, Wifi, Battery, Navigation } from "lucide-react";

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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
            alt="Luxury RV Interior"
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
            Introducing Smart RV
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The Future of Travel
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience luxury and innovation in every journey
          </p>
          <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover-scale">
            Explore Models
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-secondary rounded-full">
              Features
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Intelligent Living on Wheels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every detail designed for the modern traveler
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

      {/* Models Section */}
      <section className="py-24 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white rounded-full">
              Models
            </span>
            <h2 className="text-4xl font-bold mb-4">Choose Your Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect Smart RV for your adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                  <p className="text-sm mb-4">{model.description}</p>
                  <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors">
                    Learn More
                  </button>
                </div>
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
              Contact
            </span>
            <h2 className="text-4xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-lg mb-8 opacity-80">
              Let's start your journey towards smarter travel
            </p>
            <button className="px-8 py-4 bg-white text-primary rounded-full font-medium hover-scale">
              Schedule a Demo
            </button>
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
];

const models = [
  {
    name: "Horizon Elite",
    description: "Luxury meets innovation in our flagship model",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
  },
  {
    name: "Voyager Pro",
    description: "Perfect balance of comfort and technology",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
  },
];

export default Index;