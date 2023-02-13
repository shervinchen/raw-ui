
import React, { FC, PropsWithChildren, cloneElement, useMemo } from 'react';
import classNames from 'classnames';
import { InputGroupConfig, InputGroupProps } from './InputGroup.types';
import { InputGroupContext } from './input-group-context';
import Input from '../Input/Input'
import { InputPrefix, InputSuffix } from '../Input/InputElement';
import { getValidChildren } from '../utils/common';
import { useInputStyles } from '../Input/Input.styles';

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
      isInputGroup: true
    }),
    []
  );

  const { height, horizontalPadding } = useInputStyles({ type, size, disabled });

  const classes = classNames(
    'raw-input-group',
    className,
  );

  const getInputStyle = () => {
    const style = {
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding,
    }
    getValidChildren(children).forEach(child => {
      if (child.type === InputPrefix) {
        style.paddingLeft = height;
      }
      if (child.type === InputSuffix) {
        style.paddingRight = height;
      }
    })
    return {
      style
    };
  }

  const inputStyle = getInputStyle()

  const cloneChildren = getValidChildren(children).map(child => {
    return child.type !== Input ? child : cloneElement(child, inputStyle)
  })

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
        `}
        </style>
      </div>
    </InputGroupContext.Provider>
  );
}

export default InputGroup;
