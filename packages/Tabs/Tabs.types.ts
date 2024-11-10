import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Merge } from '../utils';

export interface BaseTabsProps {
  value?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (value: string) => void;
}

export interface BaseTabsItemProps {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export type TabsProps = Merge<ComponentPropsWithoutRef<'div'>, BaseTabsProps>;

export type TabsItemProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseTabsItemProps
>;

export interface TabsConfig {
  tabsId: string;
  selectValue?: string;
}
