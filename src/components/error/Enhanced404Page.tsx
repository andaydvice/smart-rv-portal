import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { 
  Search, 
  Home, 
  RefreshCcw, 
  ArrowLeft, 
  MapPin, 
  BookOpen, 
  Settings,
  Compass,
  Star
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import SEO from '@/components/seo/SEO';
import { organizationSchema, breadcrumbSchema } from '@/components/seo/schemas';
import { safeGtag } from '@/types/analytics';

const Enhanced404Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track 404 for analytics
  useEffect(() => {
    console.warn('404 Error - Page not found:', location.pathname);
    
    // Send analytics event
    safeGtag('event', 'page_not_found', {
      page_path: location.pathname,
      page_referrer: document.referrer
    });
  }, [location.pathname]);

  const popularPages = [
    { path: '/features', label: 'Features', icon: Settings, description: 'Smart RV technology features' },
    { path: '/models', label: 'Models', icon: Star, description: 'RV models and specifications' },
    { path: '/blog', label: 'Blog', icon: BookOpen, description: 'Latest RV technology insights' },
    { path: '/storage-map', label: 'Storage Map', icon: MapPin, description: 'Find storage facilities' },
    { path: '/about', label: 'About', icon: Compass, description: 'Learn about our mission' }
  ];

  const suggestAlternatives = () => {
    const path = location.pathname.toLowerCase();
    const suggestions = [];

    // Smart suggestions based on URL patterns
    if (path.includes('storage') || path.includes('facility')) {
      suggestions.push({ path: '/storage-map', label: 'Storage Map' });
    }
    if (path.includes('product') || path.includes('model')) {
      suggestions.push({ path: '/models', label: 'RV Models' });
    }
    if (path.includes('blog') || path.includes('article')) {
      suggestions.push({ path: '/blog', label: 'Blog' });
    }
    if (path.includes('about') || path.includes('contact')) {
      suggestions.push({ path: '/about', label: 'About Us' });
    }

    return suggestions.length > 0 ? suggestions : popularPages.slice(0, 3);
  };

  const suggestions = suggestAlternatives();

  return (
    <Layout>
      <SEO
        title="Page Not Found (404) | Smart RV Technology Hub"
        description="The page you're looking for doesn't exist. Explore our smart RV technology guides, product reviews, and digital nomad resources instead."
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        noIndex={true}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: 'Page Not Found', url: typeof window !== 'undefined' ? window.location.href : '' }
          ])
        ]}
      />
      <Container>
        <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 text-center">
          {/* 404 Graphic */}
          <div className="mb-12 relative">
            <div className="text-9xl font-bold text-[#5B9BD5] opacity-20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5B9BD5] to-[#4B8FE3] flex items-center justify-center">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12 max-w-2xl">
            <TypographyH1 className="text-[#5B9BD5] mb-6 text-3xl md:text-4xl">
              Oops! Page Not Found
            </TypographyH1>
            <TypographyP className="text-[#E2E8FF] text-lg mb-4">
              The page you're looking for seems to have driven off into the sunset.
            </TypographyP>
            <TypographyP className="text-[#E2E8FF]/70 text-base">
              Don't worry though – let's get you back on the right route!
            </TypographyP>
            
            {/* Show the attempted URL */}
            <div className="mt-6 p-4 bg-[#151A22] rounded-lg border border-[#1a202c]">
              <p className="text-sm text-[#E2E8FF]/60 mb-1">Requested URL:</p>
              <code className="text-[#5B9BD5] text-sm break-all">
                {location.pathname}
              </code>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mb-12">
            <Button 
              onClick={() => navigate(-1)}
              variant="default"
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white font-medium w-full flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] w-full flex items-center justify-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] w-full flex items-center justify-center"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>

          {/* Smart Suggestions */}
          <div className="w-full max-w-4xl mb-12">
            <h3 className="text-[#5B9BD5] font-semibold mb-6 text-xl">
              Were you looking for one of these?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((page) => {
                const IconComponent = page.icon || Compass;
                return (
                  <button
                    key={page.path}
                    onClick={() => navigate(page.path)}
                    className="p-6 bg-[#151A22] rounded-lg border border-[#1a202c] hover:border-[#5B9BD5] transition-all duration-200 hover:scale-105 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#5B9BD5]/10 flex items-center justify-center group-hover:bg-[#5B9BD5]/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-[#5B9BD5]" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{page.label}</h4>
                        <p className="text-[#E2E8FF]/70 text-sm">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="w-full max-w-md">
            <div className="p-6 bg-[#151A22] rounded-lg border border-[#1a202c]">
              <h4 className="text-[#5B9BD5] font-medium mb-3">Can't find what you need?</h4>
              <p className="text-[#E2E8FF]/70 text-sm mb-4">
                Try searching from our homepage or browse our complete site map.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="sm"
                  className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] flex-1"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Site
                </Button>
                <Button
                  onClick={() => navigate('/sitemap')}
                  variant="ghost"
                  size="sm"
                  className="text-[#E2E8FF] hover:bg-[#131a2a]"
                >
                  Site Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Enhanced404Page;