import React, {
  FC,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TooltipProps } from './Tooltip.types';
import { useTransition } from '../utils/hooks';
import Popup from '../Popup';
import { computeTooltipPosition } from './computeTooltipPosition';
import TooltipArrow from './TooltipArrow';
import { useTheme } from '../Theme';
import { getZIndexByClosestFloating } from '../Popup/getClosestFloatingZIndex';

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  content,
  placement = 'top',
  hideArrow = false,
  disabled = false,
  strategy = 'absolute',
  className = '',
  getPopupContainer,
  children,
  ...restProps
}) => {
  const tooltipId = useId();
  const tooltipTargetRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLDivElement | null>(
    null,
  );
  const [zIndex, setZIndex] = useState(theme.zIndex.tooltip);
  const { stage, shouldMount } = useTransition(visible, 0, 50);
  const classes = classNames('raw-tooltip', className);

  const handleMouseEnterOrLeave = (nextValue: boolean) => {
    if (!disabled) {
      setVisible(nextValue);
    }
  };

  const setTooltipTargetRef = useCallback(
    (element: HTMLDivElement | null) => {
      tooltipTargetRef.current = element;
      const closestZIndex = getZIndexByClosestFloating(
        tooltipTargetRef.current,
        theme.zIndex.tooltip,
      );
      setZIndex(closestZIndex);
      setTooltipTarget(element);
    },
    [theme],
  );

  const getPopupPosition = useCallback(
    (popupRef: MutableRefObject<HTMLDivElement | null>) => {
      return computeTooltipPosition(
        placement,
        strategy,
        tooltipTargetRef,
        popupRef,
      );
    },
    [placement, strategy],
  );

  return (
    <>
      <div
        data-testid="tooltipTarget"
        aria-describedby={tooltipId}
        ref={setTooltipTargetRef}
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
        zIndex={zIndex}
        strategy={strategy}
        targetRef={tooltipTargetRef}
        targetElement={tooltipTarget}
        getPopupPosition={getPopupPosition}
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
          {!hideArrow && (
            <TooltipArrow targetRef={tooltipTargetRef} placement={placement} />
          )}
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
