import { ChangeEvent, FocusEvent, ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export type InputTypes = 'default' | 'primary' | 'warning' | 'error';

export type InputSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BaseInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: InputTypes;
  size?: InputSizes;
  width?: string;
  htmlType?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}

export interface BaseInputAddonProps {
  className?: string;
}

export interface BaseInputElementProps {
  className?: string;
  clickable?: boolean;
  placement?: 'left' | 'right';
}

export type InputProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  BaseInputProps
>;

export type InputAddonProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseInputAddonProps
>;

export type InputElementProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseInputElementProps
>;

export interface InputSizeStyles {
  fontSize?: string;
  height?: string;
  horizontalPadding?: string;
}

export interface InputBasicStyles {
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
  cursor?: 'text' | 'not-allowed';
}

export type InputStyles = InputSizeStyles & InputBasicStyles;

export interface InputFocusStyles {
  focusBorderColor?: string;
}
