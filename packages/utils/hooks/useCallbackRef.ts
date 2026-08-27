import { useCallback, useEffect, useRef } from 'react';

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => callbackRef.current?.(...args),
    [],
  ) as T;
}
