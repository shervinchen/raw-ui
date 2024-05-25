import { HTMLAttributes, ReactNode } from 'react';

interface BaseTabsProps {
  value?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (value: string) => void;
}

interface BaseTabsItemProps {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

type NativeTabsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseTabsProps
>;

type NativeTabsItemProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseTabsItemProps
>;

export type TabsProps = BaseTabsProps & NativeTabsProps;

export type TabsItemProps = BaseTabsItemProps & NativeTabsItemProps;

export interface TabsConfig {
  selectValue?: string;
}
