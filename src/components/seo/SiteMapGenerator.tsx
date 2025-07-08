import { useEffect } from 'react';
import { routes } from '@/routes/routes';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const SitemapGenerator = () => {
  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = () => {
    const baseUrl = window.location.origin;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const urls: SitemapUrl[] = [
      // Homepage
      {
        loc: `${baseUrl}/`,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 1.0
      },
      // Main pages
      {
        loc: `${baseUrl}/models`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${baseUrl}/features`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${baseUrl}/blog`,
        lastmod: currentDate,
        changefreq: 'daily',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/calculators`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/storage-facilities`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      },
      // Affiliate pages
      {
        loc: `${baseUrl}/rv-apps-hub`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/solar-power-guide`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: `${baseUrl}/rv-emergency-center`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.8
      },
      // Model pages
      {
        loc: `${baseUrl}/models/compact`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/models/luxury`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/models/adventure`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${baseUrl}/models/compare`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6
      },
      // Feature pages
      {
        loc: `${baseUrl}/features/smart-kitchen`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: `${baseUrl}/features/remote-control`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.6
      },
      // Utility pages
      {
        loc: `${baseUrl}/about`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.5
      },
      {
        loc: `${baseUrl}/contact`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: 0.5
      },
      {
        loc: `${baseUrl}/pricing`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.7
      }
    ];

    const xml = generateSitemapXML(urls);
    
    // Store in localStorage for development purposes
    localStorage.setItem('sitemap_xml', xml);
    console.log('Sitemap generated:', xml);
  };

  const generateSitemapXML = (urls: SitemapUrl[]): string => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url.loc}</loc>\n`;
      if (url.lastmod) xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      if (url.changefreq) xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      if (url.priority) xml += `    <priority>${url.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    return xml;
  };

  return null; // This component doesn't render anything
};

export default SitemapGenerator;