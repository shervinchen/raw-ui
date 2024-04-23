import { useEffect } from 'react';

export const useClickAnyWhere = (handler: (event: Event) => void) => {
  useEffect(() => {
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [handler]);
};
