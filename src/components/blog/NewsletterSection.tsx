import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up real-time subscription listener");
    
    const channel = supabase
      .channel('newsletter_count')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'newsletter_subscribers'
        },
        () => {
          fetchSubscriptionCount();
        }
      )
      .subscribe();

    fetchSubscriptionCount();

    return () => {
      console.log("Cleaning up subscription listener");
      channel.unsubscribe();
    };
  }, []);

  const fetchSubscriptionCount = async () => {
    try {
      const { count } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact' });
      
      setSubscriptionCount(count || null);
    } catch (error) {
      console.error('Error fetching subscription count:', error);
      setSubscriptionCount(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      console.log("Attempting to submit email to Supabase:", email);

      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        console.log("Supabase error response:", error);
        
        // Check for duplicate email error (code 23505)
        if (error.code === '23505') {
          console.log("Duplicate email detected:", email);
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            className: "bg-yellow-600 text-white",
          });
        } else {
          console.error("Non-duplicate error occurred:", error);
          toast({
            title: "❌ Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        console.log("Successfully stored email in Supabase:", email);
        toast({
          title: "✅ Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
          className: "bg-green-600 text-white",
        });
        setEmail("");
      }
    } catch (error: any) {
      console.error('Error:', error);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[#080F1F]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Stay Updated with Smart RV Insights
            </h2>
            <p className="text-lg text-white/90">
              {subscriptionCount !== null 
                ? `Join ${subscriptionCount} subscribers receiving our latest updates on RV technology, travel tips, and smart living solutions.`
                : "Join our community receiving the latest updates on RV technology, travel tips, and smart living solutions."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[#00ffff]"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#00ffff] text-black hover:bg-[#00ffff]/80 px-8 py-2 rounded-full"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
