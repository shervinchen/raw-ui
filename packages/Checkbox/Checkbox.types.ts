import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export type CheckboxValue = string | number | undefined;

export interface BaseCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: CheckboxValue;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type CheckboxProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  BaseCheckboxProps
>;

export interface CheckboxIconProps {
  checked?: boolean;
  indeterminate?: boolean;
}
