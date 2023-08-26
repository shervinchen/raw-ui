import { FC, useMemo } from 'react';
import { TooltipArrowOffset, TooltipArrowProps } from './Tooltip.types';
import {
  computeTooltipArrowPosition,
  getTargetRect,
} from './computeTooltipPosition';
import { useTheme } from '../Theme';

const TooltipArrow: FC<TooltipArrowProps> = ({ targetRef, placement }) => {
  const theme = useTheme();
  const arrowOffset = useMemo<TooltipArrowOffset>(() => {
    const { width, height } = getTargetRect(targetRef);
    return {
      x: `${width / 2}px`,
      y: `${height / 2}px`,
    };
  }, [targetRef]);
  const { left, top, right, bottom, transform } = computeTooltipArrowPosition(
    arrowOffset,
    placement
  );

  return (
    <span>
      <style jsx>{`
        span {
          width: 6px;
          height: 6px;
          border: 0;
          background-color: ${theme.palette.foreground};
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

export default TooltipArrow;
