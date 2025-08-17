/**
 * Static Site Generation utilities for SEO optimization
 * Generates static HTML content for search engines and bots
 */

interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  priority: number;
  changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified: string;
  structuredData?: any;
}

// Comprehensive page metadata for static generation
export const pageMetadata: Record<string, PageMetadata> = {
  // Main Pages
  '/': {
    title: 'Smart RV Systems - Next-Generation RV Technology',
    description: 'Transform your RV with cutting-edge smart systems, connectivity solutions, and intelligent automation. Discover the future of mobile living.',
    keywords: ['smart rv', 'rv technology', 'rv systems', 'mobile living', 'rv connectivity'],
    path: '/',
    priority: 1.0,
    changeFreq: 'daily',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Smart RV Technology Hub",
          "description": "Next-generation connectivity and control for your RV",
          "url": "https://rv-tech-hub.lovable.app",
          "logo": "https://rv-tech-hub.lovable.app/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png"
        },
        {
          "@type": "WebSite",
          "name": "Smart RV Technology Hub",
          "url": "https://rv-tech-hub.lovable.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://rv-tech-hub.lovable.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    }
  },
  '/about': {
    title: 'About Smart RV Technology Hub - Leading RV Innovation',
    description: 'Learn about our mission to revolutionize the RV industry with cutting-edge smart technology solutions and connectivity systems.',
    keywords: ['about smart rv', 'rv technology company', 'smart rv innovation', 'rv tech leadership'],
    path: '/about',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/products': {
    title: 'Smart RV Products - Technology Solutions for Your RV',
    description: 'Browse our comprehensive range of smart RV products and technology solutions to upgrade your mobile living experience.',
    keywords: ['rv products', 'smart rv upgrades', 'rv technology', 'mobile technology'],
    path: '/products',
    priority: 0.9,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Smart RV Technology Solutions",
      "description": "Comprehensive smart technology solutions for modern RVs",
      "brand": {
        "@type": "Brand",
        "name": "Smart RV Technology Hub"
      }
    }
  },
  '/pricing': {
    title: 'Smart RV Pricing - Affordable Technology Packages',
    description: 'Transparent pricing for smart RV systems and technology packages. Choose the perfect solution for your budget and needs.',
    keywords: ['rv pricing', 'smart rv cost', 'technology packages', 'rv upgrades cost'],
    path: '/pricing',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/contact': {
    title: 'Contact Smart RV Technology Hub - Get Expert Support',
    description: 'Get in touch with our RV technology experts for personalized advice, support, and custom solutions for your smart RV needs.',
    keywords: ['contact smart rv', 'rv tech support', 'smart rv consultation', 'rv technology help'],
    path: '/contact',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },

  // Models Section
  '/models': {
    title: 'Smart RV Models - Choose Your Perfect Connected RV',
    description: 'Explore our range of smart RV models with advanced technology, connectivity, and automation features for the modern traveler.',
    keywords: ['rv models', 'smart rv types', 'connected rv', 'luxury rv', 'compact rv'],
    path: '/models',
    priority: 0.9,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Smart RV Models",
      "description": "Explore our range of smart RV models"
    }
  },
  '/models/compact': {
    title: 'Compact Smart RV - Efficient Technology for Small Spaces',
    description: 'Perfect for couples and small families, our compact smart RV features essential technology systems in an efficient design.',
    keywords: ['compact rv', 'small smart rv', 'efficient rv technology', 'couple rv'],
    path: '/models/compact',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Compact Smart RV",
      "description": "Efficient smart technology for compact RV living"
    }
  },
  '/models/luxury': {
    title: 'Luxury Smart RV - Premium Technology & Comfort',
    description: 'Experience the ultimate in RV luxury with our premium smart RV featuring advanced automation, connectivity, and comfort systems.',
    keywords: ['luxury rv', 'premium smart rv', 'high-end rv technology', 'luxury mobile living'],
    path: '/models/luxury',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Luxury Smart RV",
      "description": "Premium smart technology and luxury amenities"
    }
  },
  '/models/adventure': {
    title: 'Adventure Smart RV - Built for Off-Grid Exploration',
    description: 'Built for off-grid adventures with enhanced power systems, rugged connectivity solutions, and adventure-ready smart technology.',
    keywords: ['adventure rv', 'off-grid rv', 'rugged smart rv', 'outdoor rv technology'],
    path: '/models/adventure',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Adventure Smart RV",
      "description": "Rugged smart technology for off-grid adventures"
    }
  },
  '/models/compare': {
    title: 'Compare Smart RV Models - Find Your Perfect Match',
    description: 'Compare features, technology, and specifications across our smart RV models to find the perfect match for your lifestyle.',
    keywords: ['compare rv models', 'rv comparison', 'smart rv features comparison', 'rv selection guide'],
    path: '/models/compare',
    priority: 0.6,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },

  // Features Section
  '/features': {
    title: 'Smart RV Features - Advanced Technology & Connectivity',
    description: 'Discover smart RV features including automated systems, climate control, security, entertainment, and connectivity solutions.',
    keywords: ['rv features', 'smart technology', 'rv automation', 'connectivity', 'climate control'],
    path: '/features',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Smart RV Features",
      "description": "Comprehensive smart technology features for RVs"
    }
  },
  '/features/audio-system': {
    title: 'Smart RV Audio System - Premium Sound Experience',
    description: 'Immerse yourself in premium audio with our smart RV sound system featuring wireless connectivity and intelligent controls.',
    keywords: ['rv audio system', 'smart rv sound', 'wireless rv audio', 'rv entertainment'],
    path: '/features/audio-system',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/smart-tv': {
    title: 'Smart TV for RV - Entertainment on the Road',
    description: 'Stay entertained anywhere with our smart TV solution designed specifically for RV living with satellite and streaming capabilities.',
    keywords: ['rv smart tv', 'mobile tv system', 'rv entertainment', 'satellite tv rv'],
    path: '/features/smart-tv',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/smart-kitchen': {
    title: 'Smart RV Kitchen - Intelligent Cooking Solutions',
    description: 'Transform your RV kitchen with smart appliances, automated systems, and intelligent cooking solutions for mobile living.',
    keywords: ['smart rv kitchen', 'rv kitchen automation', 'smart rv appliances', 'mobile cooking'],
    path: '/features/smart-kitchen',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/power-management': {
    title: 'RV Power Management - Smart Energy Solutions',
    description: 'Optimize your RV power consumption with intelligent energy management systems, solar integration, and battery monitoring.',
    keywords: ['rv power management', 'smart rv energy', 'rv solar system', 'battery management'],
    path: '/features/power-management',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/internet-connectivity': {
    title: 'RV Internet Connectivity - Stay Connected Anywhere',
    description: 'Maintain reliable internet connectivity on the road with our advanced RV networking solutions and signal boosters.',
    keywords: ['rv internet', 'mobile connectivity', 'rv wifi', 'cellular booster rv'],
    path: '/features/internet-connectivity',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/navigation-system': {
    title: 'RV Navigation System - Smart Route Planning',
    description: 'Navigate safely with our RV-specific GPS system featuring height restrictions, weight limits, and campground locations.',
    keywords: ['rv navigation', 'rv gps', 'motorhome navigation', 'rv route planning'],
    path: '/features/navigation-system',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/security-system': {
    title: 'RV Security System - Protect Your Investment',
    description: 'Secure your RV with advanced monitoring, cameras, alarms, and remote access for peace of mind on the road.',
    keywords: ['rv security', 'rv alarm system', 'rv cameras', 'mobile security'],
    path: '/features/security-system',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/automated-driving': {
    title: 'RV Automated Driving - Advanced Safety Features',
    description: 'Experience enhanced safety with automated driving assistance features designed specifically for RV and motorhome travel.',
    keywords: ['rv automation', 'motorhome safety', 'rv driver assistance', 'automated rv'],
    path: '/features/automated-driving',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/water-systems': {
    title: 'Smart RV Water Systems - Intelligent Water Management',
    description: 'Monitor and control your RV water systems with smart sensors, automated filling, and quality monitoring technology.',
    keywords: ['rv water system', 'smart water management', 'rv plumbing', 'water monitoring'],
    path: '/features/water-systems',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/smart-automation': {
    title: 'Smart RV Automation - Intelligent Control Systems',
    description: 'Automate your entire RV with intelligent control systems for lighting, climate, security, and entertainment.',
    keywords: ['rv automation', 'smart rv controls', 'home automation rv', 'intelligent rv'],
    path: '/features/smart-automation',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/climate-control': {
    title: 'Smart RV Climate Control - Perfect Temperature Always',
    description: 'Maintain optimal comfort with intelligent climate control systems featuring zoned heating, cooling, and air quality monitoring.',
    keywords: ['rv climate control', 'smart rv hvac', 'rv air conditioning', 'rv heating system'],
    path: '/features/climate-control',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/entertainment': {
    title: 'RV Entertainment System - Complete Media Solution',
    description: 'Enjoy comprehensive entertainment with integrated audio, video, gaming, and streaming solutions designed for RV life.',
    keywords: ['rv entertainment', 'rv media system', 'mobile entertainment', 'rv streaming'],
    path: '/features/entertainment',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features/remote-control': {
    title: 'RV Remote Control - Manage Everything from Anywhere',
    description: 'Control your entire RV remotely with smartphone apps and voice commands for ultimate convenience and peace of mind.',
    keywords: ['rv remote control', 'smartphone rv control', 'voice control rv', 'remote rv management'],
    path: '/features/remote-control',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },

  // Tools and Utilities
  '/calculators': {
    title: 'RV Calculators - Essential Planning Tools',
    description: 'Use our comprehensive RV calculators for trip planning, fuel costs, solar power sizing, and payload calculations.',
    keywords: ['rv calculators', 'rv trip planning', 'rv fuel calculator', 'rv solar calculator'],
    path: '/calculators',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/weather': {
    title: 'RV Weather Dashboard - Real-Time Weather Data',
    description: 'Get accurate weather forecasts and conditions optimized for RV travel planning and safety.',
    keywords: ['rv weather', 'travel weather', 'campground weather', 'rv forecast'],
    path: '/weather',
    priority: 0.6,
    changeFreq: 'daily',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/rv-weather': {
    title: 'Advanced RV Weather - Detailed Travel Forecasts',
    description: 'Comprehensive weather information specifically designed for RV travelers including driving conditions and severe weather alerts.',
    keywords: ['rv weather forecast', 'rv travel conditions', 'severe weather rv', 'driving weather'],
    path: '/rv-weather',
    priority: 0.6,
    changeFreq: 'daily',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/storage-facilities': {
    title: 'RV Storage Facilities - Find Secure Storage',
    description: 'Locate and compare RV storage facilities near you with detailed information about security, pricing, and amenities.',
    keywords: ['rv storage', 'rv storage facilities', 'secure rv storage', 'indoor rv storage'],
    path: '/storage-facilities',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/storage-preparation-checklist': {
    title: 'RV Storage Preparation Checklist - Protect Your Investment',
    description: 'Complete checklist for preparing your RV for storage to prevent damage and ensure its ready for your next adventure.',
    keywords: ['rv storage preparation', 'rv winterization', 'rv storage checklist', 'rv maintenance'],
    path: '/storage-preparation-checklist',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/troubleshooting': {
    title: 'RV Troubleshooting Guide - Fix Common Issues',
    description: 'Comprehensive troubleshooting guide for common RV problems with step-by-step solutions and maintenance tips.',
    keywords: ['rv troubleshooting', 'rv repair guide', 'rv maintenance', 'rv problems'],
    path: '/troubleshooting',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/voice-control': {
    title: 'RV Voice Control - Hands-Free RV Management',
    description: 'Control your RV with voice commands for lighting, climate, entertainment, and security systems using smart assistants.',
    keywords: ['rv voice control', 'voice command rv', 'smart assistant rv', 'hands-free rv'],
    path: '/voice-control',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/rv-emergency-center': {
    title: 'RV Emergency Center - 24/7 Support & Resources',
    description: 'Access emergency resources, roadside assistance, and critical information for RV emergencies and breakdowns.',
    keywords: ['rv emergency', 'rv roadside assistance', 'rv breakdown help', 'emergency rv support'],
    path: '/rv-emergency-center',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/solar-power-guide': {
    title: 'RV Solar Power Guide - Complete Solar Solutions',
    description: 'Comprehensive guide to RV solar power systems including sizing, installation, and optimization for off-grid living.',
    keywords: ['rv solar power', 'rv solar panels', 'solar rv system', 'off-grid rv power'],
    path: '/solar-power-guide',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/rv-apps-hub': {
    title: 'RV Apps Hub - Essential Mobile Apps for RV Life',
    description: 'Discover the best mobile apps for RV living including navigation, campgrounds, weather, and maintenance tracking.',
    keywords: ['rv apps', 'mobile apps rv', 'rv life apps', 'campground apps'],
    path: '/rv-apps-hub',
    priority: 0.6,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },

  // Content and Documentation
  '/technology': {
    title: 'RV Technology - Innovation in Mobile Living',
    description: 'Explore the latest innovations in RV technology including smart systems, connectivity solutions, and automation.',
    keywords: ['rv technology', 'smart rv innovation', 'mobile living technology', 'rv tech trends'],
    path: '/technology',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/documentation': {
    title: 'RV Documentation - Guides & Resources',
    description: 'Comprehensive documentation and guides for RV technology, maintenance, and best practices for mobile living.',
    keywords: ['rv documentation', 'rv guides', 'rv manuals', 'rv resources'],
    path: '/documentation',
    priority: 0.6,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/documentation/complete': {
    title: 'Complete RV Documentation - Full Technical Guide',
    description: 'Complete technical documentation covering all aspects of smart RV systems, installation, and maintenance.',
    keywords: ['complete rv guide', 'rv technical documentation', 'rv installation guide', 'rv system manual'],
    path: '/documentation/complete',
    priority: 0.5,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
  },

  // Blog Section
  '/blog': {
    title: 'RV Technology Blog - Latest News & Insights',
    description: 'Stay updated with the latest RV technology news, reviews, guides, and insights from industry experts.',
    keywords: ['rv blog', 'rv technology news', 'rv reviews', 'mobile living blog'],
    path: '/blog',
    priority: 0.8,
    changeFreq: 'daily',
    lastModified: new Date().toISOString().split('T')[0],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "RV Technology Blog",
      "description": "Latest news and insights about RV technology"
    }
  }
};

/**
 * Generate static HTML for a specific page
 */
export const generateStaticHTML = (path: string): string => {
  const metadata = pageMetadata[path];
  if (!metadata) {
    console.warn(`No metadata found for path: ${path}`);
    return generateFallbackHTML(path);
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords.join(', ')}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <title>${metadata.title}</title>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://rv-tech-hub.lovable.app${metadata.path}" />
    
    <!-- Open Graph tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rv-tech-hub.lovable.app${metadata.path}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="https://rv-tech-hub.lovable.app/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png" />
    <meta property="og:site_name" content="Smart RV Systems" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://rv-tech-hub.lovable.app${metadata.path}" />
    <meta name="twitter:title" content="${metadata.title}" />
    <meta name="twitter:description" content="${metadata.description}" />
    <meta name="twitter:image" content="https://rv-tech-hub.lovable.app/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png" />
    
    <!-- Performance-critical preloads -->
    <link rel="preload" href="/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png" as="image" />
    
    <!-- Non-blocking Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
    </noscript>

    ${metadata.structuredData ? `
    <!-- Structured Data -->
    <script type="application/ld+json">
      ${JSON.stringify(metadata.structuredData, null, 2)}
    </script>` : ''}

    <!-- Critical CSS for above-the-fold content -->
    <style>
      body { 
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        margin: 0;
        padding: 0;
        background: #080f1f;
        color: #ffffff;
        line-height: 1.6;
      }
      .seo-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }
      .seo-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      .seo-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #5b9bd5, #60a5fa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .seo-description {
        font-size: 1.25rem;
        color: #e2e8ff;
        margin-bottom: 2rem;
      }
      .seo-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
      }
      .feature-card {
        background: #151a22;
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid #1a202c;
      }
      .feature-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #5b9bd5;
      }
      .loading-fallback {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="root">
      ${generatePageContent(path, metadata)}
    </div>
    
    <!-- Bot detection script -->
    <script>
      // Enhanced bot detection
      const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|facebook|twitter|whatsapp|telegram/i.test(navigator.userAgent);
      const isSocialBot = /facebook|twitter|whatsapp|telegram|linkedin|slack|discord/i.test(navigator.userAgent);
      
      if (isBot || isSocialBot) {
        // For bots, keep the static content visible
        console.log('Bot detected, serving static content');
      } else {
        // For human users, load the React app
        window.initialPath = window.location.pathname;
      }
    </script>
    
    <!-- Load React app for human users -->
    <script>
      if (!(/bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|sogou|facebook|twitter|whatsapp|telegram/i.test(navigator.userAgent))) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = '/src/main.tsx';
        document.head.appendChild(script);
        
        const lovableScript = document.createElement('script');
        lovableScript.src = 'https://cdn.gpteng.co/gptengineer.js';
        lovableScript.type = 'module';
        document.head.appendChild(lovableScript);
      }
    </script>
  </body>
</html>`;
};

/**
 * Generate page-specific content for bots
 */
const generatePageContent = (path: string, metadata: PageMetadata): string => {
  const baseContent = `
    <div class="seo-content">
      <header class="seo-header">
        <h1 class="seo-title">${metadata.title.split(' - ')[0]}</h1>
        <p class="seo-description">${metadata.description}</p>
      </header>
  `;

  switch (path) {
    case '/':
      return baseContent + `
        <div class="seo-features">
          <div class="feature-card">
            <h2 class="feature-title">Smart Connectivity</h2>
            <p>Stay connected anywhere with our advanced connectivity solutions, including satellite internet, cellular boosters, and Wi-Fi systems.</p>
          </div>
          <div class="feature-card">
            <h2 class="feature-title">Intelligent Automation</h2>
            <p>Automate your RV systems with smart controls for climate, lighting, security, and power management.</p>
          </div>
          <div class="feature-card">
            <h2 class="feature-title">Advanced Security</h2>
            <p>Protect your investment with comprehensive security systems including cameras, alarms, and remote monitoring.</p>
          </div>
        </div>
      </div>`;
      
    case '/models':
      return baseContent + `
        <div class="seo-features">
          <div class="feature-card">
            <h2 class="feature-title">Compact Smart RV</h2>
            <p>Perfect for couples and small families, featuring essential smart systems in a compact design.</p>
          </div>
          <div class="feature-card">
            <h2 class="feature-title">Luxury Smart RV</h2>
            <p>Premium amenities with full smart home integration and luxury comfort features.</p>
          </div>
          <div class="feature-card">
            <h2 class="feature-title">Adventure Smart RV</h2>
            <p>Built for off-grid adventures with enhanced power systems and rugged connectivity solutions.</p>
          </div>
        </div>
      </div>`;
      
    default:
      return baseContent + `
        <div class="seo-features">
          <div class="feature-card">
            <h2 class="feature-title">Smart Technology</h2>
            <p>Experience the future of RV living with our cutting-edge smart technology solutions.</p>
          </div>
        </div>
      </div>`;
  }
};

/**
 * Generate fallback HTML for unknown paths
 */
const generateFallbackHTML = (path: string): string => {
  return generateStaticHTML('/').replace(
    /Smart RV Systems - Next-Generation RV Technology/g,
    `Smart RV Systems - ${path.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
  );
};

/**
 * Generate sitemap.xml content
 */
export const generateSitemap = (): string => {
  const baseUrl = 'https://rv-tech-hub.lovable.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = Object.values(pageMetadata).map(page => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Block admin and internal routes
Disallow: /admin/
Disallow: /account
Disallow: /search

# Sitemap location
Sitemap: https://rv-tech-hub.lovable.app/sitemap.xml

# Crawl delay for polite crawling
Crawl-delay: 1`;
};
