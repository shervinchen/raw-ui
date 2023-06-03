import StyledJsxRegistry from './registry';
import './global.css';
import Navbar from './navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <Navbar />
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
