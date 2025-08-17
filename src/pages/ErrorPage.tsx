
import React, { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate, useLocation } from 'react-router-dom';
import { usePageStatus } from '@/hooks/usePageStatus';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import ErrorDisplay from '@/components/error/ErrorDisplay';
import { Container } from '@/components/ui/container';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { OptimizedAffiliateGrid } from '@/components/affiliate/OptimizedAffiliateGrid';
import SEO from '@/components/seo/SEO';
import { organizationSchema, breadcrumbSchema } from '@/components/seo/schemas';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  
  // Detect if this is a 404 from invalid route
  const isInvalidRoute = location.pathname === '/404-redirect' || 
                        (location.pathname !== '/' && !error);
  
  useEffect(() => {
    console.error("Route error encountered:", error);
    console.log("Current path:", location.pathname);
    console.log("Is invalid route:", isInvalidRoute);
    
    // Track 404 errors for analytics
    if (is404 || isInvalidRoute) {
      // Analytics tracking for 404 errors
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_not_found', {
          'page_path': location.pathname,
          'error_type': 'client_404'
        });
      }
    }
  }, [error, location.pathname, isInvalidRoute]);
  
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || (error.status === 404 ? "Page not found" : "An error occurred");
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Force 404 status for invalid routes
  if (isInvalidRoute) {
    statusCode = 404;
    errorMessage = "Page not found";
  }

  const is404 = statusCode === 404 || isInvalidRoute;
  
  // Set proper HTTP status for SEO
  usePageStatus(statusCode);

  return (
    <Layout>
      <SEO
        title={is404 ? "Page Not Found (404) | Smart RV Technology Hub" : `Error (${statusCode}) | Smart RV Technology Hub`}
        description={is404 
          ? "The page you're looking for doesn't exist. Explore our smart RV technology guides, product reviews, and digital nomad resources instead."
          : "We encountered an unexpected error. Please try again or explore our RV technology resources while we resolve the issue."
        }
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        noIndex={true}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: typeof window !== 'undefined' ? window.location.origin : '' },
            { name: is404 ? 'Page Not Found' : 'Error', url: typeof window !== 'undefined' ? window.location.href : '' }
          ])
        ]}
      />
      <Container>
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-8">
            <AlertTriangle className="h-24 w-24 text-[#EF4444] mx-auto mb-6" />
            <TypographyH1 className="text-[#5B9BD5] mb-4">
              {is404 ? "404" : statusCode}
            </TypographyH1>
            <TypographyP className="text-2xl font-semibold text-white mb-4">
              {is404 ? "Page Not Found" : "Error"}
            </TypographyP>
            <TypographyP className="text-[#E2E8FF] max-w-md mx-auto mb-8">
              {is404 
                ? "Oops! The page you're looking for doesn't exist or has been moved. Let's help you find your way back."
                : errorMessage || "We encountered an unexpected error. Our team has been notified."}
            </TypographyP>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
            <Button 
              onClick={() => window.location.reload()}
              variant="default"
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white font-medium w-full flex items-center justify-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] w-full"
            >
              Go Back
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

          {is404 && (
            <div className="mt-12 border-t border-[#1a202c] pt-8 w-full max-w-2xl">
              <h3 className="text-[#5B9BD5] font-semibold mb-4">Popular Pages</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/features')}
                  className="text-[#E2E8FF] hover:text-white hover:bg-[#131a2a]"
                >
                  Features
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/models')}
                  className="text-[#E2E8FF] hover:text-white hover:bg-[#131a2a]"
                >
                  Models
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/blog')}
                  className="text-[#E2E8FF] hover:text-white hover:bg-[#131a2a]"
                >
                  Blog
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-16 w-full max-w-4xl">
            <OptimizedAffiliateGrid
              title="Need Help Getting Back on Track?"
              subtitle="While you're here, check out these trusted RV services and emergency support resources."
              partners={[
                {
                  partner: 'goodsam',
                  title: 'Emergency Roadside Assistance',
                  description: 'Get immediate help when you need it most with 24/7 emergency services',
                  features: ['24/7 emergency help', 'Nationwide coverage', 'Professional technicians', 'Peace of mind']
                },
                {
                  partner: 'technorv',
                  title: 'Technical Support',
                  description: 'Expert technical support for RV systems and smart technology troubleshooting',
                  features: ['Expert technicians', 'Remote diagnostics', 'System troubleshooting', 'Professional guidance']
                },
                {
                  partner: 'rvlife',
                  title: 'Trip Planning & Navigation',
                  description: 'Get back on track with RV-specific GPS and comprehensive trip planning tools',
                  features: ['RV-safe routes', 'Real-time navigation', 'Trip planning', 'Campground finder']
                }
              ]}
              gridCols="3"
              className="text-center"
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ErrorPage;
