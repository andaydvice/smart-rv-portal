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

// Page metadata for static generation
export const pageMetadata: Record<string, PageMetadata> = {
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
      "@type": "Organization",
      "name": "Smart RV Systems",
      "description": "Next-generation connectivity and control for your RV",
      "url": "https://rv-tech-hub.lovable.app"
    }
  },
  '/models': {
    title: 'Smart RV Models - Choose Your Perfect Connected RV',
    description: 'Explore our range of smart RV models with advanced technology, connectivity, and automation features for the modern traveler.',
    keywords: ['rv models', 'smart rv types', 'connected rv', 'luxury rv', 'compact rv'],
    path: '/models',
    priority: 0.9,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/features': {
    title: 'Smart RV Features - Advanced Technology & Connectivity',
    description: 'Discover smart RV features including automated systems, climate control, security, entertainment, and connectivity solutions.',
    keywords: ['rv features', 'smart technology', 'rv automation', 'connectivity', 'climate control'],
    path: '/features',
    priority: 0.8,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/products': {
    title: 'Smart RV Products - Technology Solutions for Your RV',
    description: 'Browse our comprehensive range of smart RV products and technology solutions to upgrade your mobile living experience.',
    keywords: ['rv products', 'smart rv upgrades', 'rv technology', 'mobile technology'],
    path: '/products',
    priority: 0.9,
    changeFreq: 'weekly',
    lastModified: new Date().toISOString().split('T')[0]
  },
  '/pricing': {
    title: 'Smart RV Pricing - Affordable Technology Packages',
    description: 'Transparent pricing for smart RV systems and technology packages. Choose the perfect solution for your budget and needs.',
    keywords: ['rv pricing', 'smart rv cost', 'technology packages', 'rv upgrades cost'],
    path: '/pricing',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: new Date().toISOString().split('T')[0]
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
