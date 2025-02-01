import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import NewsletterHeader from "./newsletter/NewsletterHeader";
import NewsletterForm from "./newsletter/NewsletterForm";

const NewsletterSection = () => {
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

    return () => {
      console.log("Cleaning up subscription listener");
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <Card className="bg-gradient-to-r from-connectivity-bg to-connectivity-darkBg border-connectivity-accent/20 p-8 md:p-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <NewsletterHeader />
          <NewsletterForm />
        </div>
      </Card>
    </motion.section>
  );
};

export default NewsletterSection;