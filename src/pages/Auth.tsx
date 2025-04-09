
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForms } from '@/components/auth/AuthForms';
import { useAuth } from '@/components/auth/AuthContext';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Layout from "@/components/layout/Layout";
import { useErrorHandler } from '@/hooks/useErrorHandler';
import ErrorDisplay from '@/components/error/ErrorDisplay';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error: authError } = useAuth();
  const { error, handleError, resetError, isRecovering } = useErrorHandler();
  const [hasInitialized, setHasInitialized] = useState(false);
  
  console.log("Auth page - Current auth state:", { user: user?.email || 'No user', loading, authError });

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // Mark as initialized after first render to prevent flash of error state
    if (!hasInitialized) {
      setHasInitialized(true);
      return;
    }

    if (user) {
      console.log("Auth page - Redirecting authenticated user to:", from);
      navigate(from);
    }
  }, [user, navigate, from, hasInitialized]);

  // If we're still loading, show a loading state
  if (loading && !hasInitialized) {
    return (
      <Layout>
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4 py-12 pt-24">
          <div className="w-full max-w-md text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5B9BD5] mx-auto mb-4"></div>
            <p className="text-white">Checking authentication status...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // If we have an error from AuthContext, show it
  if (authError && hasInitialized) {
    return (
      <Layout>
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4 py-12 pt-24">
          <ErrorDisplay
            error={{
              message: `Authentication system issue: ${authError.message}`,
              statusCode: 401,
              stack: process.env.NODE_ENV === 'development' ? authError.stack : undefined
            }}
            isRecovering={isRecovering}
            onRetry={() => window.location.reload()}
            onGoBack={() => navigate(-1)}
            onGoHome={() => navigate('/')}
          />
        </div>
      </Layout>
    );
  }

  // If we have an error from error handler, show it
  if (error && hasInitialized) {
    return (
      <Layout>
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4 py-12 pt-24">
          <ErrorDisplay
            error={error}
            isRecovering={isRecovering}
            onRetry={resetError}
            onGoBack={() => navigate(-1)}
            onGoHome={() => navigate('/')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">
              Join Smart RV Living
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Why Create an Account?
              </h2>
              <ul className="space-y-4 text-left text-white">
                <li className="flex items-start gap-3">
                  <span className="text-[#5B9BD5] text-lg">✓</span>
                  <span>Access exclusive RV calculators and tools to plan your trips better</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#5B9BD5] text-lg">✓</span>
                  <span>Get personalized weather alerts and route recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#5B9BD5] text-lg">✓</span>
                  <span>Save your favorite storage facilities and camping spots</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#5B9BD5] text-lg">✓</span>
                  <span>Track your RV maintenance history and get reminders</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <Card className="p-6 bg-[#131a2a] border-gray-700">
              <AuthForms 
                onSuccess={() => navigate(from)} 
                onError={(error) => handleError(error)}
              />
            </Card>
            
            <div className="text-sm text-white px-4">
              <p>By creating an account, you'll get access to our premium features and tools designed specifically for RV enthusiasts. We respect your privacy and will never share your information.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
