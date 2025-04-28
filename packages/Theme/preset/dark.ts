import {
  ColorShades,
  RawUITheme,
  RawUIThemePalette,
  RawUIThemeTokens,
  RawUIThemeZIndex,
  Shade,
} from './preset.type';
import { palette as defaultPalette, zIndex as defaultZIndex } from './default';

const swapShade = (shade: Shade) =>
  shade === '50'
    ? '950'
    : shade === '950'
    ? '50'
    : (1000 - Number(shade)).toString();

const generateDarkPalette = (): RawUIThemePalette =>
  Object.fromEntries(
    Object.entries(defaultPalette).map(
      ([key, value]: [string, string | ColorShades]) => {
        if (typeof value === 'string') {
          return [
            key,
            key === 'background'
              ? defaultPalette.foreground
              : key === 'foreground'
              ? defaultPalette.background
              : value,
          ];
        } else {
          const swapped = Object.fromEntries(
            Object.entries(value).map(([shade, color]: [Shade, string]) => [
              swapShade(shade),
              color,
            ])
          );
          return [key, swapped];
        }
      }
    )
  );

export const palette: RawUIThemePalette = generateDarkPalette();

export const tokens: RawUIThemeTokens = {
  shadow: {
    sm: 'none',
    md: 'none',
    lg: 'none',
  },
};

export const theme: RawUITheme = {
  type: 'dark',
  palette,
  tokens,
  zIndex: defaultZIndex,
};

export default theme;
