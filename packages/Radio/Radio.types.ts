import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export type RadioValue = string | number | undefined;

export interface BaseRadioProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: RadioValue;
  disabled?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type RadioProps = Merge<
  ComponentPropsWithoutRef<'input'>,
  BaseRadioProps
>;
