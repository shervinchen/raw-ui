import { ComponentPropsWithRef } from 'react';
import { Merge } from '../utils';

export interface BaseSelectInputProps {
  visible: boolean;
  onBlur: () => void;
  onFocus: () => void;
}

export type SelectInputProps = Merge<
  ComponentPropsWithRef<'input'>,
  BaseSelectInputProps
>;
