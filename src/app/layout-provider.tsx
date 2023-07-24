'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import Navbar from './components/navbar';
import { RawUIProvider } from './client-lib';

const LayoutContent = ({ children }) => {
  const { theme } = useTheme();

  return (
    <RawUIProvider themeType={theme}>
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
