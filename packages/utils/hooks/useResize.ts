import { useEffect } from 'react';

export const useResize = (
  handler: () => void,
  immediatelyInvoke = true
): void => {
  useEffect(() => {
    if (immediatelyInvoke) {
      handler();
    }

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
