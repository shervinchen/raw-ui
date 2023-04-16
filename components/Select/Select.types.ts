import { HTMLAttributes, MutableRefObject } from "react";

export type SelectValue = string | number | (string | number)[] | undefined;

export type SelectSize = "sm" | "md" | "lg";

export interface BaseSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  width?: string;
  placeholder?: string;
  size?: SelectSize;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  dropdownClassName?: string;
  dropdownHeight?: string;
  getPopupContainer?: () => HTMLElement | null;
  onChange?: (value: SelectValue) => void
}

type NativeSelectProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseSelectProps
>;

export type SelectProps = BaseSelectProps & NativeSelectProps;

export type SelectRef = {
  focus: () => void;
  blur: () => void;
  scrollTo?: (options?: ScrollToOptions) => void;
};

export interface SelectConfig {
  selectValue?: SelectValue;
  onSelectChange?: (optionValue?: string | number) => void;
  selectRef?: MutableRefObject<HTMLElement | null>;
  getPopupContainer?: () => HTMLElement | null;
  dropdownHeight?: string;
  selectDisabled?: boolean;
}
