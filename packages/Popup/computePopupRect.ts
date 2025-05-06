import { MutableRefObject } from 'react';
import { PopupRect } from './Popup.types';
import { getRectRelativeToOffsetParent } from './utils/getRectRelativeToOffsetParent';
import { getOffsetParent } from './utils/getOffsetParent';

export const getRectSize = (ref?: MutableRefObject<HTMLElement | null>) => {
  const rect = ref?.current?.getBoundingClientRect() ?? null;
  const width = rect ? rect.width || rect.right - rect.left : 0;
  const height = rect ? rect.height || rect.bottom - rect.top : 0;

  return {
    width,
    height,
  };
};

export const computePopupRect = (
  targetRef?: MutableRefObject<HTMLElement | null>,
  popupRef?: MutableRefObject<HTMLElement | null>
): PopupRect => {
  if (!targetRef?.current || !popupRef?.current) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
  }

  const rect = getRectRelativeToOffsetParent(
    targetRef?.current,
    getOffsetParent(popupRef?.current),
    'absolute'
  );

  return {
    top: rect.y,
    bottom: rect.y + rect.height,
    left: rect.x,
    right: rect.x + rect.width,
  };
};
