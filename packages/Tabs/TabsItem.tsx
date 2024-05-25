import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { TabsItemProps } from './Tabs.types';
import { useTabsContext } from './tabs-context';

const TabsItem: FC<PropsWithChildren<TabsItemProps>> = ({
  value,
  className = '',
  children,
}) => {
  const { selectValue } = useTabsContext();
  const classes = classNames(
    'raw-tabs-panel',
    selectValue === value && 'raw-tabs-panel-active',
    className
  );

  return (
    <div role="tabpanel" className={classes}>
      {children}
      <style jsx>
        {`
          .raw-tabs-panel {
            display: none;
          }
          .raw-tabs-panel.raw-tabs-panel-active {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default TabsItem;
