import { MutableRefObject } from 'react';
import { computePopupPosition } from '../Popup/computePopupPosition';
import {
  TooltipArrowOffset,
  TooltipArrowPosition,
  TooltipPlacement,
  TooltipPosition,
} from './Tooltip.types';

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

export const computeTooltipPosition = (
  placement: TooltipPlacement,
  targetRef?: MutableRefObject<HTMLElement | null>,
  getPopupContainer?: () => HTMLElement | null
) => {
  const { top, bottom, left, right } = computePopupPosition(
    targetRef,
    getPopupContainer
  );
  const { width, height } = getTargetRect(targetRef);
  const offset = 6;

  const placements: {
    [key in TooltipPlacement]: TooltipPosition;
  } = {
    top: {
      top: top - offset,
      left: left + width / 2,
      transform: 'translate(-50%, -100%)',
    },
    topLeft: {
      top: top - offset,
      left,
      transform: 'translate(0, -100%)',
    },
    topRight: {
      top: top - offset,
      left: left + width,
      transform: 'translate(-100%, -100%)',
    },
    bottom: {
      top: bottom + offset,
      left: left + width / 2,
      transform: 'translate(-50%, 0)',
    },
    bottomLeft: {
      top: bottom + offset,
      left,
      transform: 'translate(0, 0)',
    },
    bottomRight: {
      top: bottom + offset,
      left: left + width,
      transform: 'translate(-100%, 0)',
    },
    left: {
      top: top + height / 2,
      left: left - offset,
      transform: 'translate(-100%, -50%)',
    },
    leftTop: {
      top,
      left: left - offset,
      transform: 'translate(-100%, 0)',
    },
    leftBottom: {
      top: top + height,
      left: left - offset,
      transform: 'translate(-100%, -100%)',
    },
    right: {
      top: top + height / 2,
      left: right + offset,
      transform: 'translate(0, -50%)',
    },
    rightTop: {
      top,
      left: right + offset,
      transform: 'translate(0, 0)',
    },
    rightBottom: {
      top: top + height,
      left: right + offset,
      transform: 'translate(0, -100%)',
    },
  };

  return placements[placement] || placements['top'];
};

export const computeTooltipArrowPosition = (
  arrowOffset: TooltipArrowOffset,
  placement: TooltipPlacement
) => {
  const placements: {
    [key in TooltipPlacement]: TooltipArrowPosition;
  } = {
    top: {
      top: 'auto',
      right: 'auto',
      left: '50%',
      bottom: '3px',
      transform: 'translate(-50%, 100%) rotate(45deg)',
    },
    topLeft: {
      top: 'auto',
      right: 'auto',
      left: `${arrowOffset.x}`,
      bottom: '3px',
      transform: 'translate(0, 100%) rotate(45deg)',
    },
    topRight: {
      top: 'auto',
      right: `${arrowOffset.x}`,
      left: 'auto',
      bottom: '3px',
      transform: 'translate(0, 100%) rotate(45deg)',
    },
    bottom: {
      top: '3px',
      right: 'auto',
      left: '50%',
      bottom: 'auto',
      transform: 'translate(-50%, -100%) rotate(45deg)',
    },
    bottomLeft: {
      top: '3px',
      right: 'auto',
      left: `${arrowOffset.x}`,
      bottom: 'auto',
      transform: 'translate(0, -100%) rotate(45deg)',
    },
    bottomRight: {
      top: '3px',
      right: `${arrowOffset.x}`,
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(0, -100%) rotate(45deg)',
    },
    left: {
      top: '50%',
      right: '3px',
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(100%, -50%) rotate(45deg)',
    },
    leftTop: {
      top: `${arrowOffset.y}`,
      right: '3px',
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(100%, -50%) rotate(45deg)',
    },
    leftBottom: {
      top: 'auto',
      right: '3px',
      left: 'auto',
      bottom: `${arrowOffset.y}`,
      transform: 'translate(100%, 50%) rotate(45deg)',
    },
    right: {
      top: '50%',
      right: 'auto',
      left: '3px',
      bottom: 'auto',
      transform: 'translate(-100%, -50%) rotate(45deg)',
    },
    rightTop: {
      top: `${arrowOffset.y}`,
      right: 'auto',
      left: '3px',
      bottom: 'auto',
      transform: 'translate(-100%, -50%) rotate(45deg)',
    },
    rightBottom: {
      top: 'auto',
      right: 'auto',
      left: '3px',
      bottom: `${arrowOffset.y}`,
      transform: 'translate(-100%, 50%) rotate(45deg)',
    },
  };

  return placements[placement] || placements['top'];
};
