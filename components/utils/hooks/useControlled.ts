import { useState, SetStateAction } from "react";
import { useCallbackRef } from "./useCallbackRef";

interface UseControlledProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  shouldUpdate?: (prevState: T, nextState: T) => boolean;
}

type SetStateFn<T> = (prevState?: T) => T;

export default function useControlled<T>({
  value: controlledState,
  defaultValue,
  onChange: onChangeProp,
  shouldUpdate: shouldUpdateProp = (prevState, nextState) => prevState !== nextState,
}: UseControlledProps<T>) {
  const isControlled = controlledState !== undefined;
  const [unControlledState, setUnControlledState] = useState(defaultValue);
  const value = isControlled ? controlledState : unControlledState;
  const onChange = useCallbackRef(onChangeProp);
  const shouldUpdate = useCallbackRef(shouldUpdateProp);

  const setValue = useCallbackRef(
    (nextValue: SetStateAction<T>) => {
      const setter = nextValue as SetStateFn<T>;
      const nextState =
        typeof nextValue === "function" ? setter(value) : nextValue;

      if (!shouldUpdate(value, nextState)) {
        return;
      }

      if (!isControlled) {
        setUnControlledState(nextState);
      }

      onChange?.(nextState);
    },
    [value, isControlled, onChange, shouldUpdate]
  );

  return [value, setValue] as const;
}
