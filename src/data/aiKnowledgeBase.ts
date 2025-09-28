// Controlled knowledge base for liability-free AI responses
// All content is educational and fact-based only

export const RV_TECH_KNOWLEDGE_BASE = {
  disclaimers: {
    general: "This information is provided for educational purposes only. Always consult with RV professionals and manufacturers for specific advice regarding your situation.",
    technology: "Technology capabilities may vary by manufacturer and model. Specifications and performance should be verified with dealers.",
    compatibility: "Compatibility information is general guidance only. Professional installation and configuration may be required."
  },

  connectivity: {
    cellular: {
      concept: "Cellular connectivity uses mobile network towers to provide internet access in your RV.",
      educational_points: [
        "Data speeds vary significantly based on tower proximity and network congestion",
        "Different carriers have varying coverage areas - research is important",
        "Data usage can be high for streaming and video calls",
        "Understanding data plans helps manage costs and expectations"
      ],
      common_applications: ["Remote work", "Entertainment streaming", "Navigation updates", "Communication"],
      considerations: [
        "Coverage varies by location and carrier",
        "Data costs can accumulate quickly",
        "Signal boosters may help in weak signal areas",
        "Multiple carrier options provide redundancy"
      ]
    },
    starlink: {
      concept: "Satellite internet provides connectivity in remote areas where cellular coverage is limited.",
      educational_points: [
        "Requires clear view of the sky for optimal performance",
        "Weather can affect signal quality",
        "Setup and installation considerations for RV mounting",
        "Power consumption impacts battery systems"
      ],
      common_applications: ["Remote area connectivity", "Backup internet option", "High-speed rural access"],
      considerations: [
        "Initial equipment costs are significant",
        "Monthly service fees add to travel budget",
        "Physical installation requirements",
        "Power consumption planning needed"
      ]
    },
    wifi: {
      concept: "WiFi extends internet connectivity throughout your RV using campground or cellular connections.",
      educational_points: [
        "Range extenders help capture distant WiFi signals",
        "Internal routers distribute connection to multiple devices",
        "Security considerations for public WiFi networks",
        "Bandwidth sharing among multiple devices"
      ]
    }
  },

  power_management: {
    solar: {
      concept: "Solar panels convert sunlight into electrical energy to charge RV batteries.",
      educational_points: [
        "Panel efficiency varies by technology type and age",
        "Installation angle and direction affect power generation",
        "Weather and shade significantly impact output",
        "Battery capacity determines how much power can be stored"
      ],
      considerations: [
        "Initial investment varies widely by system size",
        "Professional installation often recommended",
        "Maintenance requirements are generally minimal",
        "Geographic location affects year-round effectiveness"
      ]
    },
    lithium_batteries: {
      concept: "Lithium batteries store electrical energy more efficiently than traditional lead-acid batteries.",
      educational_points: [
        "Longer lifespan typically means better long-term value",
        "Lighter weight compared to equivalent lead-acid capacity",
        "Faster charging capabilities",
        "Temperature considerations for optimal performance"
      ]
    },
    inverters: {
      concept: "Inverters convert 12V DC battery power to 120V AC power for household appliances.",
      educational_points: [
        "Pure sine wave vs modified sine wave affects appliance compatibility",
        "Power rating determines what appliances can be operated",
        "Efficiency ratings affect battery consumption",
        "Installation location affects cooling and safety"
      ]
    }
  },

  control_systems: {
    smart_monitoring: {
      concept: "Digital systems monitor and control various RV systems remotely.",
      educational_points: [
        "Real-time monitoring helps prevent problems",
        "Remote control adds convenience and security",
        "Integration varies by manufacturer and aftermarket options",
        "Learning curve varies by technical comfort level"
      ]
    },
    automation: {
      concept: "Automated systems can control lighting, climate, and other functions based on schedules or conditions.",
      educational_points: [
        "Convenience increases with system sophistication",
        "Initial setup time varies by complexity",
        "Reliability depends on quality of components",
        "Technical support availability varies by manufacturer"
      ]
    }
  },

  lifestyle_scenarios: {
    remote_work: {
      technology_needs: [
        "Reliable high-speed internet connectivity",
        "Sufficient power for extended computer use",
        "Climate control for comfortable work environment",
        "Lighting suitable for video calls and detailed work"
      ],
      educational_considerations: [
        "Internet redundancy prevents work disruption",
        "Ergonomic workspace setup affects long-term comfort",
        "Noise considerations for virtual meetings",
        "Power consumption planning for work equipment"
      ]
    },
    boondocking: {
      technology_needs: [
        "Adequate battery capacity for extended off-grid periods",
        "Solar or generator power generation",
        "Water conservation monitoring",
        "Efficient appliances to minimize power consumption"
      ],
      educational_considerations: [
        "Resource conservation becomes critical",
        "Weather affects power generation capability",
        "Location research helps plan resource needs",
        "Backup systems provide security"
      ]
    },
    family_travel: {
      technology_needs: [
        "Entertainment systems for various age groups",
        "Safety monitoring and communication systems",
        "Climate control for comfort",
        "Storage solutions for technology equipment"
      ],
      educational_considerations: [
        "Multiple device charging requirements",
        "Age-appropriate content and control systems",
        "Safety features provide peace of mind",
        "Flexible entertainment options suit different preferences"
      ]
    }
  },

  decision_framework: {
    needs_assessment: [
      "Identify your primary RV usage patterns",
      "Determine your technical comfort level",
      "Assess your budget for technology investments",
      "Consider your typical camping locations and style"
    ],
    research_process: [
      "Research specific brands and models",
      "Read user reviews and experiences",
      "Consult with RV professionals",
      "Visit RV shows to see technology demonstrations"
    ],
    implementation_planning: [
      "Consider professional installation for complex systems",
      "Plan for learning curves with new technology",
      "Budget for ongoing costs and maintenance",
      "Research warranty and support options"
    ]
  }
};

// Response templates that ensure liability-free communication
export const AI_RESPONSE_TEMPLATES = {
  educational_prefix: "Here's some educational information to help you understand",
  disclaimer_suffix: "This is general educational information only. Please consult with RV professionals for specific advice regarding your situation.",
  research_guidance: "To learn more about this topic, consider researching specific manufacturers, visiting RV shows, or consulting with dealers who can provide hands-on demonstrations.",
  no_recommendations: "Rather than making specific recommendations, I can help you understand the concepts so you can make informed decisions that suit your specific needs."
};

// Content filtering rules to prevent liability-creating responses
export const CONTENT_FILTERS = {
  prohibited_phrases: [
    "I recommend",
    "you should buy",
    "this will save you money",
    "guaranteed",
    "best investment",
    "perfect for you",
    "definitely choose",
    "trust me"
  ],
  required_disclaimers: [
    "educational purposes only",
    "consult with professionals",
    "verify with manufacturers"
  ]
};