
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { OptimizedAffiliateGrid } from "@/components/affiliate/OptimizedAffiliateGrid";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ScheduleDemo = () => {
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/products', { replace: true });
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo Scheduled!",
      description: "We'll be in touch shortly to confirm your appointment.",
    });
    console.log("Form submitted:", { ...formData, date });
  };

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <title>Redirecting to Products</title>
      </Helmet>
      <div className="relative">
        <img
          src="/lovable-uploads/5ad3c360-419f-4662-8c19-3d5a3cffe23f.png"
          alt="Luxury Smart RV on mountain road"
          className="w-full h-[500px] object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        <div className="absolute top-4 left-4">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-white/80">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Experience the Future of Travel
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Schedule a personalized demo to explore our cutting-edge Smart RV features
              and discover how we're revolutionizing the luxury travel experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10 text-white"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 text-white"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="(555) 555-5555"
                    className="bg-white/5 border-white/10 text-white"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Preferred Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                          !date && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Additional Information
                </label>
                <Textarea
                  placeholder="Tell us about your interests and any specific features you'd like to learn more about..."
                  className="bg-white/5 border-white/10 text-white min-h-[100px]"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-white/90 py-6 text-lg font-medium rounded-full"
              >
                Schedule Your Demo
              </Button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <OptimizedAffiliateGrid
              title="Partner Consultations"
              subtitle="Schedule consultations with our trusted partners for specialized services"
              partners={[
                {
                  partner: 'goodsam',
                  title: 'Good Sam Expert Consultation',
                  description: 'Schedule technical consultations for RV systems, maintenance, and emergency preparedness.',
                  features: ['Technical expertise', 'System consultation', 'Emergency planning', 'Professional guidance']
                },
                {
                  partner: 'technorv',
                  title: 'TechnoRV System Setup',
                  description: 'Book professional consultation for smart RV system installation and configuration.',
                  features: ['System setup consultation', 'Installation guidance', 'Configuration support', 'Technical training']
                }
              ]}
              gridCols="2"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleDemo;
