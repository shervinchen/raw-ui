'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitHub, Moon } from 'react-feather';

export default function Navbar() {
  return (
    <header className="header-container">
      <nav className="nav-wrapper">
        <Link href="/" className="logo-wrapper">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <span className="title">Raw UI</span>
        </Link>
        <div className="menu-wrapper">
          <Link href="https://github.com/shervinchen/raw-ui">
            <GitHub size={24} color="#000" />
          </Link>
          <Moon size={24} color="#000" cursor="pointer" />
        </div>
      </nav>
      <style jsx>{`
        .header-container {
          position: sticky;
          top: 0;
          width: 100%;
          background-color: #fff;
          box-shadow: inset 0 -1px 0 0 #eaeaea;
          z-index: 1;
        }
        .nav-wrapper {
          display: flex;
          align-items: center;
          max-width: 1440px;
          height: 64px;
          padding: 0 24px;
          margin-left: auto;
          margin-right: auto;
        }
        .nav-wrapper :global(a) {
          display: flex;
          align-items: center;
        }
        .nav-wrapper :global(.logo-wrapper) {
          gap: 10px;
          margin-right: auto;
        }
        .logo-wrapper .title {
          font-size: 18px;
          font-weight: bold;
        }
        .menu-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </header>
  );
}
