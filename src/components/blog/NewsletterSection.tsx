import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time subscription listener");
    const channel = supabase
      .channel('public:newsletter_subscribers')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'newsletter_subscribers'
        },
        (payload) => {
          console.log('New subscriber detected:', payload.new);
          toast({
            title: "🎉 New Newsletter Subscriber!",
            description: `${payload.new.email} just subscribed to our newsletter.`,
            duration: 5000,
            className: "bg-connectivity-accent text-white",
          });
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      console.log("Cleaning up subscription listener");
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Attempting to submit email to Supabase:", email);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;
      
      console.log("Successfully stored email in Supabase:", email);
      
      toast({
        title: "✅ Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        duration: 5000,
        className: "bg-green-600 text-white",
      });
      
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "❌ Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          <div className="max-w-xl mx-auto">
            <p className="text-[#E2E8FF] text-lg whitespace-nowrap overflow-hidden text-ellipsis px-4">
              Get the latest tech tips, travel guides, and smart RV solutions delivered to your inbox.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-connectivity-bg border-connectivity-accent/20 text-white placeholder:text-[#E2E8FF]/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-connectivity-accent text-white hover:bg-connectivity-accent/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </Card>
    </motion.section>
  );
};

export default NewsletterSection;