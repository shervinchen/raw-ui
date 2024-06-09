'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import Navbar from './components/navbar';
import { RawUIProvider } from './client-lib';
import { useIsClient } from './utils';

const LayoutContent = ({ children }) => {
  const isClient = useIsClient();
  const { theme } = useTheme();

  return (
    <RawUIProvider themeType={isClient && theme === 'dark' ? 'dark' : 'light'}>
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
