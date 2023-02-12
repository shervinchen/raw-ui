
import React, { FC, PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';
import { InputGroupConfig, InputGroupProps } from './InputGroup.types';
import { InputGroupContext } from './input-group-context';
import { useInputGroupCSS } from './InputGroup.styles';

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

  const { className: resolveClassName, styles } = useInputGroupCSS({
    type,
    size,
    disabled,
    readOnly,
  });

  const classes = classNames(
    'raw-input-group',
    className,
    resolveClassName
  );

  return (
    <InputGroupContext.Provider value={initialConfig}>
      <div className={classes} {...resetProps}>
        {children}
        {styles}
      </div>
    </InputGroupContext.Provider>
  );
}

export default InputGroup;
