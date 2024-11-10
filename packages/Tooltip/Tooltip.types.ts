import { ComponentPropsWithoutRef, MutableRefObject, ReactNode } from 'react';
import { PopupPlacement } from '../Popup/Popup.types';
import { Merge } from '../utils';

export type TooltipPlacement = PopupPlacement;

export interface BaseTooltipProps {
  content: ReactNode;
  placement?: PopupPlacement;
  hideArrow?: boolean;
  disabled?: boolean;
  className?: string;
  getPopupContainer?: () => HTMLElement | null;
}

export type TooltipProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseTooltipProps
>;

export interface TooltipArrowProps {
  placement: PopupPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}
