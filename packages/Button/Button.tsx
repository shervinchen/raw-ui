import React, {
  forwardRef,
  Children,
  MouseEvent,
  useRef,
  useImperativeHandle,
  ComponentPropsWithRef,
} from 'react';
import classNames from 'classnames';

import { useButtonStyles, useButtonCSS } from './Button.styles';
import { ButtonProps } from './Button.types';
import ButtonLoading from './ButtonLoading';
import ButtonIcon from './ButtonIcon';
import { useButtonGroupContext } from './button-group-context';
import { ButtonGroupConfig } from './ButtonGroup.types';

const mergeButtonGroupProps = (
  buttonProps: ButtonProps,
  config: ButtonGroupConfig
): ButtonProps => {
  if (!config.isButtonGroup) return buttonProps;
  return {
    ...buttonProps,
    size: config.size,
    type: config.type,
    variant: config.variant,
    disabled: config.disabled,
  };
};

const Button = forwardRef(
  (buttonProps: ButtonProps, ref: ComponentPropsWithRef<'button'>['ref']) => {
    const buttonGroupConfig = useButtonGroupContext();
    const {
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
    } = mergeButtonGroupProps(buttonProps, buttonGroupConfig);
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      onClick?.(event);
    };

    useImperativeHandle(ref, () => buttonRef.current);

    return (
      <button
        ref={buttonRef}
        type={htmlType}
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        aria-disabled={disabled}
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
          <span className="raw-button-content" data-testid="buttonContent">
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

Button.displayName = 'RawButton';

export default Button;
