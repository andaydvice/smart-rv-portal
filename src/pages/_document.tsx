
import React from 'react';

// This file was incorrectly using Next.js features in a Vite/React app
// Instead, we should use index.html for document-level configuration
// This component now provides a simple wrapper that can be used if needed
export default function Document({ children }: { children?: React.ReactNode }) {
  return (
    <div className="document-root">
      {children}
    </div>
  );
}
