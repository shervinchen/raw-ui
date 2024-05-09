import { HTMLAttributes, MutableRefObject } from 'react';

export type SelectOptionValue = string | number | undefined | null;

export type SelectValue =
  | SelectOptionValue
  | SelectOptionValue[]
  | undefined
  | null;

export type SelectTypes = 'default' | 'warning' | 'error';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface BaseSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  width?: string;
  placeholder?: string;
  type?: SelectTypes;
  size?: SelectSize;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  dropdownClassName?: string;
  dropdownHeight?: string;
  getPopupContainer?: () => HTMLElement | null;
  onChange?: (value: SelectValue) => void;
}

type NativeSelectProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseSelectProps
>;

export type SelectProps = BaseSelectProps & NativeSelectProps;

export type SelectRef = {
  focus: () => void;
  blur: () => void;
};

export interface SelectConfig {
  multiple?: boolean;
  selectValue?: SelectValue;
  onSelectChange?: (optionValue?: SelectOptionValue) => void;
  selectRef?: MutableRefObject<HTMLElement | null>;
  getPopupContainer?: () => HTMLElement | null;
  dropdownHeight?: string;
  selectDisabled?: boolean;
  selectId: string;
}

export interface SelectSizeStyles {
  fontSize?: string;
  height?: string;
  horizontalPadding?: string;
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
