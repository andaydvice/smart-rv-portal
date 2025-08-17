import { Context } from "@netlify/edge-functions";

// Enhanced bot detection patterns
const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /sogou/i,
  /twitterbot/i,
  /facebookexternalhit/i,
  /whatsapp/i,
  /telegram/i,
  /linkedinbot/i,
  /slackbot/i,
  /discordbot/i,
  /applebot/i,
  /crawler/i,
  /spider/i,
  /bot/i,
  /crawling/i,
  /headlesschrome/i,
  /phantomjs/i,
  /sitemapgenerator/i,
  /preview/i,
  /pinterestbot/i,
  /redditbot/i,
  /skypeuripreview/i
];

// Check if user agent matches bot patterns
function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some(pattern => pattern.test(userAgent));
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
  
  // For human users, continue to normal SPA
  return;
}