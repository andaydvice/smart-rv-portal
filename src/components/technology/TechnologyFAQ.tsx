
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const TechnologyFAQ = () => {
  const faqs = [
    {
      question: "What is smart RV technology?",
      answer: "Smart RV technology refers to systems and features that make recreational vehicles more convenient, automated, and easy to control. This includes everything from mobile apps for remote monitoring to integrated power management and security—all designed to enhance your comfort and peace of mind."
    },
    {
      question: "Can I control my RV with my phone?",
      answer: "Yes. Most smart RV systems include mobile applications that allow you to monitor and manage temperature, lighting, security, and even check your battery status from nearly anywhere with an internet connection."
    },
    {
      question: "How does the smart security system work?",
      answer: "The smart security system combines motion sensors, cameras, biometric locks, and 24/7 connectivity so you can monitor and secure your RV at all times. You receive instant alerts to your phone and can lock or unlock doors remotely."
    },
    {
      question: "Does smart power management help save energy?",
      answer: "Absolutely. Smart power management systems track your energy usage, automatically optimize for efficiency, and integrate with solar panels and advanced batteries to keep your RV powered longer while reducing waste."
    },
    {
      question: "Is it difficult to set up these systems?",
      answer: "Setup is designed to be user friendly with guided instructions. Most features can be configured within minutes using the intuitive onboard touchscreen or through the mobile app."
    },
    {
      question: "Can I get support if I run into issues?",
      answer: "Yes. Comprehensive support is available, with troubleshooting guides and live assistance to ensure your technology is always working as intended."
    }
  ];

  return (
    <section className="max-w-4xl mx-auto mb-16 bg-[#151A22] border border-[#1a202c]/60 rounded-3xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <HelpCircle className="w-7 h-7 text-blue-400 mr-3" />
        <h2 className="text-white text-3xl font-bold">Technology FAQ</h2>
      </div>
      
      <p className="text-gray-200 mb-8 text-lg max-w-2xl">
        Find answers to the most common questions about smart RV systems and features below.
      </p>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#080F1F]/30 rounded-lg overflow-hidden border border-[#1a202c]/40">
            <div className="px-4 py-3 bg-[#080F1F]/50 text-blue-400 text-lg font-semibold">
              {faq.question}
            </div>
            <div className="px-4 py-3 text-gray-200">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologyFAQ;
