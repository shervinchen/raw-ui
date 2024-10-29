import React, { FC, PropsWithChildren, useId, useRef } from 'react';
import classNames from 'classnames';
import { useClickAway, useKeyPressEvent } from 'react-use';
import { PopoverProps } from './Popover.types';
import { useControlled, useTransition } from '../utils/hooks';
import Popup from '../Popup';
import { computePopupPosition } from '../Popup/computePopup';
import { useTheme } from '../Theme';
import PopoverArrow from './PopoverArrow';
import { KeyCode } from '../utils/constant';

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
  const popoverId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [internalValue, setInternalValue] = useControlled<boolean>({
    defaultValue,
    value,
  });
  const { stage, shouldMount } = useTransition(internalValue, 0, 50);
  const classes = classNames('raw-popover', className);

  const handleClick = () => {
    if (!disabled) {
      setInternalValue(!internalValue);
      onChange?.(!internalValue);
    }
  };

  useClickAway(
    ref,
    () => {
      setInternalValue(false);
    },
    ['click']
  );

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
        ref={ref}
        onClick={handleClick}
        className="raw-popover-target"
        {...restProps}
      >
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
          role="dialog"
          id={popoverId}
          className={classes}
          style={{
            opacity: stage === 'enter' ? 1 : 0,
          }}
        >
          {!hideArrow && <PopoverArrow targetRef={ref} placement={placement} />}
          {content}
        </div>
      </Popup>
      <style jsx>{`
        .raw-popover {
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          border-radius: 6px;
          border: 1px solid ${theme.palette.accents2};
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
