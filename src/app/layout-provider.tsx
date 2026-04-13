'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import Navbar from './components/navbar';
import RawUIProvider from '@/packages/Provider';
import { useSSR } from '@/packages/utils';

const LayoutContent = ({ children }) => {
  const isBrowser = useSSR().isBrowser;
  const { theme } = useTheme();

  return (
    <RawUIProvider themeType={isBrowser && theme === 'dark' ? 'dark' : 'light'}>
      <Navbar />
      {children}
    </RawUIProvider>
  );
};

export function LayoutProvider({ children }) {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
