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
import { useModalContext } from '../Modal/modal-context';

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  zIndex,
  targetRef,
  getPopupPosition,
  getPopupContainer,
  children,
}) => {
  const { getPopupContainerInModal } = useModalContext();
  const portal = usePortal(
    name,
    getPopupContainer?.()
      ? getPopupContainer
      : getPopupContainerInModal?.()
      ? getPopupContainerInModal
      : getPopupContainer
  );
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const popupRef = useRef<HTMLDivElement>(null);
  const ancestors = useRef<OverflowAncestors>([]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const updatePopupPosition = useCallback(() => {
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
  }, [getPopupPosition]);

  const bindAncestorsListeners = useCallback(() => {
    ancestors.current.forEach((ancestor) => {
      ancestor.addEventListener('scroll', updatePopupPosition, {
        passive: true,
      });
      ancestor.addEventListener('resize', updatePopupPosition);
    });
  }, [updatePopupPosition]);

  const unbindAncestorsListeners = useCallback(() => {
    ancestors.current.forEach((ancestor) => {
      ancestor.removeEventListener('scroll', updatePopupPosition);
      ancestor.removeEventListener('resize', updatePopupPosition);
    });
  }, [updatePopupPosition]);

  useResizeObserver(targetRef?.current, updatePopupPosition);

  useResizeObserver(popupRef?.current, updatePopupPosition);

  useIntersectionObserver(targetRef?.current, updatePopupPosition, {
    root: null,
    threshold: 0,
  });

  useEffect(() => {
    if (visible) {
      updatePopupPosition();
      bindAncestorsListeners();
    }

    return () => {
      unbindAncestorsListeners();
    };
  }, [
    visible,
    updatePopupPosition,
    bindAncestorsListeners,
    unbindAncestorsListeners,
  ]);

  if (!portal || !targetRef?.current) return null;

  return createPortal(
    visible ? (
      <div
        ref={(element) => {
          popupRef.current = element;
          ancestors.current = [
            ...(targetRef?.current
              ? getOverflowAncestors(targetRef?.current)
              : []),
            ...(popupRef?.current
              ? getOverflowAncestors(popupRef?.current)
              : []),
          ];
        }}
        className="raw-popup"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        data-testid="popup"
      >
        {children}
        <style jsx>{`
          .raw-popup {
            position: absolute;
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
