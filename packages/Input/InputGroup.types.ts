import { ComponentPropsWithoutRef } from 'react';
import { InputSizes, InputTypes } from './Input.types';
import { Merge } from '../utils';

interface BaseInputGroupProps {
  className?: string;
  size?: InputSizes;
  type?: InputTypes;
  readOnly?: boolean;
  disabled?: boolean;
}

export type InputGroupProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseInputGroupProps
>;

export interface InputGroupConfig {
  size?: InputSizes;
  type?: InputTypes;
  readOnly?: boolean;
  disabled?: boolean;
  isInputGroup: boolean;
}
