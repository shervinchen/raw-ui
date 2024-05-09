import { InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react';

export type InputTypes = 'default' | 'primary' | 'warning' | 'error';

export type InputSizes = 'sm' | 'md' | 'lg';

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

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof BaseInputProps
>;

export type InputProps = BaseInputProps & NativeInputProps;

export interface InputSizeStyles {
  fontSize?: string;
  height?: string;
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
