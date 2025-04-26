
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/error/ErrorBoundary";

const FAQS = [
  {
    question: "What is smart RV technology?",
    answer:
      "Smart RV technology refers to systems and features that make recreational vehicles more convenient, automated, and easy to control. This includes everything from mobile apps for remote monitoring to integrated power management and security—all designed to enhance your comfort and peace of mind.",
  },
  {
    question: "Can I control my RV with my phone?",
    answer:
      "Yes. Most smart RV systems include mobile applications that allow you to monitor and manage temperature, lighting, security, and even check your battery status from nearly anywhere with an internet connection.",
  },
  {
    question: "How does the smart security system work?",
    answer:
      "The smart security system combines motion sensors, cameras, biometric locks, and 24/7 connectivity so you can monitor and secure your RV at all times. You receive instant alerts to your phone and can lock or unlock doors remotely.",
  },
  {
    question: "Does smart power management help save energy?",
    answer:
      "Absolutely. Smart power management systems track your energy usage, automatically optimize for efficiency, and integrate with solar panels and advanced batteries to keep your RV powered longer while reducing waste.",
  },
  {
    question: "Is it difficult to set up these systems?",
    answer:
      "Setup is designed to be user friendly with guided instructions. Most features can be configured within minutes using the intuitive onboard touchscreen or through the mobile app.",
  },
  {
    question: "Can I get support if I run into issues?",
    answer:
      "Yes. Comprehensive support is available, with troubleshooting guides and live assistance to ensure your technology is always working as intended.",
  },
];

// FAQ Content Component - Define this before using it
const FAQContent = () => (
  <Accordion type="single" collapsible className="space-y-3">
    {FAQS.map((faq) => (
      <AccordionItem key={faq.question} value={faq.question}>
        <AccordionTrigger className="text-blue-400 text-lg font-semibold hover:underline focus:underline">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-gray-200 text-base bg-[#080F1F]/50 rounded-b-2xl px-4 py-2">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

// Simple loading fallback
const LoadingFallback = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-10 w-full bg-[#151A22]/70" />
        <Skeleton className="h-20 w-full bg-[#151A22]/50" />
      </div>
    ))}
  </div>
);

export default function TechnologyFAQ() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section
      className="max-w-4xl mx-auto mb-16 bg-[#151A22] border border-[#1a202c]/60 rounded-3xl shadow-lg p-8"
      aria-labelledby="technology-faq-title"
    >
      <div className="flex items-center mb-6">
        <HelpCircle className="w-7 h-7 text-blue-400 mr-3" />
        <h2 id="technology-faq-title" className="text-white text-3xl font-bold">
          Technology FAQ
        </h2>
      </div>
      <p className="text-gray-200 mb-8 text-lg max-w-2xl">
        Find answers to the most common questions about smart RV systems and features below.
      </p>
      
      <ErrorBoundary>
        {isLoading ? <LoadingFallback /> : <FAQContent />}
      </ErrorBoundary>
    </section>
  );
}
