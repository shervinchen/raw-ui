'use client';

import StyledJsxRegistry from './registry';
import './global.css';
import Navbar from './components/navbar';
import { RawUIProvider } from '@/packages';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <RawUIProvider>
            <Navbar />
            {children}
          </RawUIProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
