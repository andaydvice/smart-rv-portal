
import React, { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import ErrorDisplay from '@/components/error/ErrorDisplay';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  
  useEffect(() => {
    // Log error for debugging
    console.error("Route error encountered:", error);
    console.log("Current path:", location.pathname);
  }, [error, location.pathname]);
  
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || (error.status === 404 ? "Page not found" : "An error occurred");
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const is404 = statusCode === 404;
  const isAuthError = location.pathname === '/auth' || location.pathname.startsWith('/auth/');

  // For auth-related errors, provide more specific guidance
  if (isAuthError) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <ErrorDisplay 
            error={{
              message: "We're having trouble with the authentication system",
              statusCode: statusCode,
              stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
            }}
            onRetry={() => window.location.reload()}
            onGoBack={() => navigate(-1)}
            onGoHome={() => navigate('/')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <AlertTriangle size={64} className="text-[#EF4444]" />
          </div>
          <h1 className="text-5xl font-bold text-[#5B9BD5] mb-4">
            {is404 ? "404" : statusCode}
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-6">
            {is404 ? "Page Not Found" : "Error"}
          </h2>
          <p className="text-[#E2E8FF] mb-8">
            {is404 
              ? "The page you're looking for doesn't exist or has been moved."
              : errorMessage || "Something unexpected happened. We're working on fixing it."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.reload()}
              variant="default"
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white flex items-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a]"
            >
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] flex items-center"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;
