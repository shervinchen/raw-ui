import { MutableRefObject } from 'react';
import { PopupRect } from './Popup.types';
import { getRectRelativeToOffsetParent } from './utils/getRectRelativeToOffsetParent';
import { getOffsetParent } from './utils/getOffsetParent';
import { Strategy } from './utils/common';

export const getRectSize = (ref?: MutableRefObject<HTMLElement | null>) => {
  const rect = ref.current?.getBoundingClientRect() ?? null;
  const width = rect ? rect.width || rect.right - rect.left : 0;
  const height = rect ? rect.height || rect.bottom - rect.top : 0;

  return {
    width,
    height,
  };
};

export const computePopupRect = (
  strategy: Strategy,
  targetRef?: MutableRefObject<HTMLElement | null>,
  popupRef?: MutableRefObject<HTMLElement | null>
): PopupRect => {
  if (!targetRef.current || !popupRef.current) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
  }

  const rect = getRectRelativeToOffsetParent(
    targetRef.current,
    getOffsetParent(popupRef.current),
    strategy
  );

  return {
    top: rect.y,
    bottom: rect.y + rect.height,
    left: rect.x,
    right: rect.x + rect.width,
  };
};
