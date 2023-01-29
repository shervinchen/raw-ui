import React, {
  forwardRef,
  Ref,
  PropsWithChildren,
  Children,
  MouseEvent,
} from "react";
import classNames from "classnames";

import { useButtonStyles, useButtonCSS } from "./Button.styles";
import { ButtonProps } from "./Button.types";
import ButtonLoading from "./ButtonLoading";
import ButtonIcon from "./ButtonIcon";
import { useButtonGroupContext } from "../ButtonGroup/button-group-context";
import { ButtonGroupConfig } from "../ButtonGroup/ButtonGroup.types";

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

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (buttonProps, ref: Ref<HTMLButtonElement | null>) => {
    const buttonGroupConfig = useButtonGroupContext();
    const {
      className = "",
      size = "md",
      type = "default",
      variant = "default",
      htmlType = "button",
      loading = false,
      disabled = false,
      icon,
      iconRight,
      onClick,
      children,
      ...restProps
    } = mergeButtonGroupProps(buttonProps, buttonGroupConfig);

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
      "raw-button",
      loading && "raw-loading-button",
      disabled && "raw-disabled-button",
      isChildLess && "raw-childless-button",
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
        {!isChildLess && <span className="raw-button-content">{children}</span>}
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
