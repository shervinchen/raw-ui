import { Context, createContext, useContext } from 'react';
import { RawUITheme } from './preset/preset.type';
import Theme from './theme';

const defaultTheme = Theme.getPresetStaticTheme();

export const ThemeContext: Context<RawUITheme> =
  createContext<RawUITheme>(defaultTheme);

export const useTheme = (): RawUITheme => useContext<RawUITheme>(ThemeContext);
