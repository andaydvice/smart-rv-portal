
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  error: {
    message: string;
    statusCode: number;
    stack?: string;
  };
  isRecovering?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoBack?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  isRecovering = false,
  onRetry,
  onGoBack,
  onGoHome = () => window.location.href = '/'
}) => {
  if (isRecovering) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
        <Loader2 className="h-8 w-8 text-[#5B9BD5] animate-spin mb-4" />
        <p className="text-[#E2E8FF] text-center">Recovering application state...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto my-8">
      <Alert variant="destructive" className="bg-[#151A22] border-red-500/50 mb-6">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <AlertTitle className="text-lg font-semibold text-white mb-2">
          {error.statusCode === 404 ? 'Page Not Found' : 'Application Error'}
        </AlertTitle>
        <AlertDescription className="text-[#E2E8FF]">
          {error.statusCode === 404 
            ? "The page you're looking for doesn't exist or has been moved."
            : error.message || "Something went wrong. We're working on fixing it."}
        </AlertDescription>
      </Alert>
      
      {process.env.NODE_ENV === 'development' && error.stack && (
        <div className="mt-4 p-4 bg-[#091020] border border-[#1a202c] rounded-md overflow-x-auto">
          <h3 className="text-[#60A5FA] text-sm font-mono mb-2">Stack Trace:</h3>
          <pre className="text-[#E2E8FF] text-xs whitespace-pre-wrap font-mono">
            {error.stack}
          </pre>
        </div>
      )}
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button 
            onClick={onRetry}
            className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white flex items-center justify-center"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
        
        {onGoBack && (
          <Button 
            onClick={onGoBack}
            variant="outline"
            className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a]"
          >
            Go Back
          </Button>
        )}
        
        <Button 
          onClick={onGoHome}
          variant="outline"
          className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] flex items-center justify-center"
        >
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
