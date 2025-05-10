import { isNaN } from 'lodash';

const FLOATING_CONTAINERS = ['raw-modal', 'raw-drawer', 'raw-popover'];

export const getClosestFloatingContainer = (
  element: HTMLElement | null
): HTMLElement | null => {
  if (!element || element === document.body) return null;

  const isFloatingContainer = FLOATING_CONTAINERS.some((container) =>
    element.classList.contains(container)
  );

  if (isFloatingContainer) {
    const isFloatingContainerWithPopup =
      element.parentElement.classList.contains('raw-popup');
    const floatingContainer = isFloatingContainerWithPopup
      ? element.parentElement
      : element;

    return floatingContainer;
  }

  return getClosestFloatingContainer(element.parentElement);
};

export const getZIndexByClosestFloating = (
  element: HTMLElement | null,
  defaultZIndex: number
) => {
  const floatingContainer = getClosestFloatingContainer(element);
  const zIndex = parseInt(
    floatingContainer !== null
      ? window.getComputedStyle(floatingContainer).zIndex
      : null,
    10
  );
  const closestZIndex = isNaN(zIndex) ? null : zIndex;
  if (closestZIndex !== null) {
    return closestZIndex + 1;
  }
  return defaultZIndex;
};
