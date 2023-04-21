import React, { FC, ChangeEvent } from "react";
import classNames from "classnames";
import { ToggleProps } from "./Toggle.types";
import { useControlled } from "../utils/hooks";
import { useToggleCSS } from "./Toggle.styles";
import { VisuallyHiddenInput } from "../VisuallyHidden";

const Toggle: FC<ToggleProps> = ({
  defaultChecked = false,
  checked,
  disabled = false,
  onChange,
  className = "",
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue: defaultChecked,
    value: checked,
  });
  const { className: resolveClassName, styles } = useToggleCSS({
    checked: internalValue,
    disabled,
  });
  const toggleClasses = classNames("raw-toggle", className, resolveClassName);
  const toggleInnerClasses = classNames("raw-toggle-inner");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setInternalValue(event.target.checked);
    onChange?.(event);
  };

  return (
    <label className={toggleClasses}>
      <VisuallyHiddenInput
        className="raw-toggle-input"
        type="checkbox"
        disabled={disabled}
        checked={internalValue}
        onChange={changeHandler}
        {...restProps}
      />
      <span className={toggleInnerClasses}>
        <div className="raw-toggle-thumb" />
      </span>
      {styles}
    </label>
  );
};

Toggle.displayName = 'RawToggle';

export default Toggle;
