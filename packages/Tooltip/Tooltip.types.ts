import { HTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { PopupPlacement } from '../Popup/Popup.types';

export type TooltipPlacement = PopupPlacement;

interface BaseTooltipProps {
  content: ReactNode;
  placement?: PopupPlacement;
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
  placement: PopupPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
}
