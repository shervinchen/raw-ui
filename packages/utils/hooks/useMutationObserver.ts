import { MutableRefObject, useEffect } from 'react';

const defaultOptions: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

const useMutationObserver = (
  ref: MutableRefObject<HTMLElement | null> | undefined,
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) => {
  useEffect(() => {
    if (!ref?.current) return;
    const observer = new MutationObserver(callback);
    observer.observe(ref.current, options);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

export default useMutationObserver;
