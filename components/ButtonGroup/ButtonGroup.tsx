import React, { FC, PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';

import { ButtonGroupContext } from './button-group-context';
import { ButtonGroupProps, ButtonGroupConfig } from './ButtonGroup.types';
import { useButtonGroupCSS } from './ButtonGroup.styles';

const ButtonGroup: FC<PropsWithChildren<ButtonGroupProps>> = ({
  size = 'md',
  type = 'default',
  variant = 'default',
  disabled = false,
  children,
  className = '',
  vertical = false,
  ...resetProps
}) => {
  const initialConfig = useMemo<ButtonGroupConfig>(
    () => ({
      size,
      type,
      variant,
      disabled,
      isButtonGroup: true,
    }),
    []
  );

  const { className: resolveClassName, styles } = useButtonGroupCSS({
    type,
    size,
    variant,
    disabled,
  });

  const classes = classNames(
    'raw-button-group',
    vertical && 'vertical',
    !vertical && 'horizontal',
    className,
    resolveClassName
  );

  return (
    <ButtonGroupContext.Provider value={initialConfig}>
      <div className={classes} {...resetProps}>
        {children}
        {styles}
      </div>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
