'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitHub, Moon, Sun } from 'react-feather';
import { useTheme } from 'next-themes';
import ThemeSwitch from './theme-switch/theme-switch';
import { useMemo } from 'react';

export default function Navbar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const routeName = pathname.split('/')[1];

  const navs = useMemo(() => {
    return [
      {
        route: '',
        name: 'Home',
      },
      {
        route: 'guide',
        name: 'Guide',
      },
      {
        route: 'components',
        name: 'Components',
      },
    ];
  }, []);

  return (
    <header className="sticky top-0 w-full bg-white dark:bg-black	shadow-[inset_0_-1px_0_0_#eaeaea] dark:shadow-[inset_0_-1px_0_0_#333] z-[100]">
      <nav className="flex items-center max-w-[90rem] h-16 py-0 px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2	mr-auto">
          <ThemeSwitch
            lightComponent={
              <Image src="/logo-dark.svg" alt="logo" width={24} height={24} />
            }
            darkComponent={
              <Image src="/logo.svg" alt="logo" width={24} height={24} />
            }
          />
          <span className="text-lg font-bold whitespace-nowrap dark:text-white">
            Raw UI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {navs.map((nav) => (
            <Link
              href={`/${nav.route}`}
              className={
                routeName === nav.route
                  ? 'text-black dark:text-[#fff]'
                  : 'text-[#666] hover:text-black dark:text-[#888] dark:hover:text-[#fff]'
              }
              key={nav.name}
            >
              {nav.name}
            </Link>
          ))}
          <Link href="https://github.com/shervinchen/raw-ui">
            <ThemeSwitch
              lightComponent={<GitHub size={24} color="#000" />}
              darkComponent={<GitHub size={24} color="#fff" />}
            />
          </Link>
          <ThemeSwitch
            lightComponent={
              <Moon
                size={24}
                color="#000"
                cursor="pointer"
                onClick={() => setTheme('dark')}
              />
            }
            darkComponent={
              <Sun
                size={24}
                color="#fff"
                cursor="pointer"
                onClick={() => setTheme('light')}
              />
            }
          />
        </div>
      </nav>
    </header>
  );
}
