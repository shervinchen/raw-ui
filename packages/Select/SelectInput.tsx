import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { VisuallyHiddenInput } from '../VisuallyHidden';
import { useSelectContext } from './select-context';
import { SelectInputProps } from './SelectInput.types';

const SelectInput = ({ visible, ref, onBlur, onFocus }: SelectInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { selectId } = useSelectContext();

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus({
        preventScroll: true,
      });
    }
  }, [visible]);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  return (
    <>
      <VisuallyHiddenInput
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={visible}
        aria-controls={selectId}
        ref={inputRef}
        type="search"
        autoComplete="off"
        readOnly
        unselectable="on"
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </>
  );
};

SelectInput.displayName = 'RawSelectInput';

export default SelectInput;
