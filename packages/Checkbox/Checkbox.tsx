import React, {
  FC,
  ChangeEvent,
  useMemo,
  PropsWithChildren,
  useRef,
  useEffect,
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

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (!indeterminate) setInternalValue(event.target.checked);
    if (inGroup) onGroupChange?.(checkboxValue, event.target.checked);
    onChange?.(event);
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={classes}>
      <VisuallyHiddenInput
        ref={checkboxRef}
        className="raw-checkbox-input"
        type="checkbox"
        disabled={isDisabled}
        checked={selfChecked}
        onChange={changeHandler}
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
