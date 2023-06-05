'use client';

import Sidebar from '../sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-container">
        <div className="breadcrumb"></div>
        <article>{children}</article>
      </main>
      <style jsx>{`
        .page-container {
          display: flex;
          max-width: 1440px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 24px;
        }
        .main-container {
          min-height: calc(100vh - 64px);
          padding: 16px 0 16px;
          flex: 1;
        }
        @media (min-width: 768px) {
          .main-container {
            padding: 16px 24px 16px;
          }
        }
      `}</style>
    </div>
  );
}
