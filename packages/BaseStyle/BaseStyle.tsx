import React, { FC, PropsWithChildren } from 'react';

const BaseStyle: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      {children}
      <style jsx global>
        {`
          html,
          body {
            background-color: #fff;
            color: #000;
          }

          html {
            font-size: 16px;
          }

          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-size: 1rem;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            min-height: 100%;
            position: relative;
            overflow-x: hidden;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
              'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
              'Droid Sans', 'Helvetica Neue', sans-serif;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
            text-rendering: geometricPrecision;
            -webkit-tap-highlight-color: transparent;
          }

          span {
            font-size: inherit;
            color: inherit;
            font-weight: inherit;
          }

          img {
            max-width: 100%;
          }

          a {
            cursor: pointer;
            font-size: inherit;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-box-align: center;
            align-items: center;
            color: #0070f3;
            text-decoration: 'none';
          }

          a:hover {
            text-decoration: 'none';
          }

          button,
          input,
          select,
          textarea {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            color: inherit;
            margin: 0;
          }

          button:focus,
          input:focus,
          select:focus,
          textarea:focus {
            outline: none;
          }
        `}
      </style>
    </>
  );
};

export default BaseStyle;
