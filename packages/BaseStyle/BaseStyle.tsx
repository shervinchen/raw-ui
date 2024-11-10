import React, { FC, PropsWithChildren } from 'react';
import { useTheme } from '../Theme';

const BaseStyle: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      {children}
      <style jsx global>
        {`
          body {
            margin: 0;
            font-size: 1rem;
            line-height: 1.5;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
              'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
              'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            -webkit-text-size-adjust: 100%;
          }

          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  );
};

export default BaseStyle;
