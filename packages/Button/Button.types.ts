import { MouseEventHandler, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonSizes = 'sm' | 'md' | 'lg';

export type ButtonTypes =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error';

export type ButtonVariants = 'default' | 'outline' | 'ghost' | 'shadow';

export interface BaseButtonProps {
  className?: string;
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonVariants;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof BaseButtonProps
>;

export type ButtonProps = BaseButtonProps & NativeButtonProps;

export interface ButtonLoadingProps {
  color?: string;
  backgroundColor?: string;
}

export interface ButtonIconProps {
  isRight?: boolean;
  isSingle?: boolean;
  height?: string;
  horizontalPadding?: string;
}

export interface ButtonSizeStyles {
  fontSize?: string;
  lineHeight?: string;
  height?: string;
  horizontalPadding?: string;
}

export interface ButtonBasicStyles {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  boxShadow?: string;
  cursor?: 'pointer' | 'default' | 'not-allowed';
}

export type ButtonStyles = ButtonSizeStyles & ButtonBasicStyles;

export interface ButtonHoverStyles {
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverColor?: string;
  hoverBoxShadow?: string;
  hoverTransform?: string;
}

export interface ButtonActiveStyles {
  activeBackgroundColor?: string;
  activeBoxShadow?: string;
  activeTransform?: string;
}
