import { MouseEventHandler, ButtonHTMLAttributes } from 'react';

interface BaseButtonProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
  type?: 'primary' | 'default' | 'danger';
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof BaseButtonProps
>;

export type ButtonProps = BaseButtonProps & NativeButtonProps;
