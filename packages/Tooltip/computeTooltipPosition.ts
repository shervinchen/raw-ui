import { MutableRefObject } from 'react';
import {
  TooltipArrowOffset,
  TooltipArrowPosition,
  TooltipPlacement,
} from './Tooltip.types';
import { computePopupRect, getRectSize } from '../Popup/computePopupRect';
import { PopupPosition } from '../Popup/Popup.types';

export const arrowSize = 8;

export const computeTooltipPosition = (
  placement: TooltipPlacement,
  targetRef?: MutableRefObject<HTMLElement | null>,
  popupRef?: MutableRefObject<HTMLElement | null>
) => {
  const { top, bottom, left, right } = computePopupRect(targetRef, popupRef);
  const { width: targetWidth, height: targetHeight } = getRectSize(targetRef);
  const { width: popupWidth, height: popupHeight } = getRectSize(popupRef);

  const placements: {
    [key in TooltipPlacement]: PopupPosition;
  } = {
    top: {
      top: top - arrowSize - popupHeight,
      left: left + targetWidth / 2 - popupWidth / 2,
    },
    topLeft: {
      top: top - arrowSize - popupHeight,
      left,
    },
    topRight: {
      top: top - arrowSize - popupHeight,
      left: left + targetWidth - popupWidth,
    },
    bottom: {
      top: bottom + arrowSize,
      left: left + targetWidth / 2 - popupWidth / 2,
    },
    bottomLeft: {
      top: bottom + arrowSize,
      left,
    },
    bottomRight: {
      top: bottom + arrowSize,
      left: left + targetWidth - popupWidth,
    },
    left: {
      top: top + targetHeight / 2 - popupHeight / 2,
      left: left - arrowSize - popupWidth,
    },
    leftTop: {
      top,
      left: left - arrowSize - popupWidth,
    },
    leftBottom: {
      top: top + targetHeight - popupHeight,
      left: left - arrowSize - popupWidth,
    },
    right: {
      top: top + targetHeight / 2 - popupHeight / 2,
      left: right + arrowSize,
    },
    rightTop: {
      top,
      left: right + arrowSize,
    },
    rightBottom: {
      top: top + targetHeight - popupHeight,
      left: right + arrowSize,
    },
  };

  return placements[placement];
};

export const computeTooltipArrowPosition = (
  arrowOffset: TooltipArrowOffset,
  arrowDistance: string,
  placement: TooltipPlacement
) => {
  const placements: {
    [key in TooltipPlacement]: TooltipArrowPosition;
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

  return placements[placement];
};
