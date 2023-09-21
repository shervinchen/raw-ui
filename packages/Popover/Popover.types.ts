import { HTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { PopupPlacement } from '../Popup/Popup.types';

interface BasePopoverProps {
  content: ReactNode;
  value?: boolean;
  defaultValue?: boolean;
  placement?: PopupPlacement;
  hideArrow?: boolean;
  disabled?: boolean;
  className?: string;
  getPopupContainer?: () => HTMLElement | null;
}

type NativePopoverProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BasePopoverProps
>;

export type PopoverProps = BasePopoverProps & NativePopoverProps;

export interface PopoverArrowProps {
  placement: PopupPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}

export interface PopoverArrowOffset {
  x: string;
  y: string;
}
