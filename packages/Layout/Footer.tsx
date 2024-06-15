import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { FooterProps } from './Layout.types';

const Footer: FC<PropsWithChildren<FooterProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  const classes = classNames('raw-layout-footer', className);

  return (
    <footer className={classes} {...restProps}>
      {children}
      <style jsx>{`
        .raw-layout-footer {
          flex: 0 0 auto;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
