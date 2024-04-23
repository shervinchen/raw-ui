import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import classNames from 'classnames';
import { TooltipProps } from './Tooltip.types';
import { useTransition } from '../utils/hooks';
import Popup from '../Popup';
import { computePopupPosition } from '../Popup/computePopup';
import TooltipArrow from './TooltipArrow';
import { useTheme } from '../Theme';

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  content,
  placement = 'top',
  hideArrow = false,
  disabled = false,
  className = '',
  getPopupContainer,
  children,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { stage, shouldMount } = useTransition(visible, 50, 50);
  const classes = classNames('raw-tooltip', className);

  const mouseHandler = (nextValue: boolean) => {
    if (!disabled) {
      setVisible(nextValue);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={classes}
        onMouseEnter={() => mouseHandler(true)}
        onMouseLeave={() => mouseHandler(false)}
        {...restProps}
      >
        {children}
      </div>
      <Popup
        name="tooltip"
        visible={shouldMount}
        targetRef={ref}
        getPopupPosition={() =>
          computePopupPosition(placement, ref, getPopupContainer)
        }
        getPopupContainer={getPopupContainer}
      >
        <div
          className="raw-tooltip-content"
          style={{
            opacity: stage === 'enter' ? 1 : 0,
          }}
          data-testid="tooltipContent"
        >
          {!hideArrow && <TooltipArrow targetRef={ref} placement={placement} />}
          {content}
        </div>
      </Popup>
      <style jsx>{`
        .raw-tooltip {
          display: inline-flex;
        }
        .raw-tooltip-content {
          background-color: ${theme.palette.foreground};
          color: ${theme.palette.background};
          border-radius: 6px;
          font-size: 14px;
          padding: 8px 12px;
          transition: opacity 0.05s ease;
        }
      `}</style>
    </>
  );
};

export default Tooltip;
