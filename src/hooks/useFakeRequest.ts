import { useCallback, useEffect, useRef, useState } from 'react';

export type RequestStatus = 'idle' | 'loading' | 'success';

export function useFakeRequest(delay = 1100) {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = useCallback(() => {
    window.clearTimeout(timer.current);
    setStatus('loading');
    timer.current = window.setTimeout(() => setStatus('success'), delay);
  }, [delay]);

  const reset = useCallback(() => {
    window.clearTimeout(timer.current);
    setStatus('idle');
  }, []);

  return { status, run, reset };
}