import React, {
  PropsWithChildren,
  forwardRef,
  Ref,
  ChangeEvent,
  FocusEvent,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { InputProps } from "./Input.types";
import { useInputCSS } from "./Input.styles";
import { useControlled } from "../utils/hooks";

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  (
    {
      type = "default",
      htmlType = "text",
      placeholder = "",
      defaultValue = "",
      disabled = false,
      readOnly = false,
      className = "",
      autoComplete = 'off',
      value,
      onChange,
      onBlur,
      onFocus,
      ...restProps
    },
    ref: Ref<HTMLInputElement | null>
  ) => {
    const [internalValue, setInternalValue] = useControlled({
      defaultValue,
      value,
    })
    const { className: resolveClassName, styles } = useInputCSS({});
    const classes = classNames(
      "raw-input",
      disabled && "raw-disabled-input",
      className,
      resolveClassName
    );

    const focusHandler = (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
    };

    const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    };

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      setInternalValue(event.target.value);
      onChange?.(event);
    };

    return (
      <>
        <input
          ref={ref}
          type={htmlType}
          className={classes}
          value={internalValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          autoComplete={autoComplete}
          {...restProps}
        />
        {styles}
      </>
    );
  }
);

export default Input;
