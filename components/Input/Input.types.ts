import { InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react';

type InputTypes = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface BaseInputProps {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  type?: InputTypes;
  htmlType?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string
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
