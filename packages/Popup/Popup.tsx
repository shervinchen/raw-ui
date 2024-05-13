import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  MouseEvent,
  useCallback,
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

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const updatePopupPosition = useCallback(() => {
    setPopupPosition(getPopupPosition());
  }, [getPopupPosition]);

  useResize(updatePopupPosition);

  useClickAnyWhere(() => {
    updatePopupPosition();
  });

  useMutationObserver(targetRef, updatePopupPosition);

  useEffect(() => {
    const targetNode = targetRef?.current ?? null;
    targetNode?.addEventListener('mouseenter', updatePopupPosition);
    return () => {
      targetNode?.removeEventListener('mouseenter', updatePopupPosition);
    };
  }, [targetRef, updatePopupPosition]);

  if (!targetRef) return null;
  if (!portal) return null;

  return createPortal(
    visible ? (
      <div
        className="raw-popup"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
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
