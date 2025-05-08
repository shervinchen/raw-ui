import { ComponentPropsWithoutRef, MutableRefObject, ReactNode } from 'react';
import { Merge } from '../utils';
import { Strategy } from '../Popup/utils/common';

export type TooltipPlacement =
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

export interface BaseTooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  hideArrow?: boolean;
  disabled?: boolean;
  strategy?: Strategy;
  className?: string;
  getPopupContainer?: () => HTMLElement | null;
}

export type TooltipProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseTooltipProps
>;

export interface TooltipArrowProps {
  placement: TooltipPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}

export interface TooltipArrowOffset {
  x: string;
  y: string;
}

export interface TooltipArrowPosition {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}
