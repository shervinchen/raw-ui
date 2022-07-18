import React, { FC, PropsWithChildren, MouseEvent } from 'react';
import classNames from 'classnames';

import { ButtonProps } from './Button.types';

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  size,
  type,
  htmlType,
  disabled,
  onClick,
  children,
  ...restProps
}) => {
  const classes = classNames('raw-button', className, {
    [`raw-button-${type}`]: type,
    [`raw-button-${size}`]: size,
  });

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick && onClick(event);
  };

  return (
    <button
      type={htmlType}
      className={classes}
      onClick={clickHandler}
      {...restProps}
    >
      {children}
      <style jsx>{`
        .raw-button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          min-width: 32px;
          min-height: 32px;
          background-color: aliceblue;
        }

        .raw-button-primary {
          background-color: aqua;
        }

        .raw-button-secondary {
          background-color: burlywood;
        }

        .raw-button-error {
          background-color: red;
        }
      `}</style>
    </button>
  );
};

Button.defaultProps = {
  className: '',
  size: 'default',
  type: 'default',
  htmlType: 'button',
  disabled: false,
};

export default Button;
