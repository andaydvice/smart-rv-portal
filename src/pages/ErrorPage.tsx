import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

interface ErrorPageProps {
  code?: string;
  message?: string;
  showHomeButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = "404",
  message = "Page not found",
  showHomeButton = true
}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <Helmet>
        <title>{code} - Error | Smart RV Portal</title>
        <meta name="description" content="An error occurred. Return to the Smart RV Portal homepage or try refreshing the page." />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/20 rounded-full mb-6">
              <AlertTriangle className="w-12 h-12 text-red-400" />
            </div>
            
            <motion.h1 
              className="text-6xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {code}
            </motion.h1>
            
            <motion.h2 
              className="text-2xl font-semibold text-gray-300 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {message}
            </motion.h2>
            
            <motion.p 
              className="text-gray-400 text-lg mb-12 max-w-md mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Don't worry, even the best navigation systems sometimes take a wrong turn. 
              Let's get you back on the right road.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {showHomeButton && (
              <Link to="/">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
            )}
            
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="border-gray-600 text-white hover:bg-gray-700 px-8 py-3 rounded-lg flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </Button>
            
            <Link to="/search">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-700 px-8 py-3 rounded-lg flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search Site
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-500 text-sm">
              Need assistance? <Link to="/contact" className="text-blue-400 hover:underline">Contact our support team</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;