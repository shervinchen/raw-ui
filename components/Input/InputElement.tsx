import React, { FC, PropsWithChildren, HTMLAttributes } from "react";
import classNames from "classnames";
import { useInputGroupContext } from "./input-group-context";
import { useInputStyles } from "./Input.styles";

interface BaseInputElementProps {
  className?: string;
  clickable?: boolean;
  placement?: "left" | "right";
}

type NativeInputElementProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseInputElementProps
>;

type InputElementProps = BaseInputElementProps & NativeInputElementProps;

export type InputElementType = FC<Omit<InputElementProps, "placement">> & {
  id: string;
}

const InputElement: FC<PropsWithChildren<InputElementProps>> = ({
  placement = "left",
  clickable = false,
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
          pointer-events: ${clickable ? "auto" : "none"};
          cursor: ${clickable ? "pointer" : "default"};
        }
      `}</style>
    </div>
  );
};

const InputLeftElement: InputElementType = ({
  className = "",
  ...resetProps
}) => {
  const classes = classNames("raw-input-left-element", className);

  return <InputElement className={classes} placement="left" {...resetProps} />;
};

const InputRightElement: InputElementType = ({
  className = "",
  ...resetProps
}) => {
  const classes = classNames("raw-input-right-element", className);

  return <InputElement className={classes} placement="right" {...resetProps} />;
};

InputLeftElement.id = "InputLeftElement";
InputRightElement.id = "InputRightElement";

export { InputLeftElement, InputRightElement };
