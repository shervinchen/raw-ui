import { MutableRefObject } from 'react';

export type PopupPosition = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type PopupPlacement = {
  top: number;
  left: number;
  transform: string;
};

export interface PopupProps {
  name: string;
  visible: boolean;
  targetRef?: MutableRefObject<HTMLElement | null>;
  getPopupPlacement: () => PopupPlacement;
  getPopupContainer?: () => HTMLElement | null;
}
