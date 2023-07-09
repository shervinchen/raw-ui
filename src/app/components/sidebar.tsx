'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBARS } from '@/data/sidebars';

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarData = SIDEBARS.find(
    (item) => item.name === pathname.split('/')[1]
  ).children;

  return (
    <aside className="hidden sticky top-16 md:flex flex-col gap-4 w-[200px] h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden py-4 scrollbar">
      {sidebarData.map((section) => (
        <div key={section.name}>
          <span className="text-sm text-[#888] dark:text-[#dcdcdc]">
            {section.name}
          </span>
          <div className="flex flex-col gap-1 mt-2">
            {section.children.map((link) => (
              <Link
                href={link.url}
                className={
                  pathname === link.url
                    ? 'py-1 px-0 text-base text-[#0070f3] active:font-semibold'
                    : 'py-1 px-0 text-base text-[#444] dark:text-[#888] active:font-semibold'
                }
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
