/* istanbul ignore file */
import { MutableRefObject } from 'react';
import { PopupRect } from './Popup.types';

const getElementOffset = (element?: HTMLElement | null) => {
  if (!element) return { offsetTop: 0, offsetLeft: 0 };
  const { top, left } = element.getBoundingClientRect();
  return { offsetTop: top, offsetLeft: left };
};

export const computePopupRect = (
  targetRef?: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null
): PopupRect => {
  const targetRect = targetRef?.current?.getBoundingClientRect() ?? null;
  const bodyRect = document.body.getBoundingClientRect();
  const container = getContainer?.() ?? null;
  const { offsetTop, offsetLeft } = getElementOffset(container);

  if (!targetRect) {
    return {
      top: 0,
      left: 0,
      width: 0,
    };
  }

  return {
    top: container
      ? targetRect.bottom + container.scrollTop - offsetTop
      : targetRect.bottom - bodyRect.top,
    left: container
      ? targetRect.left + container.scrollLeft - offsetLeft
      : targetRect.left - bodyRect.left,
    width: targetRect.width || targetRect.right - targetRect.left,
  };
};
