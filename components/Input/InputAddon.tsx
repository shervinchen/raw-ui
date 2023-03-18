import React, { FC, PropsWithChildren, HTMLAttributes } from "react";
import classNames from "classnames";
import { useInputGroupContext } from "./input-group-context";
import { useInputStyles } from "./Input.styles";
import { useTheme } from "../Theme/theme-context";
import { RawUITheme } from "../Theme/preset/preset.type";

interface BaseInputAddonProps {
  className?: string;
}

type NativeInputAddonProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseInputAddonProps
>;

type InputAddonProps = BaseInputAddonProps & NativeInputAddonProps;

interface InputAddonType extends FC<InputAddonProps> {
  id: string;
}

const InputAddon: FC<PropsWithChildren<InputAddonProps>> = ({
  className = "",
  children,
  ...resetProps
}) => {
  const theme: RawUITheme = useTheme();
  const { type, size, disabled } = useInputGroupContext();
  const { fontSize } = useInputStyles({ type, size, disabled });
  const classes = classNames("raw-input-addon", className);

  return (
    <div className={classes} {...resetProps}>
      {children}
      <style jsx>{`
        .raw-input-addon {
          width: auto;
          display: flex;
          align-items: center;
          white-space: nowrap;
          pointer-events: none;
          padding: 0 12px;
          font-size: ${fontSize};
          color: ${theme.palette.accents6};
          background-color: ${theme.palette.accents1};
          border: 1px solid ${theme.palette.accents2};
        }
        .raw-input-left-addon {
          border-right: 0;
          border-radius: 6px 0 0 6px;
        }
        .raw-input-right-addon {
          border-left: 0;
          border-radius: 0 6px 6px 0;
        }
      `}</style>
    </div>
  );
};

const InputLeftAddon: InputAddonType = ({
  className = "",
  ...resetProps
}) => {
  const classes = classNames("raw-input-left-addon", className);

  return (
    <InputAddon className={classes} {...resetProps} />
  );
};

const InputRightAddon: InputAddonType = ({
  className = "",
  ...resetProps
}) => {
  const classes = classNames("raw-input-right-addon", className);

  return (
    <InputAddon className={classes} {...resetProps} />
  );
};

InputLeftAddon.id ="InputLeftAddon"
InputRightAddon.id ="InputRightAddon"

export { InputLeftAddon, InputRightAddon };