import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { PopupProps, PopupPosition } from './Popup.types';
import {
  useClickAnyWhere,
  useMutationObserver,
  usePortal,
  useResize,
} from '../utils/hooks';

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  targetRef,
  getPopupPosition,
  getPopupContainer,
  children,
}) => {
  const portal = usePortal(name, getPopupContainer);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    left: 0,
    top: 0,
    transform: 'translate(0, 0)',
  });

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    // event.preventDefault();
  };

  const updatePopupPosition = () => {
    setPopupPosition(getPopupPosition());
  };

  useResize(updatePopupPosition);

  useClickAnyWhere(() => {
    updatePopupPosition();
  });

  useMutationObserver(targetRef, updatePopupPosition);

  useEffect(() => {
    const targetNode = targetRef?.current ?? null;
    if (!targetNode) return;
    targetNode.addEventListener('mouseenter', updatePopupPosition);
    /* istanbul ignore next */
    return () => {
      if (!targetNode) return;
      targetNode.removeEventListener('mouseenter', updatePopupPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef]);

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
            top: ${popupPosition.top}px;
            left: ${popupPosition.left}px;
            transform: ${popupPosition.transform};
          }
        `}</style>
      </div>
    ) : null,
    portal
  );
};

export default Popup;
