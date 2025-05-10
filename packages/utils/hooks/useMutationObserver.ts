import { MutableRefObject, useEffect } from 'react';

const defaultOptions: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

export const useMutationObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new MutationObserver(callback);
    observer.observe(ref.current, options);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
};
