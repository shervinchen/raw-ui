import { MutableRefObject } from 'react';
import { Strategy } from './utils/common';

export type PopupRect = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type PopupPosition = {
  top: number;
  left: number;
};

export interface PopupProps {
  name: string;
  visible: boolean;
  zIndex?: number;
  strategy?: Strategy;
  targetElement: HTMLElement | null;
  getPopupPosition: (
    popupRef: MutableRefObject<HTMLDivElement | null>,
  ) => PopupPosition;
  getPopupContainer?: () => HTMLElement | null;
}
