'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitHub, Moon } from 'react-feather';

export default function Navbar() {
  return (
    <nav className="nav-container">
      <div className="nav-inner">
        <Link href="/" className="logo-wrapper">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <span className="logo-name">Raw UI</span>
        </Link>
        <Link href="https://github.com/shervinchen/raw-ui">
          <GitHub size={24} color="#000" />
        </Link>
        <Moon size={24} color="#000" cursor="pointer" />
      </div>
      <style jsx>{`
        .nav-container {
          position: sticky;
          top: 0;
          width: 100%;
          background-color: #fff;
          box-shadow: inset 0 -1px 0 0 #eaeaea;
        }
        .nav-inner {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 1440px;
          height: 64px;
          padding: 0 24px;
          margin-left: auto;
          margin-right: auto;
        }
        .nav-inner :global(a) {
          display: flex;
          align-items: center;
        }
        .nav-inner :global(.logo-wrapper) {
          gap: 10px;
          margin-right: auto;
        }
        .logo-name {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </nav>
  );
}
