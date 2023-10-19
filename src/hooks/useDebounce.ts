import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<F extends (...args: any[]) => unknown>(func: F, delay = 200): F {
  const timeoutId = useRef<number>();

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<F>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  ) as F;
}
