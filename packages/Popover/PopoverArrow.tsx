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
      borderBottom: theme.palette.accents2,
      borderRight: theme.palette.accents2,
    },
    topLeft: {
      borderTop: 'transparent',
      borderLeft: 'transparent',
      borderBottom: theme.palette.accents2,
      borderRight: theme.palette.accents2,
    },
    topRight: {
      borderTop: 'transparent',
      borderLeft: 'transparent',
      borderBottom: theme.palette.accents2,
      borderRight: theme.palette.accents2,
    },
    bottom: {
      borderTop: theme.palette.accents2,
      borderLeft: theme.palette.accents2,
      borderBottom: 'transparent',
      borderRight: 'transparent',
    },
    bottomLeft: {
      borderTop: theme.palette.accents2,
      borderLeft: theme.palette.accents2,
      borderBottom: 'transparent',
      borderRight: 'transparent',
    },
    bottomRight: {
      borderTop: theme.palette.accents2,
      borderLeft: theme.palette.accents2,
      borderBottom: 'transparent',
      borderRight: 'transparent',
    },
    left: {
      borderTop: theme.palette.accents2,
      borderLeft: 'transparent',
      borderBottom: 'transparent',
      borderRight: theme.palette.accents2,
    },
    leftTop: {
      borderTop: theme.palette.accents2,
      borderLeft: 'transparent',
      borderBottom: 'transparent',
      borderRight: theme.palette.accents2,
    },
    leftBottom: {
      borderTop: theme.palette.accents2,
      borderLeft: 'transparent',
      borderBottom: 'transparent',
      borderRight: theme.palette.accents2,
    },
    right: {
      borderTop: 'transparent',
      borderLeft: theme.palette.accents2,
      borderBottom: theme.palette.accents2,
      borderRight: 'transparent',
    },
    rightTop: {
      borderTop: 'transparent',
      borderLeft: theme.palette.accents2,
      borderBottom: theme.palette.accents2,
      borderRight: 'transparent',
    },
    rightBottom: {
      borderTop: 'transparent',
      borderLeft: theme.palette.accents2,
      borderBottom: theme.palette.accents2,
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
