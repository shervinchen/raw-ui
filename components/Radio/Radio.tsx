import React, { FC, ChangeEvent, useEffect, useMemo } from "react";
import classNames from "classnames";
import { RadioProps } from "./Radio.types";
import { useControlled } from "../utils/hooks";
import { RawUITheme } from "../Theme/preset/preset.type";
import { useTheme } from "../Theme/theme-context";
import { useRadioGroupContext } from "./radio-group-context";

const Radio: FC<RadioProps> = ({
  defaultChecked = false,
  checked,
  value: radioValue,
  disabled = false,
  onChange,
  className = "",
  children,
  ...restProps
}) => {
  const theme: RawUITheme = useTheme();
  const { inGroup, groupDisabled, groupValue, onGroupChange } = useRadioGroupContext()
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue: defaultChecked,
    value: checked,
  });
  const isDisabled = inGroup ? groupDisabled || disabled : disabled;
  const selfChecked = useMemo(() => {
    if (!inGroup) {
      return internalValue
    }
    return groupValue === radioValue
  }, [internalValue, inGroup, groupValue, radioValue])

  const radioClasses = classNames("raw-radio", className);
  const radioInnerClasses = classNames(
    "raw-radio-inner",
    selfChecked && "checked"
  );

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    setInternalValue(event.target.checked);
    if (inGroup) onGroupChange?.(radioValue)
    onChange?.(event);
  };

  return (
    <label className={radioClasses}>
      <input
        className="raw-radio-input"
        type="radio"
        disabled={isDisabled}
        checked={selfChecked}
        onChange={changeHandler}
        {...restProps}
      />
      <span className={radioInnerClasses} />
      {children && <span className="raw-radio-text">{children}</span>}
      <style jsx>
        {`
          .raw-radio {
            position: relative;
            display: inline-flex;
            align-items: center;
            cursor: ${isDisabled ? "not-allowed" : "pointer"};
            opacity: ${isDisabled ? 0.5 : 1};
            gap: 8px;
          }
          .raw-radio-input {
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
          .raw-radio-inner {
            position: relative;
            width: 14px;
            height: 14px;
            border: 1px solid
              ${selfChecked ? theme.palette.black : theme.palette.accents7};
            border-radius: 50%;
          }
          .raw-radio-inner:after {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            background-color: ${theme.palette.black};
            transition: transform 0.15s ease;
            transform: translate(-50%, -50%) scale(0);
          }
          .raw-radio-inner.checked:after {
            transform: translate(-50%, -50%) scale(1);
          }
          .raw-radio-text {
            font-size: 14px;
            line-height: normal;
            user-select: none;
          }
        `}
      </style>
    </label>
  );
};

export default Radio;
