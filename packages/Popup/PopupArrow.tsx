import { FC, useMemo } from 'react';
import classNames from 'classnames';
import {
  getTargetRect,
  computePopupArrowPosition,
  arrowSize,
} from './computePopup';
import { PopupArrowProps, PopupArrowOffset } from './Popup.types';

const PopupArrow: FC<PopupArrowProps> = ({
  targetRef,
  placement,
  withBorder,
  className,
}) => {
  const arrowOffset = useMemo<PopupArrowOffset>(() => {
    const { width, height } = getTargetRect(targetRef);
    return {
      x: `${width / 2}px`,
      y: `${height / 2}px`,
    };
  }, [targetRef]);
  const { left, top, right, bottom, transform } = computePopupArrowPosition(
    arrowOffset,
    withBorder ? `${arrowSize / 2 + 1}px` : `${arrowSize / 2}px`,
    placement
  );
  const classes = classNames('raw-popup-arrow', className);

  return (
    <span className={classes}>
      <style jsx>{`
        .raw-popup-arrow {
          width: ${arrowSize}px;
          height: ${arrowSize}px;
          position: absolute;
          left: ${left};
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          transform: ${transform};
        }
      `}</style>
    </span>
  );
};

export default PopupArrow;
