import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { LayoutProps } from './Layout.types';
import { getValidChildren } from '../utils/common';
import Sidebar from './Sidebar';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  const hasSidebar = getValidChildren(children).some(
    (child) => child.type === Sidebar
  );
  const classes = classNames(
    'raw-layout',
    hasSidebar && 'raw-layout-has-sidebar',
    className
  );

  return (
    <div data-testid="layout" className={classes} {...restProps}>
      {children}
      <style jsx>{`
        .raw-layout {
          display: flex;
          flex: auto;
          flex-direction: column;
        }
        .raw-layout-has-sidebar {
          flex-direction: row;
        }
      `}</style>
    </div>
  );
};

export default Layout;
