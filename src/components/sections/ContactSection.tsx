
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ContactSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/38c0f49c-f4c1-4849-a734-c74fe938c2c6.png"
          alt="Smart RV and tablet showing interface"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080F1F] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mt-32">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Journey?
          </h2>
          <p className="text-white/80 mb-8">
            Connect with our team to learn more about Smart RV technology and begin your luxury travel experience
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/schedule-demo">
              <Button size="lg" className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white">
                Request a Demo
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
