import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const NewsletterSection = () => {
  console.log('Rendering NewsletterSection component');
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  return (
    <section className="py-24 bg-[#080F1F]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#151A22] to-[#1a202c] rounded-2xl p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-white mb-4 animate-fade-up">
                Stay Updated with Smart RV
              </h2>
              <p className="text-[#E2E8FF] animate-fade-up opacity-90" style={{ animationDelay: '0.2s' }}>
                Join our community and receive the latest insights on RV technology, travel tips, and innovations delivered straight to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#131a2a]/80 border-[#1a202c] text-white w-full sm:w-80 focus:ring-2 focus:ring-[#5B9BD5] transition-all"
                required
              />
              <Button 
                type="submit"
                className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white transition-colors whitespace-nowrap px-6"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;