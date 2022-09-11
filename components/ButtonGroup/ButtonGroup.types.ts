import { HTMLAttributes } from 'react';
import {
  ButtonSizes,
  ButtonTypes,
  ButtonVariants,
} from '../Button/Button.types';

type ButtonGroupVariants = 'default' | 'outline';

interface BaseButtonGroupProps {
  className?: string;
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonGroupVariants;
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
  variant?: ButtonGroupVariants;
  disabled?: boolean;
  isButtonGroup: boolean;
}
