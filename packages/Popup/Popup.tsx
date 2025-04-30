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
  useIntersectionObserver,
  useMutationObserver,
  usePortal,
  useResize,
  useResizeObserver,
  useSSR,
} from '../utils/hooks';

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  zIndex,
  targetRef,
  getPopupPosition,
  getPopupContainer,
  children,
}) => {
  const { isBrowser } = useSSR();
  const portal = usePortal(name, getPopupContainer);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    left: 0,
    top: 0,
    transform: 'translate(0, 0)',
  });
  const container = isBrowser ? getPopupContainer?.() ?? document.body : null;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const updatePopupPosition = useCallback(() => {
    const newPosition = getPopupPosition();
    setPopupPosition((prevPosition) => {
      if (
        prevPosition.left !== newPosition.left ||
        prevPosition.top !== newPosition.top ||
        prevPosition.transform !== newPosition.transform
      ) {
        return newPosition;
      }
      return prevPosition;
    });
  }, [getPopupPosition]);

  useResize(updatePopupPosition);

  useMutationObserver(container, updatePopupPosition, {
    attributes: true,
    childList: false,
    subtree: false,
  });

  useMutationObserver(targetRef?.current, updatePopupPosition);

  useResizeObserver(targetRef?.current, updatePopupPosition);

  useIntersectionObserver(targetRef?.current, updatePopupPosition, {
    root: null,
    threshold: 0,
  });

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
            z-index: ${zIndex};
          }
        `}</style>
      </div>
    ) : null,
    portal
  );
};

export default Popup;
