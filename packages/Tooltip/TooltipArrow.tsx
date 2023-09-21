import { FC } from 'react';
import css from 'styled-jsx/css';
import { TooltipArrowProps } from './Tooltip.types';
import PopupArrow from '../Popup/PopupArrow';
import { useTheme } from '../Theme';

const TooltipArrow: FC<TooltipArrowProps> = ({ targetRef, placement }) => {
  const theme = useTheme();

  const { className, styles } = css.resolve`
    .raw-popup-arrow {
      background-color: ${theme.palette.foreground};
    }
  `;

  return (
    <>
      <PopupArrow
        targetRef={targetRef}
        placement={placement}
        className={className}
        withBorder={false}
      />
      {styles}
    </>
  );
};

export default TooltipArrow;
