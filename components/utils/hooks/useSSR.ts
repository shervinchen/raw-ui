import { useEffect, useState } from "react";

type SSRState = {
  isBrowser: boolean;
  isServer: boolean;
};

const isBrowser = (): boolean => {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
};

const useSSR = (): SSRState => {
  const [browser, setBrowser] = useState<boolean>(false);

  useEffect(() => {
    setBrowser(isBrowser());
  }, []);

  return {
    isBrowser: browser,
    isServer: !browser,
  };
};

export default useSSR;
