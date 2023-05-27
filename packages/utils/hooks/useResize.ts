import { useEffect } from 'react';

const useResize = (handler: () => void, immediatelyInvoke = true): void => {
  useEffect(() => {
    if (immediatelyInvoke) {
      handler();
    }

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [handler, immediatelyInvoke]);
};

export default useResize;
