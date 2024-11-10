import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export interface BaseToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type ToggleProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  BaseToggleProps
>;

export interface ToggleStyles {
  borderColor?: string;
  backgroundColor?: string;
}

export type ToggleStatus = 'unChecked' | 'checked';
