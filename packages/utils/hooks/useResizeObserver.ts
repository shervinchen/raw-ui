import { useEffect, useEffectEvent } from 'react';

export const useResizeObserver = (
  element: HTMLElement | null,
  callback: ResizeObserverCallback,
) => {
  const onResize = useEffectEvent(callback);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(onResize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);
};
