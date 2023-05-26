import { RawUITheme } from './preset/preset.type';

export interface ThemeProviderProps {
  themeType?: string;
  themes?: Array<RawUITheme>;
}
