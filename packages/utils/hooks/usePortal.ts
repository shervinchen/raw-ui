import { useEffect, useState, useId, useRef } from 'react';

const namespace = 'raw-ui';

const createElement = (id: string): HTMLElement => {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
};

export const usePortal = (
  name: string,
  getContainer?: () => HTMLElement | null,
): HTMLElement | null => {
  const uniqueId = useId();
  const id = `${namespace}-${name}-${CSS.escape(uniqueId)}`;
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = getContainer?.() ?? document.body;
    const existElement = container.querySelector<HTMLElement>(`#${id}`);

    if (!elementRef.current) {
      elementRef.current = existElement || createElement(id);
    }

    if (!existElement) {
      container.appendChild(elementRef.current);
    }

    setPortal(elementRef.current);

    return () => {
      if (elementRef.current) {
        container.removeChild(elementRef.current);
        elementRef.current = null;
      }
    };
  }, [getContainer, id]);

  return portal;
};
