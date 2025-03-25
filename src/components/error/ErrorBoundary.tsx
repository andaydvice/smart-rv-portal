
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: {
    message: string;
    statusCode: number;
    stack?: string;
  } | null;
  isRecovering: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isRecovering: false
    };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    // Extract status code if available or default to 500
    const statusCode = error.statusCode || error.status || 500;
    
    return {
      hasError: true,
      error: {
        message: error.message || 'An unexpected error occurred',
        statusCode,
        stack: error.stack
      },
      isRecovering: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ isRecovering: true });
    
    // Simulate recovery process
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        isRecovering: false
      });
    }, 1500);
  };

  render() {
    const { hasError, error, isRecovering } = this.state;
    const { children, fallback } = this.props;

    if (isRecovering) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
          <Loader2 className="h-8 w-8 text-[#5B9BD5] animate-spin mb-4" />
          <p className="text-[#E2E8FF] text-center">Recovering application state...</p>
        </div>
      );
    }

    if (hasError && error) {
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
            <Button 
              onClick={this.handleRetry}
              className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a]"
            >
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
