import React, {
  FC,
  ChangeEvent,
  useEffect,
} from "react";
import classNames from "classnames";
import CheckboxIcon from "./CheckboxIcon";
import { CheckboxProps } from "./Checkbox.types";
import { useControlled } from "../utils/hooks";

const Checkbox: FC<CheckboxProps> = ({
  defaultChecked = false,
  checked,
  disabled = false,
  onChange,
  className = "",
  children,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue: defaultChecked,
    value: checked,
  });
  const isDisabled = false
  const classes = classNames(
    "raw-checkbox",
    className,
  );

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return
    setInternalValue(event.target.checked)
    onChange?.(event);
  }

  return (
    <label className={classes}>
      <CheckboxIcon checked={internalValue} />
      <input
        className="raw-checkbox-input"
        type="checkbox"
        disabled={isDisabled}
        checked={internalValue}
        onChange={changeHandler}
        {...restProps}
      />
      {children && <span className="raw-checkbox-text">{children}</span>}
      <style jsx>{`
        .raw-checkbox {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          opacity: ${isDisabled ? 0.75 : 1};
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
