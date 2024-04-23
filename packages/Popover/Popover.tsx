import React, { FC, PropsWithChildren, useRef } from 'react';
import classNames from 'classnames';
import { PopoverProps } from './Popover.types';
import { useClickAway, useControlled, useTransition } from '../utils/hooks';
import Popup from '../Popup';
import { computePopupPosition } from '../Popup/computePopup';
import { useTheme } from '../Theme';
import PopoverArrow from './PopoverArrow';

const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  content,
  defaultValue = false,
  value,
  placement = 'top',
  hideArrow = false,
  disabled = false,
  className = '',
  getPopupContainer,
  onChange,
  children,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue,
    value,
  });
  const { stage, shouldMount } = useTransition(internalValue, 50, 50);
  const classes = classNames('raw-popover', className);

  const clickHandler = () => {
    if (!disabled) {
      setInternalValue(!internalValue);
      onChange?.(!internalValue);
    }
  };

  useClickAway(
    ref,
    () => {
      if (internalValue) {
        setInternalValue(false);
      }
    },
    ['click']
  );

  return (
    <>
      <div ref={ref} className={classes} onClick={clickHandler} {...restProps}>
        {children}
      </div>
      <Popup
        name="popover"
        visible={shouldMount}
        targetRef={ref}
        getPopupPosition={() =>
          computePopupPosition(placement, ref, getPopupContainer)
        }
        getPopupContainer={getPopupContainer}
      >
        <div
          className="raw-popover-content"
          style={{
            opacity: stage === 'enter' ? 1 : 0,
          }}
          data-testid="popoverContent"
        >
          {!hideArrow && <PopoverArrow targetRef={ref} placement={placement} />}
          {content}
        </div>
      </Popup>
      <style jsx>{`
        .raw-popover {
          display: inline-flex;
        }
        .raw-popover-content {
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          border-radius: 6px;
          border: 1px solid ${theme.palette.accents2};
          box-shadow: ${theme.tokens.shadow.sm};
          font-size: 14px;
          padding: 8px 12px;
          transition: opacity 0.05s ease;
        }
      `}</style>
    </>
  );
};

export default Popover;
