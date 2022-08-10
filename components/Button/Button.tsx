import React, {
  FC,
  forwardRef,
  Ref,
  PropsWithChildren,
  MouseEvent,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useButtonCSS } from './Button.styles';
import { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    {
      className = '',
      size = 'md',
      type = 'default',
      variant = 'default',
      htmlType = 'button',
      loading = false,
      disabled = false,
      onClick,
      children,
      ...restProps
    },
    ref: Ref<HTMLButtonElement | null>
  ) => {
    const { className: resolveClassName, styles } = useButtonCSS({
      type,
      size,
      variant,
      loading,
      disabled,
    });

    const classes = classNames('raw-button', className, resolveClassName);

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      onClick && onClick(event);
    };

    return (
      <button
        ref={ref}
        type={htmlType}
        className={classes}
        onClick={clickHandler}
        {...restProps}
      >
        <span className="raw-button-text">{children}</span>
        {styles}
      </button>
    );
  }
);

export default Button;
