import React, { FC, PropsWithChildren, HTMLAttributes } from "react";
import classNames from "classnames";
import { useInputGroupContext } from "../InputGroup/input-group-context";
import { useInputStyles } from "./Input.styles";

interface BaseInputElementProps {
  className?: string;
  placement?: "left" | "right";
}

type NativeInputElementProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseInputElementProps
>;

type InputElementProps = BaseInputElementProps & NativeInputElementProps;

type InputLeftElementProps = Omit<InputElementProps, "placement">;
type InputRightElementProps = Omit<InputElementProps, "placement">;

const InputElement: FC<PropsWithChildren<InputElementProps>> = ({
  placement = "left",
  className = "",
  children,
  ...resetProps
}) => {
  const { type, size, disabled } = useInputGroupContext();
  const { fontSize, height, color } = useInputStyles({ type, size, disabled });
  const classes = classNames("raw-input-element", className);

  return (
    <div className={classes} {...resetProps}>
      {children}
      <style jsx>{`
        .raw-input-element {
          position: absolute;
          top: 0;
          ${[placement]}: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${height};
          height: ${height};
          font-size: ${fontSize};
          color: ${color};
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export const InputLeftElement: FC<InputLeftElementProps> = ({
  className = "",
  ...resetProps
}) => {
  const classes = classNames("raw-input-left-element", className);

  return <InputElement className={classes} placement="left" {...resetProps} />;
};

export const InputRightElement: FC<InputRightElementProps> = ({
  className = "",
  ...resetProps
}) => {
  const classes = classNames("raw-input-right-element", className);

  return <InputElement className={classes} placement="right" {...resetProps} />;
};
