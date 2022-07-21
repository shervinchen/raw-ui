import { MouseEventHandler, ButtonHTMLAttributes } from 'react';

interface BaseButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof BaseButtonProps
>;

export type ButtonProps = BaseButtonProps & NativeButtonProps;
