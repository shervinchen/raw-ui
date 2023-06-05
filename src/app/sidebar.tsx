'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBARS } from '@/data/sidebars';

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const sidebarData = SIDEBARS.find(
    (item) => item.name === pathname.split('/')[1]
  ).children;

  return (
    <aside className="sidebar-wrapper">
      {sidebarData.map((section) => (
        <div className="sidebar-section" key={section.name}>
          <span className="section-title">{section.name}</span>
          <div className="section-content">
            {section.children.map((link) => (
              <Link
                href={link.url}
                className={
                  pathname === link.url ? 'sidebar-link active' : 'sidebar-link'
                }
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <style jsx global>{`
        .sidebar-wrapper {
          display: none;
        }
        @media (min-width: 768px) {
          .sidebar-wrapper {
            position: sticky;
            top: 64px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 200px;
            height: calc(100vh - 64px);
            overflow-y: auto;
            overflow-x: hidden;
            padding: 16px 0 16px;
          }
          .sidebar-wrapper::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }
          .sidebar-wrapper::-webkit-scrollbar-track {
            background-color: transparent;
          }
          .sidebar-wrapper::-webkit-scrollbar-thumb {
            border-radius: 10px;
          }
          .sidebar-wrapper:hover::-webkit-scrollbar-thumb {
            background-color: hsla(0, 0%, 45%, 0.2);
            background-clip: content-box;
            border: 3px solid transparent;
          }
          .sidebar-wrapper:hover::-webkit-scrollbar-thumb:hover {
            background-color: hsla(0, 0%, 45%, 0.4);
          }
        }
        .section-title {
          font-size: 14px;
          color: #888;
        }
        .section-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 8px;
        }
        .sidebar-link {
          padding: 4px 0;
          font-size: 16px;
          color: #444;
        }
        .sidebar-link.active {
          color: #0070f3;
          font-weight: 600;
        }
      `}</style>
    </aside>
  );
}
