import React, {
  FC,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { PopupProps } from "./Popup.types";
import {
  useClickAnyWhere,
  useMutationObserver,
  usePortal,
  useResize,
} from "../utils/hooks";

interface PopupRect {
  top: number;
  left: number;
  width: number;
}

const defaultPopupRect: PopupRect = {
  top: 0,
  left: 0,
  width: 0,
};

const getElementOffset = (element?: HTMLElement | null) => {
  if (!element) return { offsetTop: 0, offsetLeft: 0 };
  const { top, left } = element.getBoundingClientRect();
  return { offsetTop: top, offsetLeft: left };
};

const computePopupRect = (
  targetRef?: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null
): PopupRect => {
  const targetRect = targetRef?.current?.getBoundingClientRect() ?? null;
  const bodyRect = document.body.getBoundingClientRect();
  const container = getContainer?.() ?? null;
  const { offsetTop, offsetLeft } = getElementOffset(container);

  if (!targetRect) return defaultPopupRect;

  return {
    top: container
      ? targetRect.bottom + container.scrollTop - offsetTop
      : targetRect.bottom - bodyRect.top,
    left: container
      ? targetRect.left + container.scrollLeft - offsetLeft
      : targetRect.left - bodyRect.left,
    width: targetRect.width || targetRect.right - targetRect.left,
  };
};

const Popup: FC<PropsWithChildren<PopupProps>> = ({
  name,
  visible,
  targetRef,
  getPopupContainer,
  children,
}) => {
  const portal = usePortal(name, getPopupContainer);
  const [popupRect, setPopupRect] = useState<PopupRect>(defaultPopupRect);

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const updatePopupRect = () => {
    const rect = computePopupRect(targetRef, getPopupContainer);
    setPopupRect(rect);
  };

  useResize(updatePopupRect);

  useClickAnyWhere(() => {
    const { top, left } = computePopupRect(targetRef, getPopupContainer);
    const shouldUpdate = top !== popupRect.top || left !== popupRect.left;
    if (shouldUpdate) updatePopupRect();
  });

  useMutationObserver(targetRef, updatePopupRect);

  useEffect(() => {
    if (!targetRef?.current) return;
    targetRef.current.addEventListener("mouseenter", updatePopupRect);
    return () => {
      if (!targetRef?.current) return;
      targetRef.current.removeEventListener("mouseenter", updatePopupRect);
    };
  }, [targetRef]);

  if (!targetRef) return null;
  if (!portal) return null;

  return createPortal(
    visible ? (
      <div
        className="raw-popup"
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
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
