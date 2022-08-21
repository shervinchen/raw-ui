import React, {
  forwardRef,
  Ref,
  PropsWithChildren,
  Children,
  MouseEvent,
} from 'react';
import classNames from 'classnames';

import { useButtonStyles, useButtonCSS } from './Button.styles';
import { ButtonProps } from './Button.types';
import ButtonLoading from './ButtonLoading';
import ButtonIcon from './ButtonIcon';

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
      icon,
      iconRight,
      onClick,
      children,
      ...restProps
    },
    ref: Ref<HTMLButtonElement | null>
  ) => {
    const { horizontalPadding, height, color, backgroundColor } =
      useButtonStyles({
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

    const isChildLess = Children.count(children) === 0;
    const isRight = Boolean(iconRight);

    const classes = classNames(
      'raw-button',
      loading && 'raw-loading-button',
      disabled && 'raw-disabled-button',
      isChildLess && 'raw-childless-button',
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
        {icon && (
          <ButtonIcon
            isSingle={isChildLess}
            height={height}
            horizontalPadding={horizontalPadding}
          >
            {icon}
          </ButtonIcon>
        )}
        {!isChildLess && (
          <span className={classNames('raw-button-content', resolveClassName)}>
            {children}
          </span>
        )}
        {iconRight && (
          <ButtonIcon
            isSingle={isChildLess}
            isRight={isRight && !isChildLess}
            height={height}
            horizontalPadding={horizontalPadding}
          >
            {iconRight}
          </ButtonIcon>
        )}
        {styles}
      </button>
    );
  }
);

export default Button;
