import { useEffect, useEffectEvent } from 'react';

export const useResize = (
  handler: () => void,
  immediatelyInvoke = true,
): void => {
  const onResize = useEffectEvent(handler);
  const shouldInvokeImmediately = useEffectEvent(() => immediatelyInvoke);

  useEffect(() => {
    if (shouldInvokeImmediately()) {
      onResize();
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
};
