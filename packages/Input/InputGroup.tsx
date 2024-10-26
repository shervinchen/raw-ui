import React, { FC, PropsWithChildren, cloneElement, useMemo } from 'react';
import classNames from 'classnames';
import { InputGroupConfig, InputGroupProps } from './InputGroup.types';
import { InputGroupContext } from './input-group-context';
import { getValidChildren } from '../utils/common';
import { useInputStyles } from './Input.styles';
import Input from './Input';
import { InputLeftElement, InputRightElement } from './InputElement';
import { InputLeftAddon, InputRightAddon } from './InputAddon';

const useComputedInputStyles = ({ type, size, disabled }: InputGroupProps) => {
  const { height, horizontalPadding } = useInputStyles({
    type,
    size,
    disabled,
  });
  const style = {
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
  };
  const styles = [
    {
      type: InputLeftElement,
      newStyle: {
        paddingLeft: height,
      },
    },
    {
      type: InputRightElement,
      newStyle: {
        paddingRight: height,
      },
    },
    {
      type: InputLeftAddon,
      newStyle: {
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
      },
    },
    {
      type: InputRightAddon,
      newStyle: {
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
      },
    },
  ];
  return {
    style,
    styles,
  };
};

const InputGroup: FC<PropsWithChildren<InputGroupProps>> = ({
  className = '',
  size = 'md',
  type = 'default',
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
    [disabled, readOnly, size, type]
  );

  const classes = classNames('raw-input-group', className);

  const useComputedInputStyle = () => {
    const { style, styles } = useComputedInputStyles({
      type,
      size,
      disabled,
    });
    let computedStyle = style;
    getValidChildren(children).forEach((child) => {
      const result = styles.find((item) => item.type === child.type);
      if (result) {
        const { newStyle } = result;
        computedStyle = { ...computedStyle, ...newStyle };
      }
    });
    return computedStyle;
  };

  const computedInputStyle = useComputedInputStyle();

  const cloneChildren = getValidChildren(children).map((child) => {
    return child.type !== Input
      ? child
      : cloneElement(child, { style: computedInputStyle });
  });

  return (
    <InputGroupContext.Provider value={initialConfig}>
      <div className={classes} {...resetProps}>
        {cloneChildren}
        <style jsx>{`
          .raw-input-group {
            width: 100%;
            display: inline-flex;
            position: relative;
          }
        `}</style>
      </div>
    </InputGroupContext.Provider>
  );
};

export default InputGroup;
