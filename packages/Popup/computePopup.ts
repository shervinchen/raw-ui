import { MutableRefObject } from 'react';
import {
  PopupArrowOffset,
  PopupArrowPosition,
  PopupCoordinates,
  PopupPlacement,
  PopupPosition,
} from './Popup.types';

export const arrowSize = 8;

export const getTargetRect = (
  targetRef?: MutableRefObject<HTMLElement | null>
) => {
  const targetRect = targetRef?.current?.getBoundingClientRect() ?? null;
  const width = targetRect
    ? targetRect.width || targetRect.right - targetRect.left
    : 0;
  const height = targetRect
    ? targetRect.height || targetRect.bottom - targetRect.top
    : 0;

  return {
    width,
    height,
  };
};

const getElementOffset = (element?: HTMLElement | null) => {
  if (!element) return { offsetTop: 0, offsetLeft: 0 };
  const { top, left } = element.getBoundingClientRect();
  return { offsetTop: top, offsetLeft: left };
};

export const computePopupCoordinates = (
  targetRef?: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null
): PopupCoordinates => {
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

export const computePopupPosition = (
  placement: PopupPlacement,
  targetRef?: MutableRefObject<HTMLElement | null>,
  getPopupContainer?: () => HTMLElement | null
) => {
  const { top, bottom, left, right } = computePopupCoordinates(
    targetRef,
    getPopupContainer
  );
  const { width, height } = getTargetRect(targetRef);

  const placements: {
    [key in PopupPlacement]: PopupPosition;
  } = {
    top: {
      top: top - arrowSize,
      left: left + width / 2,
      transform: 'translate(-50%, -100%)',
    },
    topLeft: {
      top: top - arrowSize,
      left,
      transform: 'translate(0, -100%)',
    },
    topRight: {
      top: top - arrowSize,
      left: left + width,
      transform: 'translate(-100%, -100%)',
    },
    bottom: {
      top: bottom + arrowSize,
      left: left + width / 2,
      transform: 'translate(-50%, 0)',
    },
    bottomLeft: {
      top: bottom + arrowSize,
      left,
      transform: 'translate(0, 0)',
    },
    bottomRight: {
      top: bottom + arrowSize,
      left: left + width,
      transform: 'translate(-100%, 0)',
    },
    left: {
      top: top + height / 2,
      left: left - arrowSize,
      transform: 'translate(-100%, -50%)',
    },
    leftTop: {
      top,
      left: left - arrowSize,
      transform: 'translate(-100%, 0)',
    },
    leftBottom: {
      top: top + height,
      left: left - arrowSize,
      transform: 'translate(-100%, -100%)',
    },
    right: {
      top: top + height / 2,
      left: right + arrowSize,
      transform: 'translate(0, -50%)',
    },
    rightTop: {
      top,
      left: right + arrowSize,
      transform: 'translate(0, 0)',
    },
    rightBottom: {
      top: top + height,
      left: right + arrowSize,
      transform: 'translate(0, -100%)',
    },
  };

  return placements[placement] || placements['top'];
};

export const computePopupArrowPosition = (
  arrowOffset: PopupArrowOffset,
  arrowDistance: string,
  placement: PopupPlacement
) => {
  const placements: {
    [key in PopupPlacement]: PopupArrowPosition;
  } = {
    top: {
      top: 'auto',
      right: 'auto',
      left: '50%',
      bottom: arrowDistance,
      transform: 'translate(-50%, 100%) rotate(45deg)',
    },
    topLeft: {
      top: 'auto',
      right: 'auto',
      left: `${arrowOffset.x}`,
      bottom: arrowDistance,
      transform: 'translate(0, 100%) rotate(45deg)',
    },
    topRight: {
      top: 'auto',
      right: `${arrowOffset.x}`,
      left: 'auto',
      bottom: arrowDistance,
      transform: 'translate(0, 100%) rotate(45deg)',
    },
    bottom: {
      top: arrowDistance,
      right: 'auto',
      left: '50%',
      bottom: 'auto',
      transform: 'translate(-50%, -100%) rotate(45deg)',
    },
    bottomLeft: {
      top: arrowDistance,
      right: 'auto',
      left: `${arrowOffset.x}`,
      bottom: 'auto',
      transform: 'translate(0, -100%) rotate(45deg)',
    },
    bottomRight: {
      top: arrowDistance,
      right: `${arrowOffset.x}`,
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(0, -100%) rotate(45deg)',
    },
    left: {
      top: '50%',
      right: arrowDistance,
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(100%, -50%) rotate(45deg)',
    },
    leftTop: {
      top: `${arrowOffset.y}`,
      right: arrowDistance,
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(100%, -50%) rotate(45deg)',
    },
    leftBottom: {
      top: 'auto',
      right: arrowDistance,
      left: 'auto',
      bottom: `${arrowOffset.y}`,
      transform: 'translate(100%, 50%) rotate(45deg)',
    },
    right: {
      top: '50%',
      right: 'auto',
      left: arrowDistance,
      bottom: 'auto',
      transform: 'translate(-100%, -50%) rotate(45deg)',
    },
    rightTop: {
      top: `${arrowOffset.y}`,
      right: 'auto',
      left: arrowDistance,
      bottom: 'auto',
      transform: 'translate(-100%, -50%) rotate(45deg)',
    },
    rightBottom: {
      top: 'auto',
      right: 'auto',
      left: arrowDistance,
      bottom: `${arrowOffset.y}`,
      transform: 'translate(-100%, 50%) rotate(45deg)',
    },
  };

  return placements[placement] || placements['top'];
};
