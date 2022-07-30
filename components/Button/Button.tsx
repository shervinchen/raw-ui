import React, {
  FC,
  forwardRef,
  Ref,
  PropsWithChildren,
  MouseEvent,
} from 'react';
import classNames from 'classnames';

import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    {
      className = '',
      size = 'md',
      type = 'default',
      variant,
      htmlType = 'button',
      loading = false,
      disabled = false,
      onClick,
      children,
      ...restProps
    },
    ref: Ref<HTMLButtonElement | null>
  ) => {
    const classes = classNames('raw-button', className, {
      [`raw-button-${type}`]: type,
      [`raw-button-${size}`]: size,
      ['raw-button-outline']: variant === 'outline',
      ['raw-button-ghost']: variant === 'ghost',
      ['raw-button-shadow']: variant === 'shadow',
      ['raw-button-disabled']: disabled,
      ['raw-button-loading']: loading,
    });

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
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
        <style jsx>{styles}</style>
      </button>
    );
  }
);

export default Button;
