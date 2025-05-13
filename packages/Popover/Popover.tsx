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
import { useClickAway, useKeyPressEvent } from 'react-use';
import { PopoverProps } from './Popover.types';
import { useControlled, useTransition } from '../utils/hooks';
import Popup from '../Popup';
import { computePopoverPosition } from './computePopoverPosition';
import { useTheme } from '../Theme';
import PopoverArrow from './PopoverArrow';
import { KeyCode } from '../utils/constant';
import { getZIndexByClosestFloating } from '../Popup/getClosestFloatingZIndex';

const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  content,
  defaultValue = false,
  value,
  placement = 'top',
  hideArrow = false,
  disabled = false,
  strategy = 'absolute',
  className = '',
  getPopupContainer,
  onChange,
  children,
  ...restProps
}) => {
  const popoverId = useId();
  const theme = useTheme();
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue,
    value,
  });
  const { stage, shouldMount } = useTransition(internalValue, 0, 50);
  const popoverTargetRef = useRef<HTMLDivElement | null>(null);
  const [popoverTarget, setPopoverTarget] = useState<HTMLDivElement | null>(
    null,
  );
  const [zIndex, setZIndex] = useState(theme.zIndex.popover);
  const classes = classNames('raw-popover', className);

  const setPopoverTargetRef = useCallback(
    (element: HTMLDivElement | null) => {
      popoverTargetRef.current = element;
      const closestZIndex = getZIndexByClosestFloating(
        popoverTargetRef.current,
        theme.zIndex.popover,
      );
      setZIndex(closestZIndex);
      setPopoverTarget(element);
    },
    [theme],
  );

  const getPopupPosition = useCallback(
    (popupRef: MutableRefObject<HTMLDivElement | null>) => {
      return computePopoverPosition(
        placement,
        strategy,
        popoverTargetRef,
        popupRef,
      );
    },
    [placement, strategy],
  );

  const handleClick = () => {
    if (!disabled) {
      setInternalValue(!internalValue);
      onChange?.(!internalValue);
    }
  };

  useClickAway(popoverTargetRef, () => {
    setInternalValue(false);
  }, ['click']);

  useKeyPressEvent(KeyCode.Escape, () => {
    setInternalValue(false);
    onChange?.(false);
  });

  return (
    <>
      <div
        aria-expanded={internalValue ? 'true' : 'false'}
        aria-haspopup="dialog"
        data-testid="popoverTarget"
        aria-controls={popoverId}
        ref={setPopoverTargetRef}
        onClick={handleClick}
        className="raw-popover-target"
        {...restProps}
      >
        {children}
      </div>
      <Popup
        name="popover"
        visible={shouldMount}
        zIndex={zIndex}
        strategy={strategy}
        targetElement={popoverTarget}
        getPopupPosition={getPopupPosition}
        getPopupContainer={getPopupContainer}
      >
        <div
          role="dialog"
          id={popoverId}
          className={classes}
          style={{
            opacity: stage === 'enter' ? 1 : 0,
          }}
        >
          {!hideArrow && (
            <PopoverArrow targetRef={popoverTargetRef} placement={placement} />
          )}
          {content}
        </div>
      </Popup>
      <style jsx>{`
        .raw-popover {
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          border-radius: 6px;
          border: 1px solid ${theme.palette.neutral['200']};
          box-shadow: ${theme.tokens.shadow.sm};
          font-size: 14px;
          padding: 8px 12px;
          transition: opacity 0.05s ease;
        }
        .raw-popover-target {
          display: inline-flex;
        }
      `}</style>
    </>
  );
};

export default Popover;
