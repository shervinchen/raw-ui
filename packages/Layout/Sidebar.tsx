import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { SidebarProps } from './Layout.types';

const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  const classes = classNames('raw-layout-sidebar', className);

  return (
    <aside className={classes} {...restProps}>
      {children}
      <style jsx>{`
        .raw-layout-sidebar {
          position: relative;
          transition: all 0.2s;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
