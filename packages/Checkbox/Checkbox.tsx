import React, {
  FC,
  ChangeEvent,
  useMemo,
  PropsWithChildren,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import CheckboxIcon from './CheckboxIcon';
import { CheckboxProps } from './Checkbox.types';
import { useControlled } from '../utils/hooks';
import { useCheckboxGroupContext } from './checkbox-group-context';
import { VisuallyHiddenInput } from '../VisuallyHidden';

const Checkbox: FC<PropsWithChildren<CheckboxProps>> = ({
  defaultChecked = false,
  checked,
  value: checkboxValue,
  disabled = false,
  indeterminate = false,
  onChange,
  className = '',
  children,
  ...restProps
}) => {
  const { inGroup, groupDisabled, groupValue, onGroupChange } =
    useCheckboxGroupContext();
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue: defaultChecked,
    value: checked,
  });
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isDisabled = inGroup ? groupDisabled || disabled : disabled;
  const classes = classNames('raw-checkbox', className);

  const selfChecked = useMemo(() => {
    if (!inGroup) {
      return internalValue;
    }
    return groupValue.includes(checkboxValue);
  }, [internalValue, inGroup, groupValue, checkboxValue]);

  const setIndeterminate = useCallback(() => {
    const checkBox = checkboxRef.current as HTMLInputElement;
    if (indeterminate) {
      checkBox.indeterminate = true;
    } else if (checkBox.indeterminate) {
      checkBox.indeterminate = false;
    }
  }, [indeterminate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    setIndeterminate();
    if (!indeterminate) setInternalValue(event.target.checked);
    if (inGroup) onGroupChange?.(checkboxValue, event.target.checked);
    onChange?.(event);
  };

  useEffect(() => {
    setIndeterminate();
  }, [checkboxRef, indeterminate, setIndeterminate]);

  return (
    <label className={classes} data-testid="checkboxLabel">
      <VisuallyHiddenInput
        ref={checkboxRef}
        className="raw-checkbox-input"
        type="checkbox"
        disabled={isDisabled}
        checked={selfChecked}
        onChange={handleChange}
        aria-checked={indeterminate ? 'mixed' : selfChecked ? 'true' : 'false'}
        {...restProps}
      />
      <CheckboxIcon checked={selfChecked} indeterminate={indeterminate} />
      {children && <span className="raw-checkbox-text">{children}</span>}
      <style jsx>{`
        .raw-checkbox {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          opacity: ${isDisabled ? 0.5 : 1};
          gap: 8px;
        }
        .raw-checkbox-text {
          font-size: 14px;
          line-height: normal;
          user-select: none;
        }
      `}</style>
    </label>
  );
};

Checkbox.displayName = 'RawCheckbox';

export default Checkbox;
