import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export interface BaseSelectOptionProps {
  value?: string | number;
  disabled?: boolean;
  className?: string;
}

export type SelectOptionProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseSelectOptionProps
>;
