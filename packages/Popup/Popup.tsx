import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  MouseEvent,
  useCallback,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { PopupProps, PopupPosition } from './Popup.types';
import { usePortal, useResizeObserver } from '../utils/hooks';
import { getOverflowAncestors, OverflowAncestors } from './utils/dom';
import { observeMove } from './utils/observeMove';

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  zIndex,
  strategy = 'absolute',
  targetElement,
  getPopupPosition,
  getPopupContainer,
  children,
}) => {
  const portal = usePortal(name, getPopupContainer);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupElement, setPopupElement] = useState<HTMLDivElement | null>(null);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const updatePopupPosition = useCallback(() => {
    const newPosition = getPopupPosition(popupRef);
    setPopupPosition(newPosition);
  }, [getPopupPosition]);

  const setPopupRef = useCallback(
    (element: HTMLDivElement | null) => {
      popupRef.current = element;
      updatePopupPosition();
      setPopupElement(element);
    },
    [updatePopupPosition],
  );

  const bindAncestorsListeners = useCallback(
    (ancestors: OverflowAncestors) => {
      ancestors.forEach((ancestor) => {
        ancestor.addEventListener('scroll', updatePopupPosition, {
          passive: true,
        });
        ancestor.addEventListener('resize', updatePopupPosition);
      });
    },
    [updatePopupPosition],
  );

  const unbindAncestorsListeners = useCallback(
    (ancestors: OverflowAncestors) => {
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener('scroll', updatePopupPosition);
        ancestor.removeEventListener('resize', updatePopupPosition);
      });
    },
    [updatePopupPosition],
  );

  useResizeObserver(targetElement, updatePopupPosition);

  useResizeObserver(popupElement, updatePopupPosition);

  useEffect(() => {
    const cleanupIo = targetElement
      ? observeMove(targetElement, updatePopupPosition)
      : null;

    return () => {
      cleanupIo?.();
    };
  }, [
    targetElement,
    updatePopupPosition,
    bindAncestorsListeners,
    unbindAncestorsListeners,
  ]);

  useEffect(() => {
    const ancestors: OverflowAncestors = [
      ...(targetElement ? getOverflowAncestors(targetElement) : []),
      ...(popupElement ? getOverflowAncestors(popupElement) : []),
    ];
    bindAncestorsListeners(ancestors);

    return () => {
      unbindAncestorsListeners(ancestors);
    };
  }, [
    targetElement,
    popupElement,
    bindAncestorsListeners,
    unbindAncestorsListeners,
  ]);

  if (!portal || !targetElement) return null;

  return createPortal(
    visible ? (
      <div
        ref={setPopupRef}
        className="raw-popup"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        data-testid="popup"
      >
        {children}
        <style jsx>{`
          .raw-popup {
            position: ${strategy};
            top: 0;
            left: 0;
            transform: translate3d(
              ${popupPosition.left}px,
              ${popupPosition.top}px,
              0
            );
            z-index: ${zIndex};
          }
        `}</style>
      </div>
    ) : null,
    portal,
  );
};

export default Popup;
