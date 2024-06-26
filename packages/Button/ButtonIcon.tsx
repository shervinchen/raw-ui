import React, { cloneElement, FC } from 'react';
import css from 'styled-jsx/css';
import classNames from 'classnames';

import { ButtonIconProps } from './Button.types';

const ButtonIcon: FC<ButtonIconProps> = ({
  isRight = false,
  isSingle,
  height,
  horizontalPadding,
  children,
}) => {
  const { className, styles } = css.resolve`
    .raw-button-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      margin-right: calc(${horizontalPadding} / 2);
    }

    .raw-button-icon :global(svg) {
      background: transparent;
      height: calc(${height} / 2.35);
      width: calc(${height} / 2.35);
    }

    .button-icon-right {
      margin-left: calc(${horizontalPadding} / 2);
      margin-right: 0;
    }

    .button-icon-single {
      margin-right: 0;
    }
  `;

  const classes = classNames(
    'raw-button-icon',
    {
      'button-icon-right': isRight,
      'button-icon-single': isSingle,
    },
    className
  );

  return (
    <span className={classes} data-testid="buttonIcon">
      {cloneElement(children, { 'aria-hidden': true })}
      {styles}
    </span>
  );
};

export default ButtonIcon;
