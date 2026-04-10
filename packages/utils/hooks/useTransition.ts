import { useEffect, useReducer, useRef } from 'react';

export type Canceller = {
  id?: number;
};

export const setAnimationFrameTimeout = (callback: () => void, timeout = 0) => {
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
};

export const clearAnimationFrameTimeout = (canceller: Canceller) => {
  if (canceller.id) cancelAnimationFrame(canceller.id);
};

export type Stage = 'from' | 'enter' | 'leave';

type TransitionState = {
  stage: Stage;
  shouldMount: boolean;
};

type TransitionAction =
  | { type: 'ENTER_START' }
  | { type: 'ENTER_DONE' }
  | { type: 'LEAVE_START' }
  | { type: 'LEAVE_DONE' };

function transitionReducer(
  state: TransitionState,
  action: TransitionAction,
): TransitionState {
  switch (action.type) {
    case 'ENTER_START':
      return { stage: 'from', shouldMount: true };
    case 'ENTER_DONE':
      return { ...state, stage: 'enter' };
    case 'LEAVE_START':
      return { ...state, stage: 'leave' };
    case 'LEAVE_DONE':
      return { ...state, shouldMount: false };
    default:
      return state;
  }
}

export const useTransition = (
  state: boolean,
  enterTimeout: number,
  leaveTimeout: number,
) => {
  const [{ stage, shouldMount }, dispatch] = useReducer(transitionReducer, {
    stage: state ? 'enter' : 'from',
    shouldMount: state,
  });
  const timer = useRef<Canceller>({});

  useEffect(
    function handleStateChange() {
      clearAnimationFrameTimeout(timer.current);

      if (state) {
        dispatch({ type: 'ENTER_START' });
        timer.current = setAnimationFrameTimeout(() => {
          dispatch({ type: 'ENTER_DONE' });
        }, enterTimeout);
      } else {
        dispatch({ type: 'LEAVE_START' });
        timer.current = setAnimationFrameTimeout(() => {
          dispatch({ type: 'LEAVE_DONE' });
        }, leaveTimeout);
      }

      return () => {
        clearAnimationFrameTimeout(timer.current);
      };
    },
    [state, enterTimeout, leaveTimeout],
  );

  return {
    stage,
    shouldMount,
  };
};
