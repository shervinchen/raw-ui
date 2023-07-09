'use client';

import { ThemeProvider } from 'next-themes';

export function NextThemesProviders({ children }) {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      {children}
    </ThemeProvider>
  );
}
