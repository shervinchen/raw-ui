import { FC, useMemo } from 'react';
import { TooltipArrowOffset, TooltipArrowProps } from './Tooltip.types';
import { useTheme } from '../Theme';
import { getRectSize } from '../Popup/computePopupRect';
import {
  arrowSize,
  computeTooltipArrowPosition,
} from './computeTooltipPosition';

const TooltipArrow: FC<TooltipArrowProps> = ({ targetRef, placement }) => {
  const theme = useTheme();
  const arrowOffset = useMemo<TooltipArrowOffset>(() => {
    const { width, height } = getRectSize(targetRef);
    return {
      x: `${width / 2}px`,
      y: `${height / 2}px`,
    };
  }, [targetRef]);
  const { left, top, right, bottom, transform } = computeTooltipArrowPosition(
    arrowOffset,
    `${arrowSize / 2}px`,
    placement
  );

  return (
    <span className="raw-tooltip-arrow">
      <style jsx>{`
        .raw-tooltip-arrow {
          width: ${arrowSize}px;
          height: ${arrowSize}px;
          position: absolute;
          left: ${left};
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          transform: ${transform};
          background-color: ${theme.palette.foreground};
        }
      `}</style>
    </span>
  );
};

export default TooltipArrow;
