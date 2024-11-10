import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export interface BaseSelectDropdownProps {
  visible: boolean;
  className?: string;
}

export type SelectDropdownProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseSelectDropdownProps
>;
