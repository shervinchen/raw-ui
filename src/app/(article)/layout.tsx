'use client';

import Sidebar from '../sidebar';
import Toc from '../toc';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-[90rem] mx-auto py-0 px-6">
      <Sidebar />
      <main className="min-h-[calc(100vh-64px)] w-[calc(100%-220px)] px-0 py-4 flex-grow flex-shrink basis-0 md:px-12">
        <div className="breadcrumb"></div>
        <article className="prose dark:prose-invert max-w-none">
          {children}
        </article>
      </main>
      <Toc />
    </div>
  );
}
