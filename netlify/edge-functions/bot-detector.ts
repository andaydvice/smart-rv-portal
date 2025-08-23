import { Context } from "@netlify/edge-functions";

// Valid routes configuration for 404 handling
const VALID_ROUTES = [
  '/', '/features', '/models', '/models/compact', '/models/luxury', '/models/adventure',
  '/models/compare', '/blog', '/about', '/products', '/pricing', '/contact', '/calculators',
  '/documentation', '/weather', '/rv-weather', '/storage-facilities', '/storage-preparation-checklist',
  '/troubleshooting', '/voice-control', '/account', '/rv-emergency-center', '/solar-power-guide',
  '/rv-apps-hub', '/technology', '/documentation/complete', '/search', '/features/audio-system',
  '/features/smart-tv', '/features/climate-control', '/features/security-system', '/features/energy-management',
  '/features/water-management', '/features/connectivity', '/features/navigation', '/features/monitoring',
  '/features/automation', '/features/maintenance', '/features/entertainment', '/features/lighting',
  '/features/storage', '/features/safety', '/admin/perf'
];

const VALID_PATTERNS = [
  /^\/blog\/[a-z0-9\-]+$/,
];

function isValidRoute(path: string): boolean {
  if (VALID_ROUTES.includes(path)) return true;
  return VALID_PATTERNS.some(pattern => pattern.test(path));
}

// More specific bot detection patterns to avoid false positives
const BOT_PATTERNS = [
  /googlebot\/\d+\.\d+/i,
  /bingbot\/\d+\.\d+/i,
  /yahoo! slurp/i,
  /duckduckbot-https\/\d+\.\d+/i,
  /baiduspider\/\d+\.\d+/i,
  /yandexbot\/\d+\.\d+/i,
  /sogou\s+web\s+spider/i,
  /twitterbot\/\d+\.\d+/i,
  /facebookexternalhit\/\d+\.\d+/i,
  /whatsapp\/\d+\.\d+/i,
  /telegram.*bot/i,
  /linkedinbot\/\d+\.\d+/i,
  /slackbot.*link.*expanding/i,
  /discordbot/i,
  /applebot\/\d+\.\d+/i,
  /\bcrawler\b.*\bbot\b/i,
  /\bspider\b.*\bbot\b/i,
  /headlesschrome\/\d+\.\d+/i,
  /phantomjs\/\d+\.\d+/i,
  /sitemapgenerator.*bot/i,
  /pinterestbot\/\d+\.\d+/i,
  /redditbot\/\d+\.\d+/i,
  /skypeuripreview/i,
  /^mozilla\/5\.0.*\+http/i // Detects crawlers that include URLs in user agent
];

// Check if user agent matches bot patterns with additional checks
function isBot(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 10) return false;
  
  // Exclude common browsers
  const browserPatterns = [
    /chrome\/\d+\.\d+/i,
    /firefox\/\d+\.\d+/i,
    /safari\/\d+\.\d+/i,
    /edge\/\d+\.\d+/i,
    /opera\/\d+\.\d+/i
  ];
  
  // If it looks like a regular browser, it's not a bot
  if (browserPatterns.some(pattern => pattern.test(userAgent))) {
    // Double check - some bots masquerade as browsers but include bot indicators
    return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
  }
  
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
}

// Generate 404 HTML for bots with proper status
function generate404HTML(path: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found (404) | Smart RV Technology Hub</title>
    <meta name="description" content="The page you're looking for doesn't exist. Explore our smart RV technology guides, product reviews, and digital nomad resources instead.">
    <meta name="robots" content="noindex, nofollow">
    <link rel="canonical" href="https://rv-tech-hub.lovable.app${path}">
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 40px 20px; background: #080F1F; color: #E2E8FF; text-align: center; }
        .container { max-width: 600px; margin: 0 auto; }
        .error-code { font-size: 72px; font-weight: bold; color: #5B9BD5; margin: 0; }
        .error-title { font-size: 24px; margin: 20px 0; color: #ffffff; }
        .error-desc { font-size: 16px; line-height: 1.6; margin: 20px 0; opacity: 0.8; }
        .btn { display: inline-block; padding: 12px 24px; background: #5B9BD5; color: white; text-decoration: none; border-radius: 6px; margin: 10px; }
        .btn:hover { background: #4B8FE3; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-desc">The page you're looking for doesn't exist or has been moved. Explore our smart RV technology guides and resources instead.</p>
        <a href="/" class="btn">Go to Homepage</a>
        <a href="/features" class="btn">Browse Features</a>
        <a href="/blog" class="btn">Read Blog</a>
    </div>
</body>
</html>`;
}

// Generate prerendered HTML for bots
function generateBotHTML(path: string, url: URL): string {
  const baseUrl = url.origin;
  
  // Page-specific metadata
  const getPageData = (pathname: string) => {
    switch (pathname) {
      case '/':
        return {
          title: 'Smart RV Systems - Next-Generation RV Technology',
          description: 'Transform your RV with cutting-edge smart systems, connectivity solutions, and intelligent automation. Discover the future of mobile living.',
          keywords: 'smart rv, rv technology, rv systems, mobile living, rv connectivity'
        };
      case '/models':
        return {
          title: 'Smart RV Models - Choose Your Perfect Connected RV',
          description: 'Explore our range of smart RV models with advanced technology, connectivity, and automation features for the modern traveler.',
          keywords: 'rv models, smart rv types, connected rv, luxury rv, compact rv'
        };
      case '/features':
        return {
          title: 'Smart RV Features - Advanced Technology & Connectivity',
          description: 'Discover smart RV features including automated systems, climate control, security, entertainment, and connectivity solutions.',
          keywords: 'rv features, smart technology, rv automation, connectivity, climate control'
        };
      default:
        return {
          title: 'Smart RV Systems - Advanced Mobile Technology',
          description: 'Experience the future of RV living with smart technology solutions.',
          keywords: 'smart rv, rv technology, mobile living'
        };
    }
  };

  const pageData = getPageData(path);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageData.title}</title>
    <meta name="description" content="${pageData.description}" />
    <meta name="keywords" content="${pageData.keywords}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${baseUrl}${path}" />
    
    <!-- Open Graph tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}${path}" />
    <meta property="og:title" content="${pageData.title}" />
    <meta property="og:description" content="${pageData.description}" />
    <meta property="og:image" content="${baseUrl}/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png" />
    <meta property="og:site_name" content="Smart RV Systems" />
    
     <!-- Security headers for bot responses -->
     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline'; img-src 'self' data: https:; script-src 'unsafe-inline';">
     <meta http-equiv="X-Content-Type-Options" content="nosniff">
     <meta http-equiv="X-Frame-Options" content="DENY">
     <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
     
     <!-- Twitter Card tags -->
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content="${pageData.title}" />
     <meta name="twitter:description" content="${pageData.description}" />
     <meta name="twitter:image" content="${baseUrl}/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Smart RV Systems",
      "description": "Next-generation connectivity and control for your RV",
      "url": "${baseUrl}",
      "logo": "${baseUrl}/lovable-uploads/f3ebf58c-7bbf-427f-9510-9c3b0aec6f6d.png"
    }
    </script>
    
    <style>
      body { 
        font-family: system-ui, -apple-system, sans-serif;
        margin: 0; padding: 0; background: #080f1f; color: #fff; line-height: 1.6; 
      }
      .content { max-width: 1200px; margin: 0 auto; padding: 2rem; }
      .header { text-align: center; margin-bottom: 3rem; }
      .title { 
        font-size: 3rem; font-weight: 700; margin-bottom: 1rem;
        background: linear-gradient(135deg, #5b9bd5, #60a5fa);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .description { font-size: 1.25rem; color: #e2e8ff; }
      .features { 
        display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 2rem; margin-top: 3rem; 
      }
      .feature { 
        background: #151a22; padding: 2rem; border-radius: 12px; 
        border: 1px solid #1a202c; 
      }
      .feature h2 { 
        font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; 
        color: #5b9bd5; 
      }
    </style>
  </head>
  <body>
    <div class="content">
      <header class="header">
        <h1 class="title">${pageData.title.split(' - ')[0]}</h1>
        <p class="description">${pageData.description}</p>
      </header>
      
      <div class="features">
        <div class="feature">
          <h2>Smart Connectivity</h2>
          <p>Stay connected anywhere with advanced connectivity solutions, satellite internet, cellular boosters, and Wi-Fi systems.</p>
        </div>
        <div class="feature">
          <h2>Intelligent Automation</h2>
          <p>Automate your RV systems with smart controls for climate, lighting, security, and power management.</p>
        </div>
        <div class="feature">
          <h2>Advanced Security</h2>
          <p>Protect your investment with comprehensive security systems including cameras, alarms, and remote monitoring.</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

export default async function botDetector(request: Request, context: Context) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Skip edge function for static assets
  if (path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    return;
  }
  
  // Skip for robots.txt and sitemap.xml
  if (path === '/robots.txt' || path === '/sitemap.xml') {
    return;
  }

  // Check if route is valid
  if (!isValidRoute(path)) {
    if (isBot(userAgent)) {
      // Return 404 HTML for bots
      const html = generate404HTML(path);
      return new Response(html, {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'X-Bot-Detected': 'true',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } else {
      // Return 404 redirect for humans to let React Router handle it
      return new Response(null, {
        status: 404,
        headers: {
          'location': '/404-redirect',
          'cache-control': 'no-cache',
        },
      });
    }
  }
  
  // Check if this is a bot/crawler
  if (isBot(userAgent)) {
    console.log(`Bot detected: ${userAgent} accessing ${path}`);
    
    // Return prerendered HTML for bots
    const html = generateBotHTML(path, url);
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Bot-Detected': 'true',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
      }
    });
  }
  
  // Debug log for non-bot requests to help identify false positives
  console.log(`Human user detected: ${userAgent.substring(0, 100)} accessing ${path}`);
  
  // For human users, continue to normal SPA
  return;
}