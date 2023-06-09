'use client';

import Sidebar from '../sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-8xl mx-auto py-0 px-6">
      <Sidebar />
      <main className="min-h-[calc(100vh-64px)] px-0 py-4 flex-grow md:px-6">
        <div className="breadcrumb"></div>
        <article>{children}</article>
      </main>
    </div>
  );
}
