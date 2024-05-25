import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { TabsConfig, TabsItemProps, TabsProps } from './Tabs.types';
import { useControlled } from '../utils/hooks';
import { getValidChildren } from '../utils/common';
import { TabsContext } from './tabs-context';
import { useTheme } from '../Theme';

const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  defaultValue,
  value,
  className = '',
  disabled: tabsDisabled = false,
  vertical = false,
  onChange,
  children,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useControlled<string>({
    defaultValue,
    value,
  });
  const theme = useTheme();
  const classes = classNames(
    'raw-tabs',
    vertical && 'raw-tabs-vertical',
    className
  );
  const [navBarPosition, setNavBarPosition] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const tabsNav = useMemo(() => {
    return getValidChildren(children).map((child) => {
      const { label, value, disabled = false } = child.props as TabsItemProps;
      return {
        label,
        value,
        disabled,
      };
    });
  }, [children]);

  const tabsConfig: TabsConfig = {
    selectValue: internalValue,
  };

  const tabsNavRef = useCallback(
    (node: HTMLDivElement) => {
      const navItems = [...(node?.children ?? [])] as HTMLDivElement[];
      const selectedNavIndex = tabsNav.findIndex(
        (item) => item.value === internalValue
      );
      const selectedNavItem = navItems
        .filter((item) => item.role === 'tab')
        .find((_, index) => index === selectedNavIndex);
      if (selectedNavItem) {
        const { offsetLeft, offsetTop } = selectedNavItem;
        const { width, height } = selectedNavItem.getBoundingClientRect();
        setNavBarPosition({
          width,
          height,
          left: offsetLeft,
          top: offsetTop,
        });
      }
    },
    [internalValue, tabsNav]
  );

  const handleTabsNavItemClick = (value: string, disabled: boolean) => {
    const isDisabled = tabsDisabled || disabled;
    if (isDisabled) return;
    setInternalValue(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={tabsConfig}>
      <div className={classes} {...restProps}>
        <div role="tablist" ref={tabsNavRef} className="raw-tabs-nav">
          {tabsNav.map((item) => (
            <div
              role="tab"
              className={classNames(
                'raw-tabs-nav-item',
                internalValue === item.value && 'raw-tabs-nav-item-active',
                (tabsDisabled || item.disabled) && 'raw-tabs-nav-item-disabled'
              )}
              key={item.value}
              onClick={() => handleTabsNavItemClick(item.value, item.disabled)}
            >
              {item.label}
            </div>
          ))}
          <div
            className="raw-tabs-nav-bar"
            style={{
              width: vertical ? '2px' : navBarPosition.width,
              height: vertical ? navBarPosition.height : '2px',
              transform: vertical
                ? `translateY(${navBarPosition.top}px)`
                : `translateX(${navBarPosition.left}px)`,
            }}
          />
        </div>
        <div className="raw-tabs-content">{children}</div>
        <style jsx>
          {`
            .raw-tabs {
              display: flex;
              flex-direction: column;
              width: 100%;
              gap: 16px;
            }
            .raw-tabs.raw-tabs-vertical {
              flex-direction: row;
            }
            .raw-tabs .raw-tabs-nav {
              position: relative;
              display: flex;
              align-items: center;
              flex-wrap: nowrap;
              flex-direction: row;
              gap: 24px;
              overflow-x: auto;
              overflow-y: hidden;
              scrollbar-width: none;
            }
            .raw-tabs .raw-tabs-nav::before {
              position: absolute;
              top: ${navBarPosition.height - 1}px;
              left: 0;
              content: '';
              width: 100%;
              height: 1px;
              border-bottom: 1px solid ${theme.palette.accents2};
            }
            .raw-tabs.raw-tabs-vertical .raw-tabs-nav {
              flex-direction: column;
              gap: 12px;
              overflow-x: hidden;
              overflow-y: auto;
            }
            .raw-tabs.raw-tabs-vertical .raw-tabs-nav::before {
              top: 0;
              left: calc(100% - 1px);
              width: 1px;
              height: 100%;
              border-bottom: none;
              border-right: 1px solid ${theme.palette.accents2};
            }
            .raw-tabs .raw-tabs-nav-item {
              padding: 12px 0;
              font-size: 16px;
              color: ${theme.palette.accents7};
              background-color: transparent;
              white-space: nowrap;
              user-select: none;
              cursor: pointer;
              transition-property: color;
              transition-duration: 0.2s;
              transition-timing-function: ease;
            }
            .raw-tabs.raw-tabs-vertical .raw-tabs-nav-item {
              padding: 6px 12px;
            }
            .raw-tabs-nav-item.raw-tabs-nav-item-active {
              color: ${theme.palette.foreground};
            }
            .raw-tabs-nav-item.raw-tabs-nav-item-disabled {
              color: ${theme.palette.accents5};
              cursor: not-allowed;
            }
            .raw-tabs-nav-item:not(.raw-tabs-nav-item-active):not(
                .raw-tabs-nav-item-disabled
              ):hover {
              color: ${theme.palette.foreground};
            }
            .raw-tabs .raw-tabs-nav-bar {
              position: absolute;
              top: ${navBarPosition.height - 2}px;
              left: 0;
              background-color: ${theme.palette.foreground};
              transition-property: transform;
              transition-duration: 0.2s;
              transition-timing-function: ease;
            }
            .raw-tabs.raw-tabs-vertical .raw-tabs-nav-bar {
              top: 0;
              left: calc(100% - 2px);
            }
          `}
        </style>
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
