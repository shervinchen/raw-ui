import { MutableRefObject } from "react";

export interface PopupProps {
  name: string;
  visible: boolean;
  targetRef?: MutableRefObject<HTMLElement | null>
  getPopupContainer?: () => HTMLElement | null;
}