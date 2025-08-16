import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, Home, Bug, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { safeGtag } from '@/types/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Generate unique error ID for tracking
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for debugging
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Store error info
    this.setState({ errorInfo });
    
    // Call parent error handler if provided
    this.props.onError?.(error, errorInfo);
    
    // Send error to analytics
    safeGtag('event', 'exception', {
      description: error.message,
      fatal: true,
      error_id: this.state.errorId
    });
  }

  handleRetry = () => {
    // Clear error state to retry rendering
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    const errorReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    // Copy error report to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2)).then(() => {
      alert('Error report copied to clipboard. Please email it to support.');
    }).catch(() => {
      // Fallback: show error details in alert
      alert(`Error ID: ${errorId}\nPlease report this error with the ID above.`);
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorId } = this.state;
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-[#080F1F] text-white flex items-center justify-center p-4">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              {/* Error Icon */}
              <div className="mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-12 w-12 text-white" />
                </div>
                
                <TypographyH1 className="text-[#5B9BD5] mb-4">
                  Something Went Wrong
                </TypographyH1>
                
                <TypographyP className="text-[#E2E8FF] mb-6">
                  We encountered an unexpected error. Our team has been notified and is working on a fix.
                </TypographyP>
                
                {/* Error ID for support */}
                <div className="mb-6 p-4 bg-[#151A22] rounded-lg border border-[#1a202c]">
                  <p className="text-sm text-[#E2E8FF]/60 mb-1">Error ID:</p>
                  <code className="text-[#5B9BD5] text-sm font-mono">
                    {errorId}
                  </code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Button 
                  onClick={this.handleRetry}
                  variant="default"
                  className="bg-[#5B9BD5] hover:bg-[#4B8FE3] text-white font-medium w-full"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={this.handleReload}
                  variant="outline"
                  className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] w-full"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reload Page
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] w-full"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
                
                <Button 
                  onClick={this.handleReportError}
                  variant="outline"
                  className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#131a2a] w-full"
                >
                  <Bug className="mr-2 h-4 w-4" />
                  Report Error
                </Button>
              </div>

              {/* Development Error Details */}
              {isDevelopment && error && (
                <details className="text-left bg-[#151A22] rounded-lg border border-[#1a202c] p-4">
                  <summary className="cursor-pointer text-[#5B9BD5] font-medium mb-2">
                    Development Error Details
                  </summary>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#E2E8FF] font-medium mb-1">Error Message:</h4>
                      <pre className="text-red-400 text-sm bg-[#0a0a0a] p-2 rounded overflow-x-auto">
                        {error.message}
                      </pre>
                    </div>
                    {error.stack && (
                      <div>
                        <h4 className="text-[#E2E8FF] font-medium mb-1">Stack Trace:</h4>
                        <pre className="text-gray-400 text-xs bg-[#0a0a0a] p-2 rounded overflow-x-auto max-h-48">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Support Contact */}
              <div className="mt-8 p-4 bg-[#151A22] rounded-lg border border-[#1a202c]">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-[#5B9BD5]" />
                  <span className="text-[#5B9BD5] font-medium">Need Help?</span>
                </div>
                <p className="text-[#E2E8FF]/70 text-sm">
                  If this problem persists, please contact our support team with the error ID above.
                </p>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EnhancedErrorBoundary;