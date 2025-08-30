import React from 'react';
import InteractiveRVHeader from './InteractiveRVHeader';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class SplineErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Silent error handling - just show the interactive header
  }

  render() {
    // Always show the interactive header now, regardless of errors
    return <InteractiveRVHeader />;
  }
}

export default SplineErrorBoundary;