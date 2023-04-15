import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { VisuallyHiddenInput } from "../VisuallyHidden";

type SelectInputProps = {
  visible: boolean;
  onBlur: () => void;
  onFocus: () => void;
};

const SelectInput = forwardRef<HTMLInputElement | null, SelectInputProps>(
  ({ visible, onBlur, onFocus }, inputRef) => {
    const ref = useRef<HTMLInputElement | null>(null);

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      inputRef,
      () => ref.current
    );

    useEffect(() => {
      if (visible) {
        ref.current?.focus({
          preventScroll: true 
        });
      }
    }, [visible]);

    return (
      <>
        <VisuallyHiddenInput
          ref={ref}
          type="search"
          role="combobox"
          aria-haspopup="listbox"
          readOnly
          unselectable="on"
          aria-expanded={visible}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </>
    );
  }
);

export default SelectInput;
