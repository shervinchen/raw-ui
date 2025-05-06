import { MutableRefObject } from 'react';

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
  targetRef?: MutableRefObject<HTMLElement | null>;
  getPopupPosition: (
    popupRef: MutableRefObject<HTMLElement | null>
  ) => PopupPosition;
  getPopupContainer?: () => HTMLElement | null;
}
