import { RefObject, useEffect } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit,
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
};
