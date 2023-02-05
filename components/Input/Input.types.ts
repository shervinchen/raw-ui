import { InputHTMLAttributes, ChangeEvent, MouseEvent, FocusEvent } from "react";

export type InputTypes = "default" | "primary" | "success" | "warning" | "error";

export type InputSizes = 'sm' | 'md' | 'lg';

interface BaseInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: InputTypes;
  size?: InputSizes;
  htmlType?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  // label?: string
  // labelRight?: string
  // icon?: React.ReactNode
  // iconRight?: React.ReactNode
  // iconClickable?: boolean
  // clearable?: boolean
  // onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  // onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
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

export type InputStyles = InputSizeStyles & InputBasicStyles

export interface InputFocusStyles {
  focusBorderColor?: string;
}