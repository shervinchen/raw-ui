'use client';

import {
  Dispatch,
  SetStateAction,
  startTransition,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const HEADING_SELECTOR = 'h2,h3,h4,h5,h6';
const SCROLL_OFFSET = 64;

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
      parent.items = parent.items ?? [];
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
    return () => {
      setNestedHeadings([]);
    };
  }, [pathname]);

  return nestedHeadings;
};

const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<string>>,
  pathname: string,
) => {
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {},
  );
  const headingTopMapRef = useRef<Record<string, number>>({});

  useEffect(() => {
    headingElementsRef.current = {};
    headingTopMapRef.current = {};

    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR),
    );
    const refreshHeadingTops = () => {
      headingElements.forEach((el) => {
        headingTopMapRef.current[el.id] = el.offsetTop;
      });
    };
    refreshHeadingTops();

    const getIndexFromId = (id: string): number =>
      headingElements.findIndex((heading) => heading.id === id);

    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry;
      });

      const visibleHeadings = Object.values(headingElementsRef.current).filter(
        (entry) => entry.isIntersecting,
      );

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings
          .filter((item) => getIndexFromId(item.target.id) !== -1)
          .sort(
            (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
          );
        setActiveId(sortedVisibleHeadings[0]?.target?.id);
      } else {
        const scrollY = window.scrollY;
        const passedHeadings = headingElements
          .filter(
            (el) => headingTopMapRef.current[el.id] <= scrollY + SCROLL_OFFSET,
          )
          .at(-1);

        if (passedHeadings) {
          setActiveId(passedHeadings.id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: `-${SCROLL_OFFSET}px 0px 0px`,
    });
    headingElements.forEach((element) => observer.observe(element));

    const resizeObserver = new ResizeObserver(refreshHeadingTops);
    resizeObserver.observe(document.body);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [setActiveId, pathname]);
};

const Headings = ({
  headings,
  activeId,
}: {
  headings: Heading[];
  activeId: string;
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
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            {heading.text}
          </a>
          {heading.items && heading.items.length > 0 && (
            <Headings headings={heading.items} activeId={activeId} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function Toc() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>('');
  const nestedHeadings = useHeadingsData(pathname);

  useIntersectionObserver(setActiveId, pathname);

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
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  );
}
