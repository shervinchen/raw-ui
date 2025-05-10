import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  MouseEvent,
  useRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { PopupProps, PopupPosition } from './Popup.types';
import {
  useIntersectionObserver,
  usePortal,
  useResizeObserver,
} from '../utils/hooks';
import { getOverflowAncestors, OverflowAncestors } from './utils/dom';

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  zIndex,
  strategy = 'absolute',
  targetRef,
  targetElement,
  getPopupPosition,
  getPopupContainer,
  children,
}) => {
  const portal = usePortal(name, getPopupContainer);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupElement, setPopupElement] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const updatePopupPosition = () => {
    const newPosition = getPopupPosition(popupRef);
    setPopupPosition((prevPosition) => {
      if (
        prevPosition.left !== newPosition.left ||
        prevPosition.top !== newPosition.top
      ) {
        return newPosition;
      }
      return prevPosition;
    });
  };

  const setPopupRef = useCallback((element: HTMLDivElement | null) => {
    popupRef.current = element;
    updatePopupPosition();
    setPopupElement(element);
  }, []);

  const bindAncestorsListeners = (ancestors) => {
    ancestors.forEach((ancestor) => {
      ancestor.addEventListener('scroll', updatePopupPosition, {
        passive: true,
      });
      ancestor.addEventListener('resize', updatePopupPosition);
    });
  };

  const unbindAncestorsListeners = (ancestors) => {
    ancestors.forEach((ancestor) => {
      ancestor.removeEventListener('scroll', updatePopupPosition);
      ancestor.removeEventListener('resize', updatePopupPosition);
    });
  };

  useResizeObserver(targetRef, updatePopupPosition);

  useResizeObserver(popupRef, updatePopupPosition);

  useIntersectionObserver(targetRef, updatePopupPosition, {
    root: null,
    threshold: 0,
  });

  useEffect(() => {
    const ancestors: OverflowAncestors = [
      ...(targetElement ? getOverflowAncestors(targetElement) : []),
      ...(popupElement ? getOverflowAncestors(popupElement) : []),
    ];
    bindAncestorsListeners(ancestors);

    return () => {
      unbindAncestorsListeners(ancestors);
    };
  }, [targetElement, popupElement]);

  if (!portal || !targetRef.current) return null;

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
    portal
  );
};

export default Popup;
