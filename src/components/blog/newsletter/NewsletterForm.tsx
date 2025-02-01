import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Attempting to submit email to Supabase:", email);
    
    try {
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
            duration: 5000,
          });
        } else {
          console.error("Non-duplicate error occurred:", error);
          toast({
            title: "❌ Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } else {
        console.log("Successfully stored email in Supabase:", email);
        toast({
          title: "✅ Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter.",
          duration: 5000,
          className: "bg-green-600 text-white",
        });
        setEmail("");
      }
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
  );
};

export default NewsletterForm;