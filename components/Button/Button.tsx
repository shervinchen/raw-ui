import React, {
  FC,
  forwardRef,
  Ref,
  PropsWithChildren,
  MouseEvent,
  useMemo,
} from 'react';
import classNames from 'classnames';
import css from 'styled-jsx/css';
import Loading from '../Loading';

import { useButtonStyles, useButtonCSS } from './Button.styles';
import { ButtonProps, ButtonLoadingProps } from './Button.types';

const ButtonLoading: FC<React.PropsWithChildren<ButtonLoadingProps>> = ({
  color,
  backgroundColor,
}) => {
  const { className, styles } = css.resolve`
    .raw-button-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      background-color: ${backgroundColor};
    }
  `;
  const classes = classNames('raw-button-loading', className);

  return (
    <div className={classes}>
      <Loading color={color} />
      {styles}
    </div>
  );
};

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
    const { color, backgroundColor } = useButtonStyles({
      type,
      size,
      variant,
      loading,
      disabled,
    });

    const { className: resolveClassName, styles } = useButtonCSS({
      type,
      size,
      variant,
      loading,
      disabled,
    });

    const classes = classNames(
      'raw-button',
      loading && 'raw-loading-button',
      disabled && 'raw-disabled-button',
      className,
      resolveClassName
    );

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
        {loading && (
          <ButtonLoading color={color} backgroundColor={backgroundColor} />
        )}
        <span className={classNames('raw-button-text', resolveClassName)}>
          {children}
        </span>
        {styles}
      </button>
    );
  }
);

export default Button;
