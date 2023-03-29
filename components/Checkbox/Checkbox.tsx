import React, {
  FC,
  ChangeEvent,
  useEffect,
  useMemo,
} from "react";
import classNames from "classnames";
import CheckboxIcon from "./CheckboxIcon";
import { CheckboxProps } from "./Checkbox.types";
import { useControlled } from "../utils/hooks";
import { useCheckboxGroupContext } from "./checkbox-group-context";

const Checkbox: FC<CheckboxProps> = ({
  defaultChecked = false,
  checked,
  value: checkboxValue,
  disabled = false,
  indeterminate = false,
  onChange,
  className = "",
  children,
  ...restProps
}) => {
  const { inGroup, groupDisabled, groupValue, onGroupChange } = useCheckboxGroupContext()
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue: defaultChecked,
    value: checked,
  });
  const isDisabled = inGroup ? groupDisabled || disabled : disabled;
  const classes = classNames(
    "raw-checkbox",
    className,
  );

  const selfChecked = useMemo(() => {
    if (!inGroup) {
      return internalValue
    }
    return groupValue.includes(checkboxValue)
  }, [internalValue, inGroup, groupValue, checkboxValue])

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return
    if (!indeterminate) setInternalValue(event.target.checked)
    if (inGroup) onGroupChange?.(checkboxValue, event.target.checked)
    onChange?.(event);
  }

  return (
    <label className={classes}>
      <CheckboxIcon checked={selfChecked} indeterminate={indeterminate} />
      <input
        className="raw-checkbox-input"
        type="checkbox"
        disabled={isDisabled}
        checked={selfChecked}
        onChange={changeHandler}
        {...restProps}
      />
      {children && <span className="raw-checkbox-text">{children}</span>}
      <style jsx>{`
        .raw-checkbox {
          display: inline-flex;
          align-items: center;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          opacity: ${isDisabled ? 0.5 : 1};
        }
        .raw-checkbox-input {
          position: absolute;
          opacity: 0;
          outline: none;
          width: 0;
          height: 0;
          margin: 0;
          padding: 0;
          z-index: -1;
          font-size: 0;
          background-color: transparent;
        }
        .raw-checkbox-text {
          font-size: 14px;
          line-height: normal;
          margin-left: 8px;
          user-select: none;
        }
      `}</style>
    </label>
  )
}

export default Checkbox;
