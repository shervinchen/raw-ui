import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export type LoadingType = 'dot' | 'spin';

export interface BaseLoadingProps {
  type?: LoadingType;
  color?: string;
  className?: string;
  size?: number;
}

export type LoadingProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseLoadingProps
>;
