import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Wifi, Settings, BookOpen } from "lucide-react";

const Troubleshooting = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Smart System Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 h-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <Settings className="h-8 w-8 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900">Smart System Integration</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p>Step-by-step tutorials for setting up and integrating various smart RV systems</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p>Compatibility charts for different smart devices and RV models</p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p>Troubleshooting flowcharts for common integration issues</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Connectivity Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 h-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
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
            </Card>
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