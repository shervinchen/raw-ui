import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { useInputGroupContext } from './input-group-context';
import { useInputStyles } from './Input.styles';
import { InputElementProps } from './Input.types';

const InputElement: FC<PropsWithChildren<InputElementProps>> = ({
  placement,
  clickable = false,
  className,
  children,
  ...resetProps
}) => {
  const { type, size, disabled } = useInputGroupContext();
  const { fontSize, height, color } = useInputStyles({ type, size, disabled });
  const classes = classNames('raw-input-element', className);

  return (
    <div className={classes} {...resetProps}>
      {children}
      <style jsx>{`
        .raw-input-element {
          position: absolute;
          top: 0;
          ${placement}: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${height};
          height: ${height};
          font-size: ${fontSize};
          color: ${color};
          pointer-events: ${clickable ? 'auto' : 'none'};
          cursor: ${clickable ? 'pointer' : 'default'};
        }
      `}</style>
    </div>
  );
};

const InputLeftElement: FC<Omit<InputElementProps, 'placement'>> = ({
  className = '',
  ...resetProps
}) => {
  const classes = classNames('raw-input-left-element', className);

  return (
    <InputElement
      data-testid="inputLeftElement"
      className={classes}
      placement="left"
      {...resetProps}
    />
  );
};

const InputRightElement: FC<Omit<InputElementProps, 'placement'>> = ({
  className = '',
  ...resetProps
}) => {
  const classes = classNames('raw-input-right-element', className);

  return (
    <InputElement
      data-testid="inputRightElement"
      className={classes}
      placement="right"
      {...resetProps}
    />
  );
};

export { InputLeftElement, InputRightElement };
