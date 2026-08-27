import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  useRef,
  useEffectEvent,
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

  const calculatePopupPosition = () => {
    const newPosition = getPopupPosition(popupRef);
    setPopupPosition(newPosition);
  };
  const updatePopupPosition = useEffectEvent(calculatePopupPosition);

  const setPopupRef = useCallback((element: HTMLDivElement | null) => {
    popupRef.current = element;
    setPopupElement(element);
  }, []);

  useResizeObserver(targetElement, calculatePopupPosition);

  useResizeObserver(popupElement, calculatePopupPosition);

  useEffect(() => {
    const cleanupIo = targetElement
      ? observeMove(targetElement, updatePopupPosition)
      : null;

    return () => {
      cleanupIo?.();
    };
  }, [targetElement]);

  useEffect(() => {
    const ancestors: OverflowAncestors = [
      ...(targetElement ? getOverflowAncestors(targetElement) : []),
      ...(popupElement ? getOverflowAncestors(popupElement) : []),
    ];

    ancestors.forEach((ancestor) => {
      ancestor.addEventListener('scroll', updatePopupPosition, {
        passive: true,
      });
      ancestor.addEventListener('resize', updatePopupPosition);
    });

    return () => {
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener('scroll', updatePopupPosition);
        ancestor.removeEventListener('resize', updatePopupPosition);
      });
    };
  }, [targetElement, popupElement]);

  useEffect(() => {
    if (popupElement) {
      updatePopupPosition();
    }
  }, [popupElement]);

  if (!portal || !targetElement) return null;

  return createPortal(
    visible ? (
      <div
        ref={setPopupRef}
        className="raw-popup"
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
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
