export type OverflowAncestors = Array<Element | Window | VisualViewport>;

function hasWindow() {
  return typeof window !== 'undefined';
}

export function getWindow(node: any): typeof window {
  return node?.ownerDocument?.defaultView || window;
}

function isNode(value: unknown): value is Node {
  if (!hasWindow()) {
    return false;
  }

  return value instanceof Node || value instanceof getWindow(value).Node;
}

export function getNodeName(node: Node | Window): string {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  return '#document';
}

export function getDocumentElement(node: Node | Window): HTMLElement {
  return (
    (isNode(node) ? node.ownerDocument : node.document) || window.document
  )?.documentElement;
}

export function isElement(value: unknown): value is Element {
  if (!hasWindow()) {
    return false;
  }

  return value instanceof Element || value instanceof getWindow(value).Element;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
  if (!hasWindow()) {
    return false;
  }

  return (
    value instanceof HTMLElement ||
    value instanceof getWindow(value).HTMLElement
  );
}

export function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element);
}

export function getNodeScroll(element: Element | Window): {
  scrollLeft: number;
  scrollTop: number;
} {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }

  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  };
}

export function isOverflowElement(element: Element): boolean {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !['inline', 'contents'].includes(display)
  );
}

export function isTableElement(element: Element): boolean {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}

export function isTopLayer(element: Element): boolean {
  return [':popover-open', ':modal'].some((selector) => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}

function isShadowRoot(value: unknown): value is ShadowRoot {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }

  return (
    value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot
  );
}

export function getParentNode(node: Node): Node {
  if (getNodeName(node) === 'html') {
    return node;
  }

  const result =
    (node as any).assignedSlot ||
    node.parentNode ||
    (isShadowRoot(node) && node.host) ||
    getDocumentElement(node);

  return isShadowRoot(result) ? result.host : result;
}

export function isLastTraversableNode(node: Node): boolean {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}

export function isStaticPositioned(element: Element): boolean {
  return getComputedStyle(element).position === 'static';
}

export function isWebKit(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}

export function isContainingBlock(
  elementOrCss: Element | CSSStyleDeclaration
): boolean {
  const webkit = isWebKit();
  const css = isElement(elementOrCss)
    ? getComputedStyle(elementOrCss)
    : elementOrCss;

  return (
    ['transform', 'translate', 'scale', 'rotate', 'perspective'].some((value) =>
      css[value as keyof CSSStyleDeclaration]
        ? css[value as keyof CSSStyleDeclaration] !== 'none'
        : false
    ) ||
    (css.containerType ? css.containerType !== 'normal' : false) ||
    (!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
    (!webkit && (css.filter ? css.filter !== 'none' : false)) ||
    ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some(
      (value) => (css.willChange || '').includes(value)
    ) ||
    ['paint', 'layout', 'strict', 'content'].some((value) =>
      (css.contain || '').includes(value)
    )
  );
}

export function getContainingBlock(element: Element): HTMLElement | null {
  let currentNode: Node | null = getParentNode(element);

  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }

    currentNode = getParentNode(currentNode);
  }

  return null;
}

export function getFrameElement(win: Window): Element | null {
  return win.parent && Object.getPrototypeOf(win.parent)
    ? win.frameElement
    : null;
}

function getNearestOverflowAncestor(node: Node): HTMLElement {
  const parentNode = getParentNode(node);

  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument
      ? node.ownerDocument.body
      : (node as Document).body;
  }

  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }

  return getNearestOverflowAncestor(parentNode);
}

export function getOverflowAncestors(
  node: Node,
  list: OverflowAncestors = [],
  traverseIframes = true
): OverflowAncestors {
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === node.ownerDocument?.body;
  const win = getWindow(scrollableAncestor);

  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(
      win,
      win.visualViewport || [],
      isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
      frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []
    );
  }

  return list.concat(
    scrollableAncestor,
    getOverflowAncestors(scrollableAncestor, [], traverseIframes)
  );
}
