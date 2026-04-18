'use client';

import {
  RefObject,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const SCROLL_OFFSET = 64;
const HEADING_SELECTOR = 'h2,h3,h4,h5,h6';

interface Heading {
  id: string;
  text: string;
  level: number;
  items?: Heading[];
}

const getNestedHeadings = (
  headingElements: HTMLHeadingElement[],
): Heading[] => {
  const headings: Heading[] = [];
  const stack: Heading[] = [];

  for (const el of headingElements) {
    const level = parseInt(el.tagName.charAt(1));
    const heading: Heading = {
      id: el.id,
      text: el.textContent ?? '',
      level,
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      headings.push(heading);
    } else {
      const parent = stack[stack.length - 1];
      parent.items ??= [];
      parent.items.push(heading);
    }

    stack.push(heading);
  }

  return headings;
};

const useHeadingsData = (pathname: string) => {
  const [nestedHeadings, setNestedHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR),
    );
    startTransition(() => {
      setNestedHeadings(getNestedHeadings(els));
    });
  }, [pathname]);

  return nestedHeadings;
};

const useActiveId = (
  pathname: string,
): {
  activeId: string;
  scrollToHeading: (id: string) => void;
} => {
  const [activeId, setActiveId] = useState('');
  const headingTopMapRef = useRef<Record<string, number>>({});
  const headingElementsRef: RefObject<HTMLHeadingElement[]> = useRef([]);
  const rafRef = useRef<number | null>(null);

  const updateHeadingTopMap = useCallback(() => {
    const els = headingElementsRef.current;
    const map: Record<string, number> = {};
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    const threshold = maxScrollY + SCROLL_OFFSET - 1;

    const overflowIndex = els.findIndex((el) => el.offsetTop > maxScrollY);

    els.forEach((el, index) => {
      if (
        overflowIndex === -1 ||
        index < overflowIndex ||
        !els[overflowIndex - 1]
      ) {
        map[el.id] = Math.floor(el.offsetTop);
      } else {
        const overflowEls = els.slice(overflowIndex);
        const step =
          overflowEls.length > 1
            ? (threshold - els[overflowIndex - 1].offsetTop) /
              overflowEls.length
            : threshold - els[overflowIndex - 1].offsetTop;
        map[el.id] = Math.floor(
          els[overflowIndex - 1].offsetTop + step * (index - overflowIndex + 1),
        );
      }
    });

    headingTopMapRef.current = map;
  }, []);

  const updateActiveId = useCallback(() => {
    const els = headingElementsRef.current;

    if (els.length === 0) return;

    const scrollY = window.scrollY;
    const map = headingTopMapRef.current;

    for (let i = els.length - 1; i >= 0; i--) {
      if (map[els[i].id] <= scrollY + SCROLL_OFFSET) {
        setActiveId(els[i].id);
        return;
      }
    }

    setActiveId(els[0].id);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      updateActiveId();
      rafRef.current = null;
    });
  }, [updateActiveId]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const mappedTop = headingTopMapRef.current[id];
    const top =
      mappedTop !== undefined
        ? mappedTop - SCROLL_OFFSET
        : el.offsetTop - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR),
    );
    headingElementsRef.current = els;

    if (els.length === 0) return;

    updateHeadingTopMap();
    updateActiveId();

    window.addEventListener('scroll', handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateHeadingTopMap();
      updateActiveId();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, [pathname, updateHeadingTopMap, updateActiveId, handleScroll]);

  return { activeId, scrollToHeading };
};

const Headings = ({
  headings,
  activeId,
  scrollToHeading,
}: {
  headings: Heading[];
  activeId: string;
  scrollToHeading: (id: string) => void;
}) => {
  return (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id} className="my-2">
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? 'true' : undefined}
            className={classNames(
              {
                2: 'pl-0',
                3: 'pl-4',
                4: 'pl-8',
                5: 'pl-12',
                6: 'pl-16',
              }[heading.level],
              activeId === heading.id
                ? 'text-black dark:text-white font-semibold'
                : 'text-[#666] dark:text-[#666] hover:text-black dark:hover:text-white',
            )}
            onClick={(e) => {
              e.preventDefault();
              scrollToHeading(heading.id);
            }}
          >
            {heading.text}
          </a>
          {heading.items && heading.items.length > 0 && (
            <Headings
              headings={heading.items}
              activeId={activeId}
              scrollToHeading={scrollToHeading}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Toc() {
  const pathname = usePathname();
  const nestedHeadings = useHeadingsData(pathname);
  const { activeId, scrollToHeading } = useActiveId(pathname);

  if (
    nestedHeadings.length === 0 ||
    (nestedHeadings.length === 1 && !nestedHeadings[0]?.items)
  ) {
    return null;
  }

  return (
    <nav
      aria-label="table of contents"
      className="xl:block hidden w-64 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-4 text-sm scrollbar"
    >
      <Headings
        headings={nestedHeadings}
        activeId={activeId}
        scrollToHeading={scrollToHeading}
      />
    </nav>
  );
}
