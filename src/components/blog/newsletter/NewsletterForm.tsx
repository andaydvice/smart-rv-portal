import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Email submission logging removed for production

      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        // Error handling for newsletter subscription
        
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            className: "bg-yellow-600 text-white",
          });
        } else {
          toast({
            title: "❌ Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        // Newsletter subscription successful
        toast({
          title: "✅ Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
          className: "bg-green-600 text-white",
        });
        setEmail("");
      }
    } catch (error: any) {
      // Error handling for newsletter subscription
      
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
  );
};