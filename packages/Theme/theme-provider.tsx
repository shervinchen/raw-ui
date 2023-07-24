import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  const [allThemes, setAllThemes] = useState<AllThemesConfig>({
    themes: Theme.getPresetThemes(),
  });

  const currentTheme = useMemo<RawUITheme>(() => {
    const theme = allThemes.themes.find((themeItem) => {
      return themeItem.type === themeType;
    });
    if (theme) return theme;
    return Theme.getPresetStaticTheme();
  }, [allThemes, themeType]);

  useEffect(() => {
    if (!themes?.length) return;
    setAllThemes((last) => {
      const safeThemes = themes.filter((themeItem) => {
        if (!themeItem) return false;
        return Theme.isAvailableThemeType(themeItem.type);
      });
      const nextThemes = Theme.getPresetThemes().concat(safeThemes);
      return {
        ...last,
        themes: nextThemes,
      };
    });
  }, [themes]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      <BaseStyle />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
