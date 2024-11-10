import { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { Merge } from '../utils';

export interface BaseOverlayProps {
  visible?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export type OverlayProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseOverlayProps
>;
