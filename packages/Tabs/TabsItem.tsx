import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { TabsItemProps } from './Tabs.types';
import { useTabsContext } from './tabs-context';

const TabsItem: FC<PropsWithChildren<TabsItemProps>> = ({
  value,
  className = '',
  children,
}) => {
  const { tabsId, selectValue } = useTabsContext();
  const classes = classNames(
    'raw-tabs-panel',
    selectValue === value && 'raw-tabs-panel-active',
    className
  );

  return (
    <div
      role="tabpanel"
      id={`raw-tabs-panel-${value}-${tabsId}`}
      aria-labelledby={`raw-tabs-nav-item-${value}-${tabsId}`}
      aria-hidden={selectValue !== value}
      className={classes}
    >
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
