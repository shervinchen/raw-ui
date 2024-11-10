import { ComponentPropsWithoutRef } from 'react';
import { CheckboxValue } from './Checkbox.types';
import { Merge } from '../utils';

export type CheckboxGroupValue = (CheckboxValue | undefined)[];

export interface BaseCheckboxGroupProps {
  defaultValue?: CheckboxGroupValue;
  value?: CheckboxGroupValue;
  disabled?: boolean;
  layout?: 'row' | 'column';
  onChange?: (value: CheckboxGroupValue) => void;
  className?: string;
}

export type CheckboxGroupProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseCheckboxGroupProps
>;

export interface CheckboxGroupConfig {
  groupDisabled: boolean;
  groupValue: CheckboxGroupValue;
  inGroup: boolean;
  onGroupChange?: (checkboxValue?: CheckboxValue, checked?: boolean) => void;
}
