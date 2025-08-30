import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { NewsletterTitle } from "./newsletter/NewsletterTitle";
import { NewsletterForm } from "./newsletter/NewsletterForm";

const NewsletterSection = () => {
  const [subscriptionCount, setSubscriptionCount] = useState<number | null>(null);

  useEffect(() => {
    // Setting up real-time subscription listener
    
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
      // Cleaning up subscription listener
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

  return (
    <section className="py-12 bg-[#080F1F]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <NewsletterTitle subscriptionCount={subscriptionCount} />
          <NewsletterForm />
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;