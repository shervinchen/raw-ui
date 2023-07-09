'use client';

import { useTheme } from 'next-themes';
import StyledJsxRegistry from './registry';
import './global.css';
import Navbar from './components/navbar';
import { RawUIProvider } from '@/packages';
import { NextThemesProviders } from './next-themes-provider';

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <RawUIProvider themeType={theme}>
      <Navbar />
      {children}
    </RawUIProvider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black">
        <StyledJsxRegistry>
          <NextThemesProviders>
            <LayoutContent>{children}</LayoutContent>
          </NextThemesProviders>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
