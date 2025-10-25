
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { scrollToTop } from "@/utils/scrollToTop";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Helmet } from "react-helmet-async";
import { faqSchema } from "@/components/seo/schemas";
import { Phone, Mail, Clock, MapPin, HelpCircle, MessageCircle, Calendar, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { toast } = useToast();

  // Scroll to top on component mount
  useEffect(() => {
    scrollToTop();
  }, []);

  const contactFAQs = [
    {
      question: "What's the best way to contact Smart RV Technology?",
      answer: "For quickest response, use our online contact form above or call our main office during business hours (Monday-Friday 9 AM - 6 PM EST). For technical support, email support@smartrvtech.com. For sales inquiries, call our sales team directly at 1-800-SMART-RV. We respond to all inquiries within 24 hours on business days."
    },
    {
      question: "What are your customer service hours?",
      answer: "Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM Eastern Time. Technical support is available Monday-Saturday 8:00 AM to 8:00 PM EST. For after-hours emergencies with installed systems, our emergency hotline (available to existing customers) operates 24/7."
    },
    {
      question: "How quickly will I receive a response to my inquiry?",
      answer: "We aim to respond to all inquiries within 24 hours during business days. Sales inquiries typically receive responses within 4-6 hours. Technical support requests are prioritized by urgency - emergency issues receive immediate attention, while general questions are answered within 24 hours. Weekend submissions are answered on the next business day."
    },
    {
      question: "Can I schedule a consultation to discuss my RV needs?",
      answer: "Yes! We offer free 30-minute consultation calls to discuss your RV, lifestyle, and technology needs. Use our contact form and select 'Schedule Consultation' as your inquiry type, or call our sales team directly. We can schedule in-person consultations for local customers or virtual consultations via video call for remote customers."
    },
    {
      question: "Do you offer on-site visits or assessments?",
      answer: "Yes, we provide on-site RV assessments for customers within our service areas (major metro areas across the US). For a small fee (credited toward installation if you proceed), our technicians will visit your location, assess your RV, and provide detailed recommendations. Virtual assessments via video call are free."
    },
    {
      question: "What information should I include in my inquiry?",
      answer: "To help us assist you better, please include: your RV type and model year, specific technology interests or concerns, your typical travel style (weekend, full-time, seasonal), budget range if applicable, and preferred contact method. The more details you provide, the more accurate and helpful our response will be."
    },
    {
      question: "Can I request a quote through the contact form?",
      answer: "Yes! Select 'Request Quote' as your inquiry type and provide details about your RV and desired features. We'll respond with a preliminary estimate within 1 business day. For accurate quotes, we recommend scheduling a consultation or on-site assessment."
    },
    {
      question: "Do you provide technical support for existing customers?",
      answer: "Yes, all customers receive comprehensive technical support. Basic support is included with all installations. Premium support plans offer priority response, extended hours, and remote troubleshooting. Contact our support team at support@smartrvtech.com or call our technical support line."
    },
    {
      question: "How do I report an issue with my installed system?",
      answer: "For technical issues, contact our support team immediately via phone or email. Provide your customer ID, system details, and description of the issue. Emergency issues (system failures, safety concerns) should be reported to our 24/7 emergency hotline. We'll schedule service or provide remote troubleshooting as appropriate."
    },
    {
      question: "Can I speak with a salesperson about financing options?",
      answer: "Absolutely! Our sales team is well-versed in all financing options, including 0% APR plans, extended payment options, and special offers. Call our sales line or request a callback through the contact form. We'll explain all options and help you find the best financing solution."
    },
    {
      question: "Do you have a physical location I can visit?",
      answer: "We have showrooms and service centers in major cities across the United States. Our main headquarters is in [Location]. Contact us to find the nearest location and schedule a visit. We recommend calling ahead to ensure a specialist is available for your specific needs."
    },
    {
      question: "How do I provide feedback about my service experience?",
      answer: "We value customer feedback! You can submit feedback through our contact form, email feedback@smartrvtech.com, or call our customer service line. Positive experiences can be shared via online reviews (Google, Yelp, RV forums). All feedback is reviewed by management and used to improve our services."
    },
    {
      question: "Can I email my questions instead of using the contact form?",
      answer: "Yes! Email us at: General inquiries - info@smartrvtech.com, Sales - sales@smartrvtech.com, Technical support - support@smartrvtech.com, Billing - billing@smartrvtech.com, or Partnerships - partners@smartrvtech.com. While we accept email, the contact form helps route inquiries faster to the appropriate team."
    },
    {
      question: "What if I need emergency assistance while traveling?",
      answer: "Existing customers with installed systems can call our 24/7 emergency support hotline (number provided at installation). For urgent technical issues, we provide remote troubleshooting and can arrange emergency service through our nationwide partner network. Emergency support is included with all Professional and Premium packages."
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer: "To cancel or reschedule, contact us at least 24 hours in advance via phone or email. Include your appointment confirmation number and preferred new date/time. We understand plans change - we'll work with you to find a convenient alternative. Last-minute cancellations may incur rescheduling fees."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Smart RV Technology | Support, Sales & Consultations</title>
        <meta name="description" content="Contact Smart RV Technology for expert support, sales inquiries, and free consultations. Available Mon-Fri 9AM-6PM EST. 24/7 emergency support for customers. Schedule consultation today." />
        <meta name="keywords" content="contact smart RV, RV technology support, RV consultation, RV sales inquiry, technical support, schedule consultation, RV questions" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin + '/contact' : ''} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema(contactFAQs))}
        </script>
      </Helmet>
      {/* REMOVED: Extra Navbar component that was causing duplication */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-grow pt-20 relative"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/7d42772e-e96c-45cd-9a40-5e59be1c0a60.png"
            alt="Luxury Smart RV in mountain landscape"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-black/80 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Contact Smart RV Technology</h1>
            <p className="text-xl text-white/90 mb-4">
              Get expert advice, schedule consultations, or request support from our team of RV technology specialists.
            </p>
            <p className="text-lg text-white/80">
              Whether you're exploring smart RV upgrades, need technical assistance, or want to discuss pricing options, we're here to help. Our knowledgeable team responds to all inquiries within 24 hours during business days.
            </p>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <Phone className="w-8 h-8 text-[#5B9BD5] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-white/80 text-sm mb-2">Sales: 1-800-SMART-RV</p>
              <p className="text-white/80 text-sm">Support: 1-800-RV-SUPPORT</p>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <Mail className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-white/80 text-sm mb-2">info@smartrvtech.com</p>
              <p className="text-white/80 text-sm">support@smartrvtech.com</p>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <Clock className="w-8 h-8 text-[#F59E0B] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Hours</h3>
              <p className="text-white/80 text-sm mb-2">Mon-Fri: 9 AM - 6 PM EST</p>
              <p className="text-white/80 text-sm">24/7 Emergency Support</p>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <Calendar className="w-8 h-8 text-[#8B5CF6] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Consultation</h3>
              <p className="text-white/80 text-sm mb-2">Free 30-min calls</p>
              <p className="text-white/80 text-sm">Virtual & in-person</p>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-3xl font-bold text-white mb-6 text-center"
          >
            Send Us a Message
          </motion.h2>
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit} 
            className="space-y-6 bg-black/10 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl text-left"
          >
            <div className="text-sm text-white/80 mb-4 text-left">* Required</div>
            <div className="space-y-4">
              <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1 text-left">Name * </label>
              <Input 
                id="name" 
                className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:bg-white/15 transition-all" 
                required 
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1 text-left">Email * </label>
              <Input 
                id="email" 
                type="email" 
                className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:bg-white/15 transition-all" 
                required 
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1 text-left">Message * </label>
              <Textarea 
                id="message" 
                className="bg-white/10 border-white/20 text-white min-h-[150px] placeholder-white/40 focus:border-white/40 focus:bg-white/15 transition-all" 
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-white/90 text-black hover:bg-white transition-all duration-300 shadow-lg"
            >
              Send Message
            </Button>
          </motion.form>

          {/* Why Contact Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How We Can Help</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <MessageCircle className="w-8 h-8 text-[#5B9BD5] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Sales & Product Inquiries</h3>
                <p className="text-white/80 mb-4">
                  Explore our smart RV packages, get product recommendations, discuss pricing options, and learn about financing. Our sales team helps you choose the perfect technology solution for your RV and lifestyle.
                </p>
                <Link to="/pricing" className="text-[#5B9BD5] hover:text-[#4A8AC4] transition-colors">
                  View Pricing →
                </Link>
              </div>

              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <Headphones className="w-8 h-8 text-[#10B981] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Technical Support</h3>
                <p className="text-white/80 mb-4">
                  Get help with installed systems, troubleshoot issues, schedule maintenance, or report problems. Our certified technicians provide comprehensive support for all Smart RV technology installations.
                </p>
                <Link to="/troubleshooting" className="text-[#10B981] hover:text-[#0EA471] transition-colors">
                  View Troubleshooting →
                </Link>
              </div>

              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <Calendar className="w-8 h-8 text-[#F59E0B] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Free Consultations</h3>
                <p className="text-white/80 mb-4">
                  Schedule a free 30-minute consultation to discuss your RV, technology needs, and budget. We offer virtual video consultations or in-person assessments for local customers.
                </p>
                <Link to="/tools/readiness-assessment" className="text-[#F59E0B] hover:text-[#E08E09] transition-colors">
                  Assessment Tool →
                </Link>
              </div>

              <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <MapPin className="w-8 h-8 text-[#8B5CF6] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">On-Site Services</h3>
                <p className="text-white/80 mb-4">
                  Request on-site RV assessments, installation scheduling, or service appointments. We serve major metro areas nationwide with certified installation teams and mobile support units.
                </p>
                <Link to="/products" className="text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                  View Services →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Comprehensive FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-16 mb-12"
          >
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-[#5B9BD5]" />
                <h2 className="text-3xl font-bold text-white">Contact & Support FAQs</h2>
              </div>
              <p className="text-white/80 text-lg mb-8">
                Common questions about contacting our team, response times, consultations, and support services.
              </p>

              <div className="space-y-6">
                {contactFAQs.map((faq, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Related Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Explore Related Resources</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/pricing" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B9BD5] rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">Pricing & Packages</h4>
                <p className="text-white/70 text-sm">View our smart RV technology packages and pricing</p>
              </Link>
              <Link to="/features" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B9BD5] rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">Smart Features</h4>
                <p className="text-white/70 text-sm">Explore all available RV technology features</p>
              </Link>
              <Link to="/troubleshooting" className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B9BD5] rounded-lg p-4 transition-all">
                <h4 className="text-white font-semibold mb-2">Support Center</h4>
                <p className="text-white/70 text-sm">Find troubleshooting guides and help articles</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Contact;
