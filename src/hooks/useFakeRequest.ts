import { useCallback, useEffect, useRef, useState } from 'react';
import { useDemoSettings } from '../contexts/DemoSettingsContext';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/** Simulates an AI request. With simulated errors on, the first try fails and the retry succeeds. */
export function useFakeRequest(delay = 1100) {
  const { simulateAiErrors } = useDemoSettings();
  const [status, setStatus] = useState<RequestStatus>('idle');
  const timer = useRef<number>();
  const failedLast = useRef(false);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const run = useCallback(() => {
    window.clearTimeout(timer.current);
    setStatus('loading');
    const shouldFail = simulateAiErrors && !failedLast.current;
    timer.current = window.setTimeout(() => {
      failedLast.current = shouldFail;
      setStatus(shouldFail ? 'error' : 'success');
    }, delay);
  }, [delay, simulateAiErrors]);

  const reset = useCallback(() => {
    window.clearTimeout(timer.current);
    setStatus('idle');
  }, []);

  return { status, run, reset };
}