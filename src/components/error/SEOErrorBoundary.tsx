/**
 * SEO-aware Error Boundary Component
 * Provides enhanced error handling with SEO considerations and graceful degradation
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { trackError } from '@/utils/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isRecovering: boolean;
  retryCount: number;
}

class SEOErrorBoundary extends Component<Props, State> {
  private retryTimeout: NodeJS.Timeout | null = null;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRecovering: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track error with analytics
    trackError('seo_component_error', error.message, error.stack);

    // Update document title for SEO
    this.updateErrorMetadata(error);

    // Store error info
    this.setState({ errorInfo });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Log detailed error information
    console.group('🚨 SEO Error Boundary Caught Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();

    // Attempt automatic recovery for specific error types
    this.attemptAutoRecovery(error);
  }

  private updateErrorMetadata(error: Error): void {
    // Update page title to indicate error state
    const originalTitle = document.title;
    document.title = `Error - ${originalTitle.replace(/^Error - /, '')}`;

    // Add noindex meta tag to prevent indexing of error states
    const noIndexMeta = document.createElement('meta');
    noIndexMeta.name = 'robots';
    noIndexMeta.content = 'noindex,nofollow';
    noIndexMeta.id = 'error-noindex';
    
    // Remove existing error meta tag
    const existingMeta = document.getElementById('error-noindex');
    if (existingMeta) {
      existingMeta.remove();
    }
    
    document.head.appendChild(noIndexMeta);

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('data-original-content', metaDescription.getAttribute('content') || '');
      metaDescription.setAttribute('content', 'An error occurred while loading this page. Please refresh to try again.');
    }
  }

  private restoreMetadata(): void {
    // Restore original title
    const title = document.title.replace(/^Error - /, '');
    document.title = title;

    // Remove error noindex meta tag
    const errorMeta = document.getElementById('error-noindex');
    if (errorMeta) {
      errorMeta.remove();
    }

    // Restore original meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const originalContent = metaDescription.getAttribute('data-original-content');
      if (originalContent) {
        metaDescription.setAttribute('content', originalContent);
        metaDescription.removeAttribute('data-original-content');
      }
    }
  }

  private attemptAutoRecovery(error: Error): void {
    const { retryCount } = this.state;

    // Check if error is recoverable and retry count is within limits
    if (this.isRecoverableError(error) && retryCount < this.maxRetries) {
      this.retryTimeout = setTimeout(() => {
        this.handleRetry();
      }, Math.pow(2, retryCount) * 1000); // Exponential backoff
    }
  }

  private isRecoverableError(error: Error): boolean {
    // Define recoverable error patterns
    const recoverablePatterns = [
      /ChunkLoadError/,
      /Loading chunk \d+ failed/,
      /Failed to fetch dynamically imported module/,
      /NetworkError/,
      /fetch.*failed/i
    ];

    return recoverablePatterns.some(pattern => 
      pattern.test(error.message) || pattern.test(error.name)
    );
  }

  private handleRetry = (): void => {
    this.setState({ isRecovering: true });

    // Clear error state after a short delay
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRecovering: false,
        retryCount: this.state.retryCount + 1
      });

      // Restore metadata
      this.restoreMetadata();
    }, 1000);
  };

  private handleManualRetry = (): void => {
    this.setState({ retryCount: 0 }); // Reset retry count for manual retry
    this.handleRetry();
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  private handleGoBack = (): void => {
    window.history.back();
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    const { hasError, error, errorInfo, isRecovering, retryCount } = this.state;
    const { children, fallback, showDetails = false } = this.props;

    if (isRecovering) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <RefreshCw className="h-8 w-8 text-text-connectivity-accent mx-auto animate-spin" />
            <h2 className="text-xl font-semibold text-white">Recovering...</h2>
            <p className="text-gray-400">
              Attempting to restore the page. Please wait a moment.
            </p>
          </div>
        </div>
      );
    }

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Default error UI
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            {/* Error Icon and Title */}
            <div className="text-center space-y-4">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
              <h1 className="text-3xl font-bold text-white">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-gray-300">
                We encountered an unexpected error while loading this content.
              </p>
            </div>

            {/* Error Details (if enabled and in development) */}
            {showDetails && error && import.meta.env.DEV && (
              <Alert className="border-red-500 bg-red-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-left">
                  <details className="space-y-2">
                    <summary className="cursor-pointer font-medium text-red-400">
                      Error Details (Development Only)
                    </summary>
                    <div className="mt-2 space-y-2 text-sm">
                      <div>
                        <strong>Error:</strong> {error.name}
                      </div>
                      <div>
                        <strong>Message:</strong> {error.message}
                      </div>
                      {errorInfo && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 p-2 bg-black/30 rounded text-xs overflow-x-auto">
                            {errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                </AlertDescription>
              </Alert>
            )}

            {/* Retry Information */}
            {retryCount > 0 && (
              <Alert className="border-yellow-500 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  We've automatically attempted to recover {retryCount} time{retryCount !== 1 ? 's' : ''}.
                  {retryCount >= this.maxRetries && ' Maximum retry attempts reached.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {retryCount < this.maxRetries && (
                <Button 
                  onClick={this.handleManualRetry}
                  className="bg-text-connectivity-accent hover:bg-text-connectivity-accent/90"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
              
              <Button 
                onClick={this.handleReload}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
              
              <Button 
                onClick={this.handleGoBack}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Button 
                onClick={this.handleGoHome}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Home Page
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-gray-400 space-y-2">
              <p>
                If this problem persists, please try:
              </p>
              <ul className="space-y-1">
                <li>• Refreshing the page</li>
                <li>• Clearing your browser cache</li>
                <li>• Checking your internet connection</li>
                <li>• Contacting support if the issue continues</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default SEOErrorBoundary;