import { useEffect } from 'react';

const defaultOptions: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

export const useMutationObserver = (
  element: HTMLElement | null | undefined,
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!element) return;

    const observer = new MutationObserver(callback);
    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [element, callback, options]);
};
