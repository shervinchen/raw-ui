import { ComponentPropsWithoutRef, MutableRefObject, ReactNode } from 'react';
import { Merge } from '../utils';

export type PopoverPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export interface BasePopoverProps {
  content: ReactNode;
  value?: boolean;
  defaultValue?: boolean;
  placement?: PopoverPlacement;
  hideArrow?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
  getPopupContainer?: () => HTMLElement | null;
}

export type PopoverProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BasePopoverProps
>;

export interface PopoverArrowProps {
  placement: PopoverPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}

export interface PopoverArrowOffset {
  x: string;
  y: string;
}

export interface PopoverArrowPosition {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}
