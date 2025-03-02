
import { useState, useRef, useEffect } from 'react';

// Generic hook for maintaining state with refs for immediate access
export function useRefState<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const ref = useRef<T>(state);
  
  useEffect(() => {
    ref.current = state;
  }, [state]);
  
  const setStateAndRef = (value: T) => {
    setState(value);
    ref.current = value;
  };
  
  return [state, setStateAndRef, ref] as const;
}
