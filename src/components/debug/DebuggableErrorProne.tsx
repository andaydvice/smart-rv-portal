
import React from 'react';
import { withPreviewDebugJSX } from '@/utils/debugging/previewDebuggerWithJSX';
import ErrorProne from './ErrorProne';

// Wrap the error-prone component with our debug wrapper
const DebuggableErrorProne = withPreviewDebugJSX(
  ErrorProne, 
  'ErrorProne', 
  'src/components/debug/ErrorProne.tsx'
);

export default DebuggableErrorProne;
