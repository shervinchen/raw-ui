'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitHub } from 'react-feather';
import { Button } from '@/packages';

export default function Page() {
  return (
    <div className="home-container">
      <main className="hero-wrapper">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <h1 className="title">Raw UI</h1>
        <h2 className="description">
          A minimalist and customizable React component library for web
          applications.
        </h2>
        <div className="buttons">
          <Button type="primary">Get Started</Button>
          <Link href="https://github.com/shervinchen/raw-ui">
            <Button icon={<GitHub />}>Github</Button>
          </Link>
        </div>
      </main>
      <style jsx>{`
        .home-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(100vh - 64px);
          padding: 0 24px;
        }
        .hero-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 1440px;
          text-align: center;
        }
        .title {
          font-size: 60px;
          font-weight: 700;
          color: #000;
        }
        .description {
          font-size: 24px;
          font-weight: 500;
          color: #666;
        }
        .buttons {
          display: flex;
          gap: 12px;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
}
