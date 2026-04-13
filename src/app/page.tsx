'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GitHub } from 'react-feather';
import { Button } from '@/packages';
import ThemeSwitch from './components/theme-switch/theme-switch';

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-0 px-6">
      <main className="flex flex-col items-center justify-center max-w-[90rem] text-center gap-6">
        <ThemeSwitch
          lightComponent={
            <Image src="/logo-dark.svg" alt="logo" width={100} height={100} />
          }
          darkComponent={
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          }
        />
        <h1 className="text-6xl font-bold text-black dark:text-white">
          Raw UI
        </h1>
        <h2 className="text-2xl font-medium text-[#666] dark:text-[#888]">
          A minimalist and customizable React component library for web
          applications.
        </h2>
        <div className="flex gap-3">
          <Link href="/guide">
            <Button type="primary">Get Started</Button>
          </Link>
          <Link href="https://github.com/shervinchen/raw-ui">
            <Button icon={<GitHub />}>Github</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
