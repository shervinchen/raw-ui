import React, {
  FC,
  forwardRef,
  Ref,
  PropsWithChildren,
  MouseEvent,
} from 'react';
import classNames from 'classnames';

import { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (
    {
      className = '',
      size = 'md',
      type = 'default',
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
        <style jsx>{`
          .raw-button {
            box-sizing: border-box;
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            border: 1px solid;
            border-radius: 6px;
            min-width: min-content;
            font-weight: 400;
            transition-property: border-color, background, color, transform,
              box-shadow;
            transition-duration: 0.2s;
            transition-timing-function: ease;
            text-transform: capitalize;
            cursor: pointer;
            white-space: nowrap;
            appearance: none;
            outline: none;
            user-select: none;
          }

          .raw-button-sm {
            font-size: 12px;
            line-height: 16px;
            height: 34px;
            padding: 8px 12px;
          }

          .raw-button-md {
            font-size: 14px;
            line-height: 20px;
            height: 40px;
            padding: 8px 16px;
          }

          .raw-button-lg {
            font-size: 16px;
            ling-height: 24px;
            height: 46px;
            padding: 10px 20px;
          }

          .raw-button-default {
            color: #666;
            background-color: #fff;
            border-color: #eaeaea;
          }

          .raw-button-default:hover,
          .raw-button-default:focus {
            color: #000;
            border-color: #000;
          }

          .raw-button-default:active {
            background-color: #eaeaea;
          }

          .raw-button-primary {
            color: #fff;
            background-color: #000;
            border-color: #000;
          }

          .raw-button-primary:hover,
          .raw-button-primary:focus {
            color: #000;
            background-color: #fff;
          }

          .raw-button-primary:active {
            background-color: #eaeaea;
          }

          .raw-button-success {
            color: #fff;
            background-color: #0070f3;
            border-color: #0070f3;
          }

          .raw-button-success:hover,
          .raw-button-success:focus {
            color: #0070f3;
            background-color: #fff;
          }

          .raw-button-success:active {
            background-color: #eaeaea;
          }

          .raw-button-warning {
            color: #fff;
            background-color: #f5a623;
            border-color: #f5a623;
          }

          .raw-button-warning:hover,
          .raw-button-warning:focus {
            color: #f5a623;
            background-color: #fff;
          }

          .raw-button-warning:active {
            background-color: #eaeaea;
          }

          .raw-button-error {
            color: #fff;
            background-color: #e00;
            border-color: #e00;
          }

          .raw-button-error:hover,
          .raw-button-error:focus {
            color: #e00;
            background-color: #fff;
          }

          .raw-button-error:active {
            background-color: #eaeaea;
          }
        `}</style>
      </button>
    );
  }
);

export default Button;
