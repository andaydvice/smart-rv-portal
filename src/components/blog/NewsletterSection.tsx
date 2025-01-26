import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const NewsletterSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
  };

  return (
    <section className="py-16 bg-[#091020]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-connectivity-bg to-connectivity-darkBg rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Smart RV
              </h2>
              <p className="text-[#E2E8FF]">
                Subscribe to our newsletter for the latest updates on RV technology, tips, and innovations.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-4 w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#131a2a] border-[#1a202c] text-white w-full md:w-80"
                required
              />
              <Button 
                type="submit"
                className="bg-connectivity-accent hover:bg-[#4B8FE3] text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;