import { CSSProperties, FC } from 'react';
import css from 'styled-jsx/css';
import { PopoverArrowProps } from './Popover.types';
import PopupArrow from '../Popup/PopupArrow';
import { RawUITheme, useTheme } from '../Theme';
import { PopupPlacement } from '../Popup/Popup.types';

const getArrowBorderColor = (
  theme: RawUITheme
): { [key in PopupPlacement]: CSSProperties } => {
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

  const { className, styles } = css.resolve`
    .raw-popup-arrow {
      background-color: ${theme.palette.background};
      border: 1px solid;
      border-top-color: ${arrowBorderColor[placement].borderTop};
      border-left-color: ${arrowBorderColor[placement].borderLeft};
      border-bottom-color: ${arrowBorderColor[placement].borderBottom};
      border-right-color: ${arrowBorderColor[placement].borderRight};
    }
  `;

  return (
    <>
      <PopupArrow
        targetRef={targetRef}
        placement={placement}
        className={className}
        withBorder
      />
      {styles}
    </>
  );
};

export default PopoverArrow;
