import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <Card className="bg-gradient-to-r from-connectivity-bg to-connectivity-darkBg border-connectivity-accent/20 p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="p-3 rounded-full bg-connectivity-accent/10 inline-block">
            <Mail className="w-6 h-6 text-connectivity-accent" />
          </div>
          
          <h2 className="text-3xl font-semibold text-white">
            Stay Updated with Smart RV News
          </h2>
          
          <p className="text-[#E2E8FF] text-lg">
            Get the latest tech tips, travel guides, and smart RV solutions delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-connectivity-bg border-connectivity-accent/20 text-white placeholder:text-[#E2E8FF]/60"
            />
            <Button className="bg-connectivity-accent text-white hover:bg-connectivity-accent/80">
              Subscribe
            </Button>
          </div>
        </div>
      </Card>
    </motion.section>
  );
};

export default NewsletterSection;