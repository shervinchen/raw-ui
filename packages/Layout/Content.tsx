import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { ContentProps } from './Layout.types';

const Content: FC<PropsWithChildren<ContentProps>> = ({
  className = '',
  children,
  ...restProps
}) => {
  const classes = classNames('raw-layout-content', className);

  return (
    <main className={classes} {...restProps}>
      {children}
      <style jsx>{`
        .raw-layout-content {
          flex: auto;
        }
      `}</style>
    </main>
  );
};

export default Content;
