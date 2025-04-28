export type Shade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

export type ColorShades = Record<Shade, string>;

export interface RawUIThemePalette {
  white: string;
  black: string;
  background: string;
  foreground: string;
  slate: ColorShades;
  gray: ColorShades;
  zinc: ColorShades;
  neutral: ColorShades;
  stone: ColorShades;
  red: ColorShades;
  orange: ColorShades;
  amber: ColorShades;
  yellow: ColorShades;
  lime: ColorShades;
  green: ColorShades;
  emerald: ColorShades;
  teal: ColorShades;
  cyan: ColorShades;
  sky: ColorShades;
  blue: ColorShades;
  indigo: ColorShades;
  violet: ColorShades;
  purple: ColorShades;
  fuchsia: ColorShades;
  pink: ColorShades;
  rose: ColorShades;
}

export interface RawUIThemeTokens {
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface RawUIThemeZIndex {
  base: number;
  dropdown: number;
  sticky: number;
  overlay: number;
  modal: number;
  popover: number;
  toast: number;
  tooltip: number;
}

export interface RawUITheme {
  type: string;
  palette: RawUIThemePalette;
  tokens: RawUIThemeTokens;
  zIndex: RawUIThemeZIndex;
}
