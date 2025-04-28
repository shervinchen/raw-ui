import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useInputGroupContext } from './input-group-context';
import { useInputStyles } from './Input.styles';
import { useTheme } from '../Theme/theme-context';
import { RawUITheme } from '../Theme/preset/preset.type';
import { InputAddonProps } from './Input.types';

const InputAddon: FC<PropsWithChildren<InputAddonProps>> = ({
  className,
  children,
  ...resetProps
}) => {
  const theme: RawUITheme = useTheme();
  const { type, size, disabled } = useInputGroupContext();
  const { fontSize } = useInputStyles({ type, size, disabled });
  const classes = classNames('raw-input-addon', className);

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
          color: ${theme.palette.neutral['500']};
          background-color: ${theme.palette.neutral['50']};
          border: 1px solid ${theme.palette.neutral['200']};
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

const InputLeftAddon: FC<InputAddonProps> = ({
  className = '',
  ...resetProps
}) => {
  const classes = classNames('raw-input-left-addon', className);

  return <InputAddon className={classes} {...resetProps} />;
};

const InputRightAddon: FC<InputAddonProps> = ({
  className = '',
  ...resetProps
}) => {
  const classes = classNames('raw-input-right-addon', className);

  return <InputAddon className={classes} {...resetProps} />;
};

export { InputLeftAddon, InputRightAddon };
