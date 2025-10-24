
import React from "react";
import { Helmet } from "react-helmet-async";
import { faqSchema } from "@/components/seo/schemas";

const TechnologyFAQ = () => {
  const faqs = [
    // General RV Technology
    {
      question: "What is smart RV technology?",
      answer: "Smart RV technology refers to integrated systems that make recreational vehicles more convenient, automated, and easy to control. This includes mobile apps for remote monitoring, integrated power management, security, climate control, and internet connectivity—all designed to enhance comfort and peace of mind. Currently, 93% of Americans own at least one smart home device, and this technology is rapidly expanding into the RV market (Source: Smart Home Survey 2024)."
    },
    {
      question: "Can I control my RV with my phone?",
      answer: "Yes. Modern smart RV systems include mobile applications that allow you to monitor and manage temperature, lighting, security, and battery status from anywhere with internet connection. Over 80% of security camera users appreciate remote monitoring via mobile apps, and the smart home security market is growing from $33.9 billion (2024) to projected $82.1 billion by 2030 (Source: SafeHome.org, Grand View Research 2024)."
    },

    // Power & Solar
    {
      question: "How much solar power do I need for my RV?",
      answer: "RVs consume 5-50 kWh per day depending on weather conditions, with air conditioning increasing usage by 150-300%. Modern monocrystalline solar panels achieve 20-25% efficiency, and MPPT controllers extract 15-30% more power than PWM controllers. A properly sized system with 400-800W of solar panels can support most RV needs, with costs down 90% since 2010 to an average of $0.31/W (Source: Roam Lab, Hydro Solar, Integrate Sun 2025)."
    },
    {
      question: "What's the difference between lithium and lead-acid RV batteries?",
      answer: "Lithium batteries last 10+ years with 3,000-5,000 cycles at 95%+ efficiency, compared to lead-acid batteries with 2-5 years lifespan, 300-1,000 cycles, and 80-85% efficiency. Lithium batteries provide 10x the cycle life and can discharge 80-100% without damage, while lead-acid lifespan is reduced below 50% discharge. With daily cycling, lithium batteries last 14+ years vs. less than 2 years for lead-acid (Source: RV LIFE, Battle Born, Flux Power, RELiON 2024)."
    },
    {
      question: "How much power does RV air conditioning use?",
      answer: "The most common 13,500 BTU air conditioner uses approximately 1,350 watts running (1,500-1,800W range), with startup surge of 2,700-3,000 watts—that's 2-3x normal operation. Running 12 hours daily consumes 15.6 kWh. Average RV AC EER rating is 6.0 (half the legal minimum for residential systems), though high-efficiency models offer 25-40% better performance (Source: RV With Tito, Renogy, Jackery, Furrion 2024)."
    },
    {
      question: "Can solar panels power my RV air conditioner?",
      answer: "Yes, but it requires a substantial system. A 13,500 BTU AC uses 1,350W running, so you'd need at least 1,500-2,000W of solar panels (accounting for efficiency losses) plus a properly sized battery bank for startup surge (2,700-3,000W). RVs equipped with properly sized battery banks, power inverters, and solar arrays can run high-efficiency air conditioners for several hours, making off-grid AC increasingly viable in 2024 (Source: EcoFlow, Jackery 2024)."
    },

    // Climate Control
    {
      question: "How efficient are RV furnaces compared to home furnaces?",
      answer: "RV propane furnaces operate at 60-75% efficiency (commonly 70% baseline) compared to 95%+ for residential gas furnaces, with up to 35% heat loss through exhaust. Average RV furnaces range from 20,000-50,000 BTUs. In mild winter (65°F setting): 1-2 gallons propane per night. In extreme cold (0°F): a 30 lb tank lasts less than 3 days on a 30 ft RV. Electric space heaters are 100% efficient, making them cost-effective when shore power is available (Source: RVshare, The RV Geeks, Let's RV 2024)."
    },
    {
      question: "Do smart thermostats really save money in an RV?",
      answer: "Yes. Smart thermostats can save 10-15% on electric bills through automated scheduling when you're away. Modern RV thermostats use 12-volt DC power (vs. 24-volt AC residential) with WiFi and Bluetooth connectivity for remote monitoring of temperature, humidity, and even fridge temperatures from anywhere globally (Source: RVshare, Micro-Air, WalTech, Jackson Systems 2024)."
    },

    // Internet Connectivity
    {
      question: "What internet options are best for RV travel?",
      answer: "Mobile hotspots are the most popular and flexible option, described as 'the most affordable and effective method to gain Internet access while traveling.' Many RVers carry hotspots on 2 different carriers (Verizon & AT&T) for redundancy. Remote workers should maintain minimum 2 internet sources (cellular + WiFi/Starlink) with 300GB+ data plans for comfortable travel, or 1,000GB+ for high-consumption users (Source: Prked, SwiftNet, Mobile Internet Resource Center 2024-2025)."
    },
    {
      question: "How fast is Starlink for RV use?",
      answer: "Starlink RV users average 50-100 Mbps download and 3-20 Mbps upload (typically <5 Mbps up), with 25-60 ms latency (vs. 600+ ms traditional satellite). The service maintains 99% uptime with speeds rivaling cable, and 87% of users said it was extremely/very effective at meeting their internet needs in 2024. The network includes 7,000+ satellites serving 4.6M+ users worldwide (Source: Camping Forge, The Vantastic Life, Reviews.org, Circle ID, Starlink Installation Pros 2024)."
    },
    {
      question: "Do WiFi boosters actually work in RVs?",
      answer: "Yes. WiFi boosters can improve signal strength by up to 32x, with cell phone boosters providing up to 65 dB gain for RVs (100 dB max). Range extension can reach up to 2,500 feet technically, though real-world performance varies. In testing, a Cox 300 Mbps plan at 2,000 feet distance achieved 167 Mbps download and 29 Mbps upload. However, boosters can't exceed the parent network speed—if campground WiFi is slow, your boosted network will be too (Source: TravlFi, TheRVgeeks, Home Owner connectivity guide 2024-2025)."
    },
    {
      question: "How much data do I need for remote work from an RV?",
      answer: "For general RV travelers, at least 300 GB data plan is recommended. High-consumption users (working, streaming, gaming) need 1,000 GB or more. HD streaming uses ~1 GB/hour, gaming uses ~0.5 GB/hour. Remote workers should have minimum 2 sources of internet (cellular plan + WiFi/Starlink). Verizon My Biz Premium offers unlimited premium on-device data with 105 GB mobile hotspot and 4K UHD streaming (Source: Mobile Internet Resource Center, RV with Us, WhistleOut 2024)."
    },

    // Security
    {
      question: "How common is RV theft and how can I prevent it?",
      answer: "Over 4,000 RVs are stolen annually in the U.S., with a 30% increase in thefts from 2016-2022. Most alarmingly, 85% of stolen motorhomes are never recovered, resulting in average insurance claims of $9,200. However, security cameras make homes 300% less likely to be burglarized, with 60-70% of burglars avoiding properties with visible cameras. GPS tracking provides 90-98% recovery rates vs. just 46% without GPS (Source: Gitnux, ZipDo, University of North Carolina, GPS Leaders 2024-2025)."
    },
    {
      question: "Are smart locks worth it for RV security?",
      answer: "Absolutely. Smart locks are critical when 70% of people forget to lock their doors when leaving home and 30% of burglars enter through unlocked doors or windows. Door/window locks combined with external lights provide at least 20x greater protection against burglary. The smart lock market is growing at 15.40% annually from $2.80 billion (2024) to projected $5.75 billion (2029), driven by rising security concerns. RVLock V4/Ultra ES Pro typically costs $100-$250 with keyless entry and remote control (Source: Coolest Gadgets, SecuriTeam, Security Journal, Market.us 2024)."
    },
    {
      question: "Do security cameras really deter theft?",
      answer: "Yes, significantly. Visible cameras deter 53% of burglars, while homes with cameras are 300% less likely to be burglarized. Businesses experience up to 50% decrease in employee theft and 25% reduction in retail theft with visible camera installations. Active monitoring systems generate larger crime reduction effects than passive systems, with combined CCTV + lighting + security guards proving most effective (Source: Security.org, Journal of Electronic Security, CCTV Security Pros, U.S. Department of Justice 40-year systematic review)."
    },
    {
      question: "How effective is GPS tracking for RV theft recovery?",
      answer: "Extremely effective. GPS tracking delivers 90-98% recovery rates for stolen vehicles, compared to just 46% overall U.S. vehicle recovery rate without GPS. Vehicles with GPS are 50% less likely to be stolen, and many are recovered within hours. LoJack reports over 90% recovery rate for GPS-equipped vehicles. Additionally, insurance companies commonly offer up to 20% premium reductions for GPS-equipped vehicles (Source: GPS Leaders, Fleetsmart, RAM Tracking, UTrack AI 2024)."
    },

    // Smart Automation
    {
      question: "How much energy can smart automation save?",
      answer: "Smart home automation systems achieve 5-22% total energy savings range, with 12.78% average emissions reduction according to Finnish research. Specific components: smart thermostats save 8-23% on heating/cooling ($50-250 annually), smart lighting saves 7-27% on lighting costs, motion sensor lights save up to 50%, smart HVAC saves 10% monthly average, and smart appliances save 2-9% on total energy costs (Source: Smart Home Survey 2024, ENERGY STAR, Unsustainable Magazine, Today's Homeowner, HashStudioz 2024)."
    },
    {
      question: "What is automated load shedding and why do I need it?",
      answer: "Automated load shedding prevents power overload by automatically managing which devices receive power based on available capacity. Systems can shed up to 4 AC circuits and 3 DC circuits, responding in 25 milliseconds or less to power events. Example: Managing a 30-amp pedestal with two 11-amp ACs (22A), 4-amp battery charging, and 10-amp microwave (36 total amps), the system automatically sheds the rear AC to maintain 25 amps, preventing breaker trips (Source: Family RVing Magazine, RV Tech Magazine 2024)."
    },
    {
      question: "How popular is voice control for RVs?",
      answer: "Voice control adoption has surged with a 100% rise in requests to Alexa for smart home control over the past 3 years. Digital voice assistants in use grew from 4.4 billion (2022) to 8.4 billion (2024). The Voice AI market is projected to grow from $12.7 billion (2024) to $514.62 billion by 2034. 80% of smart home users began their journey with a simple Echo speaker and smart bulb combination (Source: Amazon Insights 2024, Market.us Voice AI Report)."
    },
    {
      question: "Do smart automation systems increase RV value?",
      answer: "Yes. Smart home technology creates a 3-5% rise in property valuation, with multifamily properties seeing average 30% ROI on smart automation investments. Smart appliances deliver 11% higher ROI compared to standard appliances. Additionally, 86% of millennial renters will pay 20% premium for smart-equipped apartments, indicating strong market demand for smart technology (Source: Full Spectrum, nbcpa.us, House Loan Blog, SmartRent 2024)."
    },

    // Practical Questions
    {
      question: "Is it difficult to set up these systems?",
      answer: "Setup is designed to be user-friendly with guided instructions. Most smart home features can be configured within minutes using intuitive onboard touchscreens or mobile apps. With 93% of Americans already owning at least one smart home device and 69.91 million U.S. households actively using smart home devices (2024), the technology has become increasingly accessible and standardized (Source: Smart Home Survey 2024, Markets and Markets Research)."
    },
    {
      question: "Can I get support if I run into issues?",
      answer: "Yes. Comprehensive support is available through troubleshooting guides, mobile apps with built-in diagnostics, and live assistance. With 72% of U.S. homeowners now using some form of home security and 39 million households with alarm systems, support infrastructure has matured significantly. Most major RV technology providers offer 24/7 support, online resources, and community forums (Source: Consumer Affairs, SafeHome.org 2024-2025)."
    },
    {
      question: "What's the ROI timeline for RV solar and smart technology?",
      answer: "Solar systems typically see 2-3 year ROI for full-time travelers with annual savings of $1,200+. Smart thermostats pay for themselves within 1-2 years with $50-250 annual savings. GPS tracking can offset costs through up to 20% insurance discounts. Overall smart home systems show 12.78% emissions reduction and 5-22% energy savings, with combined systems providing highest long-term value (Source: Integrate Sun 2025, ENERGY STAR, RAM Tracking, Sustainability Directory 2024)."
    }
  ];

  // Generate FAQ schema from existing content
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaData)}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto mb-16 bg-[#151A22] border border-[#1a202c]/60 rounded-3xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <h2 className="text-white text-3xl font-bold">Technology FAQ</h2>
      </div>
      
      <p className="text-gray-200 mb-8 text-lg max-w-2xl text-left">
        Find answers to the most common questions about Smart RV Hub systems and features below.
      </p>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#080F1F]/30 rounded-lg overflow-hidden border border-[#1a202c]/40 mb-4">
            <div className="px-4 py-3 bg-[#080F1F]/50 text-blue-400 text-lg font-semibold text-center">
              {faq.question}
            </div>
            <div className="px-4 py-3 text-gray-200 text-left">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TechnologyFAQ;
