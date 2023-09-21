import { MutableRefObject } from 'react';

export type PopupCoordinates = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type PopupPosition = {
  top: number;
  left: number;
  transform: string;
};

export type PopupPlacement =
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

export interface PopupProps {
  name: string;
  visible: boolean;
  targetRef?: MutableRefObject<HTMLElement | null>;
  getPopupPosition: () => PopupPosition;
  getPopupContainer?: () => HTMLElement | null;
}

export interface PopupArrowPosition {
  top: string;
  left: string;
  right: string;
  bottom: string;
  transform: string;
}

export interface PopupArrowOffset {
  x: string;
  y: string;
}

export interface PopupArrowProps {
  placement: PopupPlacement;
  targetRef: MutableRefObject<HTMLElement | null>;
  withBorder: boolean;
  className?: string;
}
