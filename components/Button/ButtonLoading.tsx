import React, {
  FC,
} from 'react';
import css from 'styled-jsx/css';
import classNames from 'classnames';

import Loading from '../Loading';
import { ButtonLoadingProps } from './Button.types';

const ButtonLoading: FC<React.PropsWithChildren<ButtonLoadingProps>> = ({
  color,
  backgroundColor,
}) => {
  const { className, styles } = css.resolve`
    .raw-button-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      background-color: ${backgroundColor};
    }
  `;
  const classes = classNames('raw-button-loading', className);

  return (
    <div className={classes}>
      <Loading color={color} />
      {styles}
    </div>
  );
};

export default ButtonLoading;