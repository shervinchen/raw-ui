/* istanbul ignore file */
import { MutableRefObject } from 'react';
import { PopupPosition } from './Popup.types';

const getElementOffset = (element?: HTMLElement | null) => {
  if (!element) return { offsetTop: 0, offsetLeft: 0 };
  const { top, left } = element.getBoundingClientRect();
  return { offsetTop: top, offsetLeft: left };
};

export const computePopupPosition = (
  targetRef?: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null
): PopupPosition => {
  const targetRect = targetRef?.current?.getBoundingClientRect() ?? null;
  const bodyRect = document.body.getBoundingClientRect();
  const container = getContainer?.() ?? null;
  const { offsetTop, offsetLeft } = getElementOffset(container);

  if (!targetRect) {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  }

  return {
    top: container
      ? targetRect.top + container.scrollTop - offsetTop
      : targetRect.top - bodyRect.top,
    bottom: container
      ? targetRect.bottom + container.scrollTop - offsetTop
      : targetRect.bottom - bodyRect.top,
    left: container
      ? targetRect.left + container.scrollLeft - offsetLeft
      : targetRect.left - bodyRect.left,
    right: container
      ? targetRect.right + container.scrollLeft - offsetLeft
      : targetRect.right - bodyRect.left,
  };
};
