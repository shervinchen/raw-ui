import {
  MouseEventHandler,
  ReactElement,
  ComponentPropsWithoutRef,
} from 'react';
import { Merge } from '../utils';

export type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

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
  htmlType?: ComponentPropsWithoutRef<'button'>['type'];
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactElement;
  iconRight?: ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = Merge<
  ComponentPropsWithoutRef<'button'>,
  BaseButtonProps
>;

export interface ButtonLoadingProps {
  color?: string;
  backgroundColor?: string;
}

export interface ButtonIconProps {
  isRight?: boolean;
  isSingle?: boolean;
  height?: string;
  horizontalPadding?: string;
  children?: ReactElement;
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
