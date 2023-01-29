import React, {
  PropsWithChildren,
  forwardRef,
  Ref,
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

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  (
    {
      type = "default",
      htmlType = "text",
      placeholder = "",
      initialValue = "",
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
    const { className: resolveClassName, styles } = useInputCSS({});
    const classes = classNames(
      "raw-input",
      className,
      resolveClassName
    );

    const focusHandler = (event: FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(event);
    };

    const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(event);
    };

    const changeHandler = () => {};

    return (
      <>
        <input
          ref={ref}
          type={htmlType}
          className={classes}
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
