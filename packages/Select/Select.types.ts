import { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import { Merge } from '../utils';

export type SelectOptionValue = string | number | undefined | null;

export type SelectValue = SelectOptionValue | SelectOptionValue[];

export type SelectTypes = 'default' | 'warning' | 'error';

export type SelectSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BaseSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  width?: string;
  placeholder?: string;
  type?: SelectTypes;
  size?: SelectSizes;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  dropdownClassName?: string;
  dropdownHeight?: string;
  getPopupContainer?: () => HTMLElement | null;
  onChange?: (value: SelectValue) => void;
}

export type SelectProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseSelectProps
>;

export interface SelectConfig {
  multiple?: boolean;
  selectValue?: SelectValue;
  onSelectChange?: (optionValue?: SelectOptionValue) => void;
  selectRef?: MutableRefObject<HTMLElement | null>;
  getPopupContainer?: () => HTMLElement | null;
  dropdownHeight?: string;
  type?: SelectTypes;
  size?: SelectSizes;
  disabled?: boolean;
  selectId: string;
}

export interface SelectSizeStyles {
  fontSize?: string;
  height?: string;
  paddingLeft?: string;
  paddingRight?: string;
  iconRight?: string;
  tagContentVerticalPadding?: string;
  tagHeight?: string;
}

export interface SelectBasicStyles {
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  cursor?: 'pointer' | 'not-allowed';
}

export type SelectStyles = SelectSizeStyles & SelectBasicStyles;

export interface SelectHoverStyles {
  hoverBorderColor?: string;
}
