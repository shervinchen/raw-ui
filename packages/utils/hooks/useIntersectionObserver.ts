import { useEffect } from 'react';

export const useIntersectionObserver = (
  element: HTMLElement | null | undefined,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
) => {
  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, callback, options]);
};
