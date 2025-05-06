import { CSSProperties, FC, useMemo } from 'react';
import {
  PopoverArrowProps,
  PopoverArrowOffset,
  PopoverPlacement,
} from './Popover.types';
import { RawUITheme, useTheme } from '../Theme';
import { getRectSize } from '../Popup/computePopupRect';
import {
  arrowSize,
  computePopoverArrowPosition,
} from './computePopoverPosition';

const getArrowBorderColor = (
  theme: RawUITheme
): { [key in PopoverPlacement]: CSSProperties } => {
  return {
    top: {
      borderTop: 'transparent',
      borderLeft: 'transparent',
      borderBottom: theme.palette.neutral['200'],
      borderRight: theme.palette.neutral['200'],
    },
    topLeft: {
      borderTop: 'transparent',
      borderLeft: 'transparent',
      borderBottom: theme.palette.neutral['200'],
      borderRight: theme.palette.neutral['200'],
    },
    topRight: {
      borderTop: 'transparent',
      borderLeft: 'transparent',
      borderBottom: theme.palette.neutral['200'],
      borderRight: theme.palette.neutral['200'],
    },
    bottom: {
      borderTop: theme.palette.neutral['200'],
      borderLeft: theme.palette.neutral['200'],
      borderBottom: 'transparent',
      borderRight: 'transparent',
    },
    bottomLeft: {
      borderTop: theme.palette.neutral['200'],
      borderLeft: theme.palette.neutral['200'],
      borderBottom: 'transparent',
      borderRight: 'transparent',
    },
    bottomRight: {
      borderTop: theme.palette.neutral['200'],
      borderLeft: theme.palette.neutral['200'],
      borderBottom: 'transparent',
      borderRight: 'transparent',
    },
    left: {
      borderTop: theme.palette.neutral['200'],
      borderLeft: 'transparent',
      borderBottom: 'transparent',
      borderRight: theme.palette.neutral['200'],
    },
    leftTop: {
      borderTop: theme.palette.neutral['200'],
      borderLeft: 'transparent',
      borderBottom: 'transparent',
      borderRight: theme.palette.neutral['200'],
    },
    leftBottom: {
      borderTop: theme.palette.neutral['200'],
      borderLeft: 'transparent',
      borderBottom: 'transparent',
      borderRight: theme.palette.neutral['200'],
    },
    right: {
      borderTop: 'transparent',
      borderLeft: theme.palette.neutral['200'],
      borderBottom: theme.palette.neutral['200'],
      borderRight: 'transparent',
    },
    rightTop: {
      borderTop: 'transparent',
      borderLeft: theme.palette.neutral['200'],
      borderBottom: theme.palette.neutral['200'],
      borderRight: 'transparent',
    },
    rightBottom: {
      borderTop: 'transparent',
      borderLeft: theme.palette.neutral['200'],
      borderBottom: theme.palette.neutral['200'],
      borderRight: 'transparent',
    },
  };
};

const PopoverArrow: FC<PopoverArrowProps> = ({ targetRef, placement }) => {
  const theme = useTheme();
  const arrowBorderColor = getArrowBorderColor(theme);
  const arrowOffset = useMemo<PopoverArrowOffset>(() => {
    const { width, height } = getRectSize(targetRef);
    return {
      x: `${width / 2}px`,
      y: `${height / 2}px`,
    };
  }, [targetRef]);
  const { left, top, right, bottom, transform } = computePopoverArrowPosition(
    arrowOffset,
    `${arrowSize / 2 + 1}px`,
    placement
  );

  return (
    <span className="raw-popover-arrow">
      <style jsx>{`
        .raw-popover-arrow {
          width: ${arrowSize}px;
          height: ${arrowSize}px;
          position: absolute;
          left: ${left};
          top: ${top};
          right: ${right};
          bottom: ${bottom};
          transform: ${transform};
          background-color: ${theme.palette.background};
          border: 1px solid;
          border-top-color: ${arrowBorderColor[placement].borderTop};
          border-left-color: ${arrowBorderColor[placement].borderLeft};
          border-bottom-color: ${arrowBorderColor[placement].borderBottom};
          border-right-color: ${arrowBorderColor[placement].borderRight};
        }
      `}</style>
    </span>
  );
};

export default PopoverArrow;
