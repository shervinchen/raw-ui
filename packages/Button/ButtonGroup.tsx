import React, { FC, PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';

import { ButtonGroupContext } from './button-group-context';
import {
  ButtonGroupProps,
  ButtonGroupConfig,
  ButtonGroupVariant,
} from './ButtonGroup.types';
import { useButtonGroupCSS } from './ButtonGroup.styles';

const buttonGroupVariants: ButtonGroupVariant[] = [
  'default',
  'outline',
  'ghost',
];

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
  const buttonGroupVariant: ButtonGroupVariant = buttonGroupVariants.includes(
    variant
  )
    ? variant
    : 'default';
  const initialConfig = useMemo<ButtonGroupConfig>(
    () => ({
      size,
      type,
      variant: buttonGroupVariant,
      disabled,
      isButtonGroup: true,
    }),
    [disabled, size, type, buttonGroupVariant]
  );

  const { className: resolveClassName, styles } = useButtonGroupCSS({
    type,
    size,
    variant: buttonGroupVariant,
    disabled,
  });

  const classes = classNames(
    'raw-button-group',
    vertical && 'raw-button-group-vertical',
    !vertical && 'raw-button-group-horizontal',
    className,
    resolveClassName
  );

  return (
    <ButtonGroupContext.Provider value={initialConfig}>
      <div role="group" className={classes} {...resetProps}>
        {children}
        {styles}
      </div>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
