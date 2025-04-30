import { useEffect, useState, useId } from 'react';
import { useSSR } from './useSSR';

const namespace = 'raw-ui';

const createElement = (id: string): HTMLElement => {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
};

export const usePortal = (
  name: string,
  getContainer?: () => HTMLElement | null
): HTMLElement | null => {
  const uniqueId = useId();
  const id = `${namespace}-${name}-${CSS.escape(uniqueId)}`;
  const { isBrowser } = useSSR();
  const [portal, setPortal] = useState<HTMLElement | null>(
    isBrowser ? createElement(id) : null
  );

  useEffect(() => {
    const container = getContainer?.() ?? document.body;
    const hasElement = container.querySelector<HTMLElement>(`#${id}`);
    const element = hasElement || createElement(id);

    if (!hasElement) {
      container.appendChild(element);
    }

    setPortal(element);

    return () => {
      if (hasElement) {
        container.removeChild(element);
      }
    };
  }, [getContainer, id]);

  return portal;
};
