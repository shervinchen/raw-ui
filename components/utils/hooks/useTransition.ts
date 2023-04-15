import { useEffect, useRef, useState } from "react";

type Canceller = {
  id?: number;
};

function setAnimationFrameTimeout(
  callback: () => void,
  timeout: number = 0
) {
  const startTime = performance.now();
  const canceller: Canceller = {};

  function call() {
    canceller.id = requestAnimationFrame((now) => {
      if (now - startTime > timeout) {
        callback();
      } else {
        call();
      }
    });
  }

  call();
  return canceller;
}

function clearAnimationFrameTimeout(canceller: Canceller) {
  if (canceller.id) cancelAnimationFrame(canceller.id);
}

export type Stage = "from" | "enter" | "leave";

const useTransition = (state: boolean, timeout: number) => {
  const [stage, setStage] = useState<Stage>(state ? "enter" : "from");
  const timer = useRef<Canceller>({});
  const [shouldMount, setShouldMount] = useState(state);

  useEffect(
    function handleStateChange() {
      clearAnimationFrameTimeout(timer.current);

      if (state) {
        setStage("from");
        setShouldMount(true);
        timer.current = setAnimationFrameTimeout(() => {
          setStage("enter");
        });
      } else {
        setStage("leave");
        timer.current = setAnimationFrameTimeout(() => {
          setShouldMount(false);
        }, timeout);
      }

      return () => {
        clearAnimationFrameTimeout(timer.current);
      };
    },
    [state, timeout]
  );

  return {
    stage,
    shouldMount,
  };
}

export default useTransition;