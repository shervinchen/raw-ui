import { Metadata } from 'next';
import StyledJsxRegistry from './registry';
import './global.css';
import { LayoutProvider } from './layout-provider';

export const metadata: Metadata = {
  title: 'Raw UI',
  description:
    'A minimalist and customizable React component library for web applications.',
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
          <LayoutProvider>{children}</LayoutProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
