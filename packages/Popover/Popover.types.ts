import { ComponentPropsWithoutRef, MutableRefObject, ReactNode } from 'react';
import { PopupPlacement } from '../Popup/Popup.types';
import { Merge } from '../utils';

export type PopoverPlacement = PopupPlacement;

export interface BasePopoverProps {
  content: ReactNode;
  value?: boolean;
  defaultValue?: boolean;
  placement?: PopupPlacement;
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
  placement: PopupPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}

export interface PopoverArrowOffset {
  x: string;
  y: string;
}
