import React, {
  PropsWithChildren,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { InputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  (
    {
      type = 'default',
      htmlType = 'text',
      placeholder = '',
      initialValue = '',
      disabled = false,
      readOnly = false,
      className = '',
      value,
      onChange,
      onBlur,
      onFocus,
      ...restProps
    },
    ref: Ref<HTMLInputElement | null>
  ) => {
    const classes = classNames('raw-input', className);

    const focusHandler = () => {};

    const blurHandler = () => {};

    const changeHandler = () => {};

    return (
      <input
        type={htmlType}
        ref={ref}
        className={classes}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={changeHandler}
        {...restProps}
      />
    );
  }
);

export default Input;
