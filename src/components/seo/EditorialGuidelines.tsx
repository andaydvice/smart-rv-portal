import React from 'react';
import { Shield, Users, Award, CheckCircle } from 'lucide-react';

const EditorialGuidelines: React.FC = () => {
  const guidelines = [
    {
      title: "Expert-Verified Content",
      description: "All technical information is reviewed by certified RV technicians and industry professionals with 10+ years of experience.",
      icon: CheckCircle
    },
    {
      title: "Real-World Testing",
      description: "Our recommendations are based on hands-on testing and real customer experiences, not just manufacturer specifications.",
      icon: Award
    },
    {
      title: "Transparency & Disclosure",
      description: "We clearly disclose affiliate partnerships and maintain editorial independence in all product recommendations.",
      icon: Shield
    },
    {
      title: "Community-Driven Reviews",
      description: "Customer feedback and community input play a crucial role in our content creation and product evaluations.",
      icon: Users
    }
  ];

  const trustSignals = [
    "Certified RV Industry Association Member",
    "ISO 27001 Information Security Certified",
    "BBB A+ Rating with 500+ Customer Reviews",
    "Featured in RV Magazine and Outdoor Life",
    "Partnership with Leading RV Manufacturers",
    "10+ Years of Industry Experience"
  ];

  return (
    <section className="py-16 bg-[#151A22]/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Commitment to Quality & Trust
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We maintain the highest editorial standards to provide you with accurate, 
              reliable, and actionable information for your RV journey.
            </p>
          </div>

          {/* Editorial Guidelines */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {guidelines.map((guideline, index) => {
              const IconComponent = guideline.icon;
              return (
                <div
                  key={index}
                  className="bg-[#091020] border border-gray-700 rounded-lg p-6 hover:border-[#5B9BD5]/50 transition-all duration-300"
                >
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-[#5B9BD5]/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-[#5B9BD5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {guideline.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Signals */}
          <div className="bg-[#091020] border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Industry Recognition & Certifications
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trustSignals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-[#151A22] rounded-lg border border-gray-600"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Process */}
          <div className="mt-12 bg-[#091020] border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Our Editorial Process
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B9BD5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5B9BD5] font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Research</h4>
                <p className="text-gray-400 text-sm">Comprehensive market analysis and product testing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B9BD5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5B9BD5] font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Expert Review</h4>
                <p className="text-gray-400 text-sm">Technical verification by certified professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B9BD5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5B9BD5] font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Community Input</h4>
                <p className="text-gray-400 text-sm">Real user feedback and experience validation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B9BD5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5B9BD5] font-bold text-xl">4</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Publication</h4>
                <p className="text-gray-400 text-sm">Final editorial review and quality assurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialGuidelines;