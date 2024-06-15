import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { HeaderProps } from './Layout.types';

const Header: FC<PropsWithChildren<HeaderProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  const classes = classNames('raw-layout-header', className);

  return (
    <header className={classes} {...restProps}>
      {children}
      <style jsx>{`
        .raw-layout-header {
          flex: 0 0 auto;
        }
      `}</style>
    </header>
  );
};

export default Header;
