import React, { FC, PropsWithChildren, useId, useRef, useState } from 'react';
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
  const tooltipId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { stage, shouldMount } = useTransition(visible, 0, 50);
  const classes = classNames('raw-tooltip', className);

  const handleMouseEnterOrLeave = (nextValue: boolean) => {
    if (!disabled) {
      setVisible(nextValue);
    }
  };

  return (
    <>
      <div
        data-testid="tooltipTarget"
        aria-describedby={tooltipId}
        ref={ref}
        onMouseEnter={() => handleMouseEnterOrLeave(true)}
        onMouseLeave={() => handleMouseEnterOrLeave(false)}
        className="raw-tooltip-target"
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
          role="tooltip"
          id={tooltipId}
          className={classes}
          style={{
            opacity: stage === 'enter' ? 1 : 0,
          }}
        >
          {!hideArrow && <TooltipArrow targetRef={ref} placement={placement} />}
          {content}
        </div>
      </Popup>
      <style jsx>{`
        .raw-tooltip {
          background-color: ${theme.palette.foreground};
          color: ${theme.palette.background};
          border-radius: 6px;
          font-size: 14px;
          padding: 8px 12px;
          transition: opacity 0.05s ease;
        }
        .raw-tooltip-target {
          display: inline-flex;
        }
      `}</style>
    </>
  );
};

export default Tooltip;
