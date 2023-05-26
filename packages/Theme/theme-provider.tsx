import React, { FC, PropsWithChildren, useMemo } from 'react';

import { ThemeContext } from './theme-context';
import BaseStyle from '../BaseStyle';
import { ThemeProviderProps } from './theme.type';
import Theme from './theme';

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  themeType,
  // themes = [],
}) => {
  const currentTheme = useMemo(() => {
    return Theme.getPresetStaticTheme();
  }, [themeType]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <BaseStyle />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
