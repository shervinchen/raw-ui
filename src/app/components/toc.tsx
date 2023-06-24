'use client';

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

interface Heading {
  id: string;
  text: string;
  level: number;
  items?: Heading[];
}

const getNestedHeadings = (
  headingElements: HTMLHeadingElement[]
): Heading[] => {
  const headings: Heading[] = [];
  let stack: Heading[] = [];

  for (const headingElement of headingElements) {
    const level = parseInt(headingElement.tagName.charAt(1));
    const heading: Heading = {
      id: headingElement.id,
      text: headingElement.textContent || '',
      level: level,
    };

    if (level === 1) {
      headings.push(heading);
      stack = [heading];
    } else {
      const parent = stack[level - 2];
      if (!parent) {
        continue;
      }
      if (!parent.items) {
        parent.items = [];
      }
      parent.items.push(heading);
      stack = stack.slice(0, level - 1).concat(heading);
    }
  }

  return headings;
};

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6')
    );

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const Headings = ({
  headings,
  activeId,
}: {
  headings: Heading[];
  activeId: string;
}) => (
  <ul>
    {headings.map((heading) => (
      <li key={heading.id} className="my-2">
        <a
          href={`#${heading.id}`}
          className={classNames(
            'hover:text-gray-900',
            {
              2: 'pl-0',
              3: 'pl-4',
              4: 'pl-8',
              5: 'pl-12',
              6: 'pl-16',
            }[heading.level],
            activeId === heading.id ? 'text-[#0070f3]' : 'text-gray-600'
          )}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          {heading.text}
        </a>
        {heading.items?.length > 0 && (
          <Headings headings={heading.items} activeId={activeId} />
        )}
      </li>
    ))}
  </ul>
);

const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<string>>
) => {
  const headingElementsRef: MutableRefObject<{
    [key: string]: IntersectionObserverEntry;
  }> = useRef({});

  useEffect(() => {
    const callback: IntersectionObserverCallback = (
      headings: IntersectionObserverEntry[]
    ) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string): number =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-64px 0px 0px',
    });

    const headingElements = Array.from(
      document.querySelectorAll('h2,h3,h4,h5,h6')
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

export default function Toc() {
  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();

  useIntersectionObserver(setActiveId);

  return (
    <nav
      aria-label="table of contents"
      className="xl:block hidden w-64 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-4 text-sm scrollbar"
    >
      <Headings headings={nestedHeadings[0]?.items ?? []} activeId={activeId} />
    </nav>
  );
}
