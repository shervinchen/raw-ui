import { RawUITheme, RawUIThemePalette, RawUIThemeTokens } from './preset.type';

export const palette: RawUIThemePalette = {
  accents1: '#111111',
  accents2: '#333333',
  accents3: '#444444',
  accents4: '#666666',
  accents5: '#888888',
  accents6: '#999999',
  accents7: '#dcdcdc',
  accents8: '#e7e7e7',
  accents9: '#eaeaea',
  accents10: '#fafafa',
  background: '#000000',
  foreground: '#ffffff',
  link: '#3291ff',
  successLighter: '#d3e5ff',
  successLight: '#3291ff',
  success: '#0070f3',
  successDark: '#0761d1',
  warningLighter: '#ffefcf',
  warningLight: '#f7b955',
  warning: '#f5a623',
  warningDark: '#ab570a',
  errorLighter: '#f7d4d6',
  errorLight: '#ff1a1a',
  error: '#ee0000',
  errorDark: '#c50000',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyan: '#50e3c2',
  cyanDark: '#29bc9b',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violet: '#7928ca',
  violetDark: '#4c2889',
  highlightPurple: '#f81ce5',
  highlightMagenta: '#eb367f',
  highlightPink: '#ff0080',
  highlightYellow: '#fff500',
};

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
};

export default theme;
