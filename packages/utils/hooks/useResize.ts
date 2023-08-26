import { useEffect } from 'react';

const useResize = (handler: () => void, immediatelyInvoke = true): void => {
  useEffect(() => {
    if (immediatelyInvoke) {
      handler();
    }

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useResize;
