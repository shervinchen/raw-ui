import { HTMLAttributes, MutableRefObject, ReactNode } from 'react';

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

export interface TooltipPosition {
  top: number;
  left: number;
  transform: string;
}

export interface TooltipArrowPosition {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}

interface BaseTooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  hideArrow?: boolean;
  disabled?: boolean;
  className?: string;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeTooltipProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseTooltipProps
>;

export type TooltipProps = BaseTooltipProps & NativeTooltipProps;

export interface TooltipArrowProps {
  placement: TooltipPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}

export interface TooltipArrowOffset {
  x: string;
  y: string;
}
