'use client';

import { FC, PropsWithChildren, useMemo } from 'react';

import { ThemeContext } from './theme-context';
import BaseStyle from '../BaseStyle';
import { AllThemesConfig, ThemeProviderProps } from './theme.type';
import Theme from './theme';
import { RawUITheme } from './preset/preset.type';

const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  themeType,
  themes = [],
}) => {
  const allThemes = useMemo<AllThemesConfig>(() => {
    if (!themes?.length) {
      return {
        themes: Theme.getPresetThemes(),
      };
    }
    const safeThemes = themes.filter((themeItem) => {
      if (!themeItem) return false;
      return Theme.isAvailableThemeType(themeItem.type);
    });
    const nextThemes = Theme.getPresetThemes().concat(safeThemes);
    return {
      themes: nextThemes,
    };
  }, [themes]);

  const currentTheme = useMemo<RawUITheme>(() => {
    const theme = allThemes.themes.find((themeItem) => {
      return themeItem.type === themeType;
    });
    if (theme) return theme;
    return Theme.getPresetStaticTheme();
  }, [allThemes, themeType]);

  return (
    <ThemeContext value={currentTheme}>
      <BaseStyle />
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
