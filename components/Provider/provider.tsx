import React, { PropsWithChildren, FC } from 'react';
import ThemeProvider from '../Theme/theme-provider';
import { RawUITheme } from '../Theme/preset/preset.type';
import { RawUIContent } from './context';

export type RawUIProviderProps = {
  themes?: Array<RawUITheme>;
  themeType?: string | 'dark' | 'light';
};

const RawUIProvider: FC<PropsWithChildren<RawUIProviderProps>> = ({
  themes,
  themeType,
  children,
}) => {
  const initialValue = {};
  return (
    <RawUIContent.Provider value={initialValue}>
      <ThemeProvider themes={themes} themeType={themeType}>
        {children}
      </ThemeProvider>
    </RawUIContent.Provider>
  );
};

export default RawUIProvider;
