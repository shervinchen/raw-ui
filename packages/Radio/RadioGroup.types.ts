import { ComponentPropsWithoutRef } from 'react';
import { RadioValue } from './Radio.types';
import { Merge } from '../utils';

export interface BaseRadioGroupProps {
  defaultValue?: RadioValue;
  value?: RadioValue;
  disabled?: boolean;
  layout?: 'row' | 'column';
  onChange?: (value: RadioValue) => void;
  className?: string;
}

export type RadioGroupProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseRadioGroupProps
>;

export interface RadioGroupConfig {
  groupDisabled: boolean;
  groupValue: RadioValue;
  inGroup: boolean;
  onGroupChange?: (radioValue?: RadioValue) => void;
}
