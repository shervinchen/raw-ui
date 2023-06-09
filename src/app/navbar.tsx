'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitHub, Moon } from 'react-feather';

export default function Navbar() {
  const pathname = usePathname();
  const routeName = pathname.split('/')[1];

  return (
    <header className="sticky top-0 w-full bg-white	shadow-[inset_0_-1px_0_0_#eaeaea] z-[1]">
      <nav className="flex items-center max-w-[90rem] h-16 py-0 px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2	mr-auto">
          <Image src="/logo.svg" alt="logo" width={24} height={24} />
          <span className="text-lg font-bold">Raw UI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={
              routeName === '' ? 'text-black' : 'text-[#666] hover:text-black'
            }
          >
            Home
          </Link>
          <Link
            href="/guide"
            className={
              routeName === 'guide'
                ? 'text-black'
                : 'text-[#666] hover:text-black'
            }
          >
            Guide
          </Link>
          <Link
            href="/components"
            className={
              routeName === 'components'
                ? 'text-black'
                : 'text-[#666] hover:text-black'
            }
          >
            Components
          </Link>
          <Link href="https://github.com/shervinchen/raw-ui">
            <GitHub size={24} color="#000" />
          </Link>
          <Moon size={24} color="#000" cursor="pointer" />
        </div>
      </nav>
    </header>
  );
}
