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
  zIndex: number;
  strategy?: Strategy;
  targetRef?: MutableRefObject<HTMLElement | null>;
  targetElement?: HTMLElement | null;
  getPopupPosition: (
    popupRef: MutableRefObject<HTMLElement | null>
  ) => PopupPosition;
  getPopupContainer?: () => HTMLElement | null;
}
