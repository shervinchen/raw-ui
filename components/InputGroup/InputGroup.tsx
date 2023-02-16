import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useMemo,
} from "react";
import classNames from "classnames";
import { InputGroupConfig, InputGroupProps } from "./InputGroup.types";
import { InputGroupContext } from "./input-group-context";
import Input from "../Input/Input";
import { InputLeftElement, InputRightElement } from "../Input/InputElement";
import { getValidChildren } from "../utils/common";
import { useInputStyles } from "../Input/Input.styles";

const getInputStyles = ({
  type,
  size,
  disabled,
}) => {
  const { height, horizontalPadding } = useInputStyles({
    type,
    size,
    disabled,
  });
  const style = {
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
  };
  const styles = [
    {
      type: InputLeftElement,
      property: "paddingLeft",
      value: height,
    },
    {
      type: InputRightElement,
      property: "paddingRight",
      value: height,
    },
  ];
  return {
    style,
    styles
  }
}

const InputGroup: FC<PropsWithChildren<InputGroupProps>> = ({
  className = "",
  size = "md",
  type = "default",
  readOnly = false,
  disabled = false,
  children,
  ...resetProps
}) => {
  const initialConfig = useMemo<InputGroupConfig>(
    () => ({
      size,
      type,
      readOnly,
      disabled,
      isInputGroup: true,
    }),
    []
  );
  
  const classes = classNames("raw-input-group", className);

  const getComputedInputStyle = () => {
    const { style, styles } = getInputStyles({
      type,
      size,
      disabled,
    })
    getValidChildren(children).forEach((child) => {
      const result = styles.find((item) => item.type === child.type);
      if (result) {
        const { property, value } = result;
        style[property] = value;
      }
    });
    return style;
  };

  const computedInputStyle = getComputedInputStyle();

  const cloneChildren = getValidChildren(children).map((child) => {
    return child.type !== Input
      ? child
      : cloneElement(child, { style: computedInputStyle });
  });

  return (
    <InputGroupContext.Provider value={initialConfig}>
      <div className={classes} {...resetProps}>
        {cloneChildren}
        <style jsx>
          {`
            .raw-input-group {
              width: 100%;
              display: inline-flex;
              position: relative;
            }
          `}
        </style>
      </div>
    </InputGroupContext.Provider>
  );
};

export default InputGroup;
