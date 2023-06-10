import { HTMLAttributes } from 'react';
import { ButtonSizes, ButtonTypes } from './Button.types';

export type ButtonGroupVariant = 'default' | 'outline' | 'ghost';

interface BaseButtonGroupProps {
  className?: string;
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonGroupVariant;
  disabled?: boolean;
  vertical?: boolean;
}

type NativeButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseButtonGroupProps
>;

export type ButtonGroupProps = BaseButtonGroupProps & NativeButtonGroupProps;

export interface ButtonGroupConfig {
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonGroupVariant;
  disabled?: boolean;
  isButtonGroup: boolean;
}
