'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import Navbar from './components/navbar';
import { RawUIProvider } from './client-lib';

export function LayoutProvider({ children }) {
  const { theme } = useTheme();

  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <RawUIProvider themeType={theme}>
        <Navbar />
        {children}
      </RawUIProvider>
    </ThemeProvider>
  );
}
