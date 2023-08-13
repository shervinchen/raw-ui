import { DeepPartial } from '../../packages/utils';
import { RawUITheme } from './preset/preset.type';

export interface ThemeProviderProps {
  themeType?: string;
  themes?: Array<RawUITheme>;
}

export type AllThemesConfig = {
  themes: Array<RawUITheme>;
};

export type RawUIUserTheme = DeepPartial<RawUITheme> & { type: string };
