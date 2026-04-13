import { DependencyList, useCallback, useEffect, useRef } from 'react';

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
  deps: DependencyList = [],
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line
  return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps);
}
