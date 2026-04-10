import { useState } from 'react';
import { isBrowser } from '../common';

type SSRState = {
  isBrowser: boolean;
  isServer: boolean;
};

export const useSSR = (): SSRState => {
  const [browser] = useState<boolean>(() => isBrowser());

  return {
    isBrowser: browser,
    isServer: !browser,
  };
};
