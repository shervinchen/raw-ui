import { useEffect, useState } from 'react';
import { isBrowser } from '../common';

type SSRState = {
  isBrowser: boolean;
  isServer: boolean;
};

export const useSSR = (): SSRState => {
  const [browser, setBrowser] = useState<boolean>(false);

  useEffect(() => {
    setBrowser(isBrowser());
  }, []);

  return {
    isBrowser: browser,
    isServer: !browser,
  };
};
