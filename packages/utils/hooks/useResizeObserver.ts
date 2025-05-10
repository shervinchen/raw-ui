import { MutableRefObject, useEffect } from 'react';

export const useResizeObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: ResizeObserverCallback
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(callback);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
};
