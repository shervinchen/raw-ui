import { useEffect } from "react";

const useClickAnyWhere = (handler: (event: Event) => void) => {
  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handler]);
};

export default useClickAnyWhere;
