import { ComponentPropsWithoutRef } from 'react';
import { ButtonSizes, ButtonTypes } from './Button.types';
import { Merge } from '../utils';

export type ButtonGroupVariant = 'default' | 'outline' | 'ghost';

interface BaseButtonGroupProps {
  className?: string;
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonGroupVariant;
  disabled?: boolean;
  vertical?: boolean;
}

export type ButtonGroupProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseButtonGroupProps
>;

export interface ButtonGroupConfig {
  size?: ButtonSizes;
  type?: ButtonTypes;
  variant?: ButtonGroupVariant;
  disabled?: boolean;
  isButtonGroup: boolean;
}
