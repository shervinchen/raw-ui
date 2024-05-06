import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { VisuallyHiddenInput } from '../VisuallyHidden';
import { useSelectContext } from './select-context';

type SelectInputProps = {
  visible: boolean;
  onBlur: () => void;
  onFocus: () => void;
};

const SelectInput = forwardRef<HTMLInputElement | null, SelectInputProps>(
  ({ visible, onBlur, onFocus }, inputRef) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const { selectId } = useSelectContext();

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      inputRef,
      () => ref.current
    );

    useEffect(() => {
      if (visible) {
        ref.current?.focus({
          preventScroll: true,
        });
      }
    }, [visible]);

    return (
      <>
        <VisuallyHiddenInput
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={visible}
          aria-controls={selectId}
          ref={ref}
          type="search"
          autoComplete="off"
          readOnly
          unselectable="on"
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </>
    );
  }
);

SelectInput.displayName = 'RawSelectInput';

export default SelectInput;
