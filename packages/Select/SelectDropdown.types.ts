import { ComponentPropsWithRef } from 'react';
import { Merge } from '../utils';

export interface BaseSelectDropdownProps {
  visible: boolean;
  className?: string;
}

export type SelectDropdownProps = Merge<
  ComponentPropsWithRef<'div'>,
  BaseSelectDropdownProps
>;
