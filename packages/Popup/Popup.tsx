import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  MouseEvent,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { PopupProps, PopupRect } from './Popup.types';
import {
  useClickAnyWhere,
  useMutationObserver,
  usePortal,
  useResize,
} from '../utils/hooks';
import { computePopupRect } from './computePopupRect';

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  targetRef,
  getPopupContainer,
  children,
}) => {
  const portal = usePortal(name, getPopupContainer);
  const [popupRect, setPopupRect] = useState<PopupRect>({
    top: 0,
    left: 0,
    width: 0,
  });

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const updatePopupRect = useCallback(() => {
    const rect = computePopupRect(targetRef, getPopupContainer);
    setPopupRect(rect);
  }, [getPopupContainer, targetRef]);

  useResize(updatePopupRect);

  useClickAnyWhere(() => {
    const { top, left } = computePopupRect(targetRef, getPopupContainer);
    /* istanbul ignore next */
    const shouldUpdate = top !== popupRect.top || left !== popupRect.left;
    /* istanbul ignore next */
    if (shouldUpdate) updatePopupRect();
  });

  useMutationObserver(targetRef, updatePopupRect);

  useEffect(() => {
    const targetNode = targetRef?.current ?? null;
    if (!targetNode) return;
    targetNode.addEventListener('mouseenter', updatePopupRect);
    /* istanbul ignore next */
    return () => {
      if (!targetNode) return;
      targetNode.removeEventListener('mouseenter', updatePopupRect);
    };
  }, [targetRef, updatePopupRect]);

  if (!targetRef) return null;
  if (!portal) return null;

  return createPortal(
    visible ? (
      <div
        className="raw-popup"
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
        data-testid="popup"
      >
        {children}
        <style jsx>{`
          .raw-popup {
            position: absolute;
            top: ${popupRect.top + 2}px;
            left: ${popupRect.left}px;
            width: ${popupRect.width}px;
          }
        `}</style>
      </div>
    ) : null,
    portal
  );
};

export default Popup;
